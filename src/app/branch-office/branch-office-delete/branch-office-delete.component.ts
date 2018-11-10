import { Component, OnInit, Output, EventEmitter, ViewChild } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

import { BranchOfficeService } from 'src/app/_services/branch-office.service'

@Component({
  selector: 'app-branch-office-delete',
  templateUrl: './branch-office-delete.component.html',
  styleUrls: ['./branch-office-delete.component.css']
})
export class BranchOfficeDeleteComponent implements OnInit {
  @ViewChild('content') content;

  private branchOfficeId: Number;
  closeResult: string;

  @Output() reloadDt: EventEmitter<any> = new EventEmitter();

  constructor(
    private modalService: NgbModal,
    private branchOfficeService: BranchOfficeService
  ) { }

  ngOnInit() {}

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  open(branchOfficeId) {
    this.branchOfficeId = branchOfficeId;

    this.modalService.open(this.content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  onSubmit() {
    this.branchOfficeService.delete(this.branchOfficeId).subscribe(
      data => {
        if (data.hasOwnProperty('status')) {
          if (data['status']) {
            alert("la sucursal fue deshabilitada");
            this.modalService.dismissAll();
            this.reloadDt.emit();
          } else {

          }
        } else {
          console.log('error', 'Error al eliminar.');
        }
      },
      error => {
        console.log('error', 'Error al eliminar.');
      }
    )
  }

}
