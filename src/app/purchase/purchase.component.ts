import { Component, OnInit } from '@angular/core';
import { SaleService } from '../_services/sale.service';
import { NotifierService } from 'angular-notifier';
import { AuthService } from '../_services/auth.service';
import { Router } from '@angular/router';

import { of, Observable } from 'rxjs';

@Component({
  selector: 'app-purchase',
  templateUrl: './purchase.component.html',
  styleUrls: ['./purchase.component.css']
})
export class PurchaseComponent implements OnInit {
  public name: String;
  public lastName: String;
  public userEmail: String;

  public sale;
  public saleObs: Observable<any>;

  constructor(
    private saleService: SaleService,
    private notifierService: NotifierService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    let userData = this.authService.infoAuth();
    if (userData) {
      this.getSales(userData.mail);
    } else {
      this.sale = false;
    }
  }

  getSales(userEmail: String) {
    if (userEmail.length < 4) {
      this.notifierService.notify('warning', 'La búsqueda debe contener al menos 4 caracteres');
      return;
    }

    this.userEmail = userEmail;

    this.saleService.getPurchasesByUser(userEmail).subscribe(
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
