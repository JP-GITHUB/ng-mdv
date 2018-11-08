import { Component, OnInit } from '@angular/core';
import { NavbarService } from 'src/app/_services/navbar.service';
import { AuthService } from 'src/app/_services/auth.service';
import { DataService } from 'src/app/_services/data.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(
    public navbarService: NavbarService,
    private authService: AuthService,
    private dataService: DataService
  ) { }

  ngOnInit() {
  }

  get loggedIn() { return this.authService.isLoggedIn; }

  onLogout() {
    this.authService.logout();
  }

  displayCheckout() {
    this.dataService.changeMessage(JSON.stringify({checkout: 'toggle'}));
  }
}
