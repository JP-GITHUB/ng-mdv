import { Component, OnInit } from '@angular/core';
import { NavbarService } from '../_services/navbar.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    private navbarService: NavbarService
  ) { }

  ngOnInit() {
    this.navbarService.controlStatus(false);
  }

}
