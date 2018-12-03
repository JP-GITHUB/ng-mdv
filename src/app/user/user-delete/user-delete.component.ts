import { Component, OnInit, Output, EventEmitter, ViewChild } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

import { UserService } from 'src/app/_services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-delete',
  templateUrl: './user-delete.component.html',
  styleUrls: ['./user-delete.component.css']
})
export class UserDeleteComponent implements OnInit {
  @ViewChild('content') content;

  private userId: Number;
  closeResult: string;

  @Output() reloadDt: EventEmitter<any> = new EventEmitter();

  constructor(
    private modalService: NgbModal,
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit() { }

  open(userId) {
    this.userId = userId;

    this.modalService.open(this.content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  onSubmit() {
    this.userService.delete(this.userId).subscribe(
      data => {
        if (data.hasOwnProperty('status')) {
          if (data['status']) {
            alert("El usuario fue deshabilitado");
            this.modalService.dismissAll();
            this.reloadDt.emit();
          } else {

          }
        } else {
          console.log('error', 'Error al eliminar.');
        }
      },
      error => {
        if (error.status === 401) {
          console.log(error);
          this.router.navigate(['/']);
        }

        console.log('error', 'Error al eliminar.');
      }
    )
  }
}
