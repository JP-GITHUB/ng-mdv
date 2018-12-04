import { Component, OnInit } from '@angular/core';
import { SaleService } from '../_services/sale.service';
import { NotifierService } from 'angular-notifier';
import { AuthService } from '../_services/auth.service';
import { Router } from '@angular/router';

import { of, Observable } from 'rxjs';

@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.css']
})
export class SalesComponent implements OnInit {
  public name: String;
  public lastName: String;
  public userEmail: String;

  public sale: any;
  public saleObs: Observable<any>;

  constructor(
    private saleService: SaleService,
    private notifierService: NotifierService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  eventCancel(event) {
    this.notifierService.notify('success', 'La venta fue anulada correctamente.')
    if (event) {
      this.saleService.getSalesByUser(this.userEmail).subscribe(
        (data) => {
          this.saleObs = of(data['Sales']);
        },
        (error) => {
          if (error.status === 401) {
            console.log(error);
            this.router.navigate(['/']);
          }
        }
      );
    } else {
      // NOTHING
    }

  }

  getSales(userEmail: String) {
    if (userEmail.length < 4) {
      this.notifierService.notify('warning', 'La búsqueda debe contener al menos 4 caracteres');
      return;
    }

    this.userEmail = userEmail;

    this.saleService.getSalesByUser(userEmail).subscribe(
      (data) => {
        this.name = data['name'];
        this.lastName = data['lastname'];
        this.sale = data['Sales'];
        this.saleObs = of(data['Sales']);
      },
      (error) => {
        if (error.status === 401) {
          console.log(error);
          this.router.navigate(['/']);
        }
      }
    );
  }
}
