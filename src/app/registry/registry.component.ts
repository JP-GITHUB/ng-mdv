import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../_services/user.service';

import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'app-registry',
  templateUrl: './registry.component.html',
  styleUrls: ['./registry.component.css']
})
export class RegistryComponent implements OnInit {
  private readonly notifier: NotifierService;

  registryForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: String;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    notifierService: NotifierService
  ) {
    this.notifier = notifierService;
  }

  ngOnInit() {
    this.registryForm = this.formBuilder.group({
      name: ['', Validators.required],
      lastname: ['', Validators.required],
      rut: ['', Validators.required],
      mail: ['', Validators.required],
      telephone: ['', Validators.required],
      password: ['', Validators.required],
      repassword: ['', Validators.required]
    });
  }

  get f() { return this.registryForm.controls; }

  onSubmit() {
    let data;
    this.submitted = true;

    if (this.registryForm.invalid) {
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

    this.userService.registry(data).subscribe(
      data => {
        if (data.hasOwnProperty('status')) {
          this.notifier.notify(data['status'] ? 'success' : 'error', data['msg']);
          this.registryForm.reset();
        } else {
          this.notifier.notify('error', 'Error al registrar.');
        }
        this.submitted = false;
      },
      error => {
        this.loading = false;
        this.notifier.notify('error', 'Error al registrar.');
      }
    )
  }
}
