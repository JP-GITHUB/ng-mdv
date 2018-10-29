import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

import { UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'app-user-add',
  templateUrl: './user-add.component.html',
  styleUrls: ['./user-add.component.css']
})
export class UserAddComponent implements OnInit {

  closeResult: string;
  addForm: FormGroup;
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
    this.addForm = this.formBuilder.group({
      name: ['', Validators.required],
      lastname: ['', Validators.required],
      rut: ['', Validators.required],
      mail: ['', Validators.required],
      telephone: ['', Validators.required],
      password: ['', Validators.required],
      repassword: ['', Validators.required]
    });
  }

  open(content) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', windowClass:"modal-add-user" }).result.then((result) => {
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

  get f() { return this.addForm.controls; }

  onSubmit() {
    let data;
    this.submitted = true;

    if (this.addForm.invalid) {
      console.log("Invalid form");
      return;
    }

    this.loading = true;

    data = {
      name: this.f.name.value,
      lastname: this.f.lastname.value,
      rut: this.f.rut.value,
      mail: this.f.mail.value,
      telephone: this.f.telephone.value,
      password: this.f.password.value,
      repassword: this.f.repassword.value
    }

    this.userService.add(data).subscribe(
      data => {
        if (data.hasOwnProperty('status')) {
          if(data['status']){
            console.log(data['status'] ? 'success' : 'error', data['msg']);
            this.reloadDt.emit();
            this.addForm.reset();
          }else{
            
          }
        } else {
          console.log('error', 'Error al registrar.');
        }
        this.submitted = false;
      },
      error => {
        this.loading = false;
        console.log('error', 'Error al registrar.');
      }
    )
  }
}
