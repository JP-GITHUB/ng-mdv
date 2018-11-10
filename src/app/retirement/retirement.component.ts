import { Component, OnInit } from '@angular/core';
import { SaleService } from '../_services/sale.service';
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'app-retirement',
  templateUrl: './retirement.component.html',
  styleUrls: ['./retirement.component.css']
})
export class RetirementComponent implements OnInit {
  public sale: any;
  private currentCode;

  constructor(
    private saleService: SaleService,
    private notifierService: NotifierService
  ) { }

  ngOnInit() {
  }

  getSales(code: String) {
    this.currentCode = code;
    this.saleService.getSales(code).subscribe(
      (data) => {
        if (data['delivered']) {
          this.notifierService.notify('warning', 'La venta ya ha sido entregada anteriormente.');
        } else {
          this.sale = data;
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
          this.notifierService.notify('error',  resp['msg']);
        }
      }
    );
  }

}
