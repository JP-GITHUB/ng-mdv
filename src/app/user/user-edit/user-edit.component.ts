import { Component, OnInit, Output, EventEmitter, ViewChild, Input } from '@angular/core';
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

  private userId: Number;
  public userProfileId: Number;

  closeResult: string;

  objMsg = {
    display: false,
    msg: '',
    type: ''
  }

  /** Form */
  editForm: FormGroup;
  loading = false;
  submitted = false;

  @Output() reloadDt: EventEmitter<any> = new EventEmitter();
  @Input('profilesPage') profilesPage: any;

  constructor(
    private modalService: NgbModal,
    private formBuilder: FormBuilder,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.editForm = this.formBuilder.group({
      name: ['', Validators.required],
      lastname: ['', Validators.required],
      rut: ['', Validators.required],
      mail: ['', Validators.required],
      telephone: ['', Validators.required],
      profile: ['', Validators.required],
      password: ['', Validators.required],
      repassword: ['', Validators.required]
    });
  }

  open(id, name, lastname) {
    this.userId = id;
    this.f.name.setValue(name);
    this.f.lastname.setValue(lastname);

    this.userService.getUserById(Number(this.userId)).subscribe(
      data => {
        if (data) {
          this.f.rut.setValue(data['rut'].trim());
          this.f.mail.setValue(data['mail'].trim());
          this.f.telephone.setValue(data['telephone'].trim());
          this.userProfileId = data['profile_id'];
          this.f.profile.setValue(data['profile_id']);
        }
      },
      error => {

      }
    )

    this.modalService.open(this.content, { ariaLabelledBy: 'modal-basic-title', windowClass: "modal-edit-user" }).result.then((result) => {
      console.log(`Closed with: ${result}`)
      this.editForm.reset();
    }, (reason) => {
      this.closeResult = `Dismissed`;
    });
  }

  get f() { return this.editForm.controls; }

  onSubmit() {
    let data;
    this.submitted = true;

    if (this.editForm.invalid) {
      console.log(this.editForm)
      console.log("Invalid form");
      return;
    }

    this.loading = true;

    data = {
      id: this.userId,
      name: this.f.name.value,
      lastname: this.f.lastname.value,
      rut: this.f.rut.value,
      mail: this.f.mail.value,
      telephone: this.f.telephone.value,
      profile_id: this.f.profile.value,
      password: this.f.password.value,
      repassword: this.f.repassword.value
    }

    this.userService.edit(data).subscribe(
      data => {
        if (data.hasOwnProperty('status')) {
          if (data['status']) {
            this.reloadDt.emit();

            this.showMsg(data['msg'], 'success');
          } else {
            this.showMsg(data['msg'], 'error');
          }
        } else {
          console.log('error', 'Error al modificar.');
          this.showMsg('Error al modificar.', 'error');
        }
        this.submitted = false;
      },
      error => {
        this.loading = false;
        console.log('error', error);
        this.showMsg('Error al modificar.', 'error');
      }
    );
  }

  showMsg(msg: string, type: string) {
    this.objMsg.display = true;
    this.objMsg.msg = msg;
    this.objMsg.type = type;
    setTimeout(() => {
      this.clearMsg();
    }, 3000);
  }

  clearMsg() {
    this.objMsg.display = false;
    this.objMsg.msg = '';
    this.objMsg.type = '';
  }
}
