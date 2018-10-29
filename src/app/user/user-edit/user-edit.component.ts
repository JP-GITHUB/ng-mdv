import { Component, OnInit, Output, EventEmitter, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

import { UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {
  @ViewChild('content') content;

  private idUser: Number;
  closeResult: string;
  editForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: String;

  @Output() reloadDt: EventEmitter<any> = new EventEmitter();

  constructor(
    private modalService: NgbModal,
    private formBuilder: FormBuilder,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.editForm = this.formBuilder.group({
      name: ['', Validators.required],
      lastname: ['', Validators.required],
      rut: [''],
      mail: [''],
      telephone: [''],
      password: [''],
      repassword: ['']
    });
  }

  open(id, name, lastname) {
    this.idUser = id;
    this.f.name.setValue(name);
    this.f.lastname.setValue(lastname);

    this.modalService.open(this.content, { ariaLabelledBy: 'modal-basic-title',  windowClass:"modal-edit-user" }).result.then((result) => {
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

  get f() { return this.editForm.controls; }

  onSubmit() {
    let data;
    this.submitted = true;

    if (this.editForm.invalid) {
      console.log("Invalid form");
      return;
    }

    this.loading = true;

    data = {
      id: this.idUser,
      name: this.f.name.value,
      lastname: this.f.lastname.value,
      rut: this.f.rut.value,
      mail: this.f.mail.value,
      telephone: this.f.telephone.value,
      password: this.f.password.value,
      repassword: this.f.repassword.value
    }

    this.userService.edit(data).subscribe(
      data => {
        if (data.hasOwnProperty('status')) {
          if(data['status']){
            this.reloadDt.emit();
            this.editForm.reset();
          }else{
            
          }
        } else {
          console.log('error', 'Error al modificar.');
        }
        this.submitted = false;
      },
      error => {
        this.loading = false;
        console.log('error', 'Error al modificar.');
      }
    )
  }
}
