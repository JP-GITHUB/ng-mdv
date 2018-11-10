import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

import { NavbarService } from 'src/app/_services/navbar.service';
import { AuthService } from 'src/app/_services/auth.service';
import { ShoppingcartService } from 'src/app/_services/shoppingcart.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  route: string;

  constructor(
    public navbarService: NavbarService,
    private authService: AuthService,
    private location: Location,
    private router: Router
  ) { }

  ngOnInit() {
    this.router.events.subscribe((val) => {
      if (this.location.path() != '') {
        this.route = this.location.path();
      } else {
        this.route = 'ROOT'
      }
    })
  }

  get loggedIn() { return this.authService.isLoggedIn; }

  onLogout() {
    this.authService.logout();
  }

  displayCheckout() {
  }
}
