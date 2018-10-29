import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { NotifierService } from 'angular-notifier';

import { NavbarService } from '../_services/navbar.service';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  private readonly notifier: NotifierService;

  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: String;

  constructor(
    private navbarService: NavbarService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    notifierService: NotifierService
  ) {
    this.notifier = notifierService;
  }

  ngOnInit() {
    this.navbarService.controlStatus(false);
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  get f() { return this.loginForm.controls; }

  onSubmit() {
    this.submitted = true;

    if (this.loginForm.invalid) {
      console.log("Invalid form");
      return;
    }

    this.loading = true;

    this.authService.login(this.f.email.value, this.f.password.value)
      .pipe(first())
      .subscribe(
        data => {
          if (data['status']) {
            this.router.navigate(["/"]);
          } else {
            this.notifier.notify('error', data['msg']);
          }

          this.loading = false;
        },
        error => {
          this.loading = false;
          this.notifier.notify('error', 'Error al ingresar.');
        });
  }

  onLogout() {
    this.authService.logout();
  }
}
