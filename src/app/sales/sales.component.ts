import { Component, OnInit } from '@angular/core';
import { SaleService } from '../_services/sale.service';
import { NotifierService } from 'angular-notifier';
import { AuthService } from '../_services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.css']
})
export class SalesComponent implements OnInit {
  public sale: any;
  public name: String;
  public lastName: String;

  constructor(
    private saleService: SaleService,
    private notifierService: NotifierService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  getSales(user_email: String) {
    if (user_email.length < 4) {
      this.notifierService.notify('warning', 'La búsqueda debe contener al menos 4 caracteres.');
      return;
    }

    this.saleService.getSalesByUser(user_email).subscribe(
      (data) => {        
        this.name = data['name'];
        this.lastName = data['lastname'];
        this.sale = data['Sales'];
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
