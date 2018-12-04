import { Component, OnInit } from '@angular/core';
import { SaleService } from '../_services/sale.service';
import { NotifierService } from 'angular-notifier';
import { AuthService } from '../_services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-retirement',
  templateUrl: './retirement.component.html',
  styleUrls: ['./retirement.component.css']
})
export class RetirementComponent implements OnInit {
  public sale: any;
  private currentCode;

  public statusBtnRetirement: boolean = false;

  constructor(
    private saleService: SaleService,
    private notifierService: NotifierService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    if (this.authService.permissions.indexOf('RETIREMENTS') == -1) {
      this.router.navigate(['/']);
    }
  }

  getSales(code: String) {
    if (code.length < 4) {
      this.notifierService.notify('warning', 'La búsqueda debe contener mínimo 4 caracteres.');
      return;
    }

    this.currentCode = code;
    this.saleService.getSales(code).subscribe(
      (data) => {
        if (data['delivered']) {
          this.statusBtnRetirement = true;
          this.notifierService.notify('warning', 'La venta ya ha sido entregada anteriormente.');
        } else {
          if (data['payment_status'] != "1") {
            this.statusBtnRetirement = true;
            this.notifierService.notify('warning', 'El producto no puede ser entregado. ' + (data['payment_status'] == '0' ? '[No pago]' : ''));
          } else {
            this.statusBtnRetirement = false;
            this.sale = data;
          }
        }

      },
      (error) => {
        if (error.status === 401) {
          console.log(error);
          this.router.navigate(['/']);
        }
      }
    );
  }

  deliver() {
    this.saleService.deliver(this.currentCode).subscribe(
      (resp) => {
        if (resp['status']) {
          this.notifierService.notify('success', resp['msg']);
        } else {
          this.notifierService.notify('error', resp['msg']);
        }
      }
    );
  }

}
