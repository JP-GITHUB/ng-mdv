import { Component, OnInit } from '@angular/core';
import { NavbarService } from '../_services/navbar.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public hoverLocation: String = '/assets/images/location1.png';

  constructor(
    private navbarService: NavbarService,
    private router: Router
  ) { }

  ngOnInit() {
    this.navbarService.controlStatus(true);
  }

  goCatalogue(id: Number) {
    this.router.navigate(['/catalogo/sucursal/', id]);
  }

  changeLocationMap(location: String){
    this.hoverLocation = location;
  }
}
