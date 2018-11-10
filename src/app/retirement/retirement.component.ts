import { Component, OnInit } from '@angular/core';
import { SaleService } from '../_services/sale.service';

@Component({
  selector: 'app-retirement',
  templateUrl: './retirement.component.html',
  styleUrls: ['./retirement.component.css']
})
export class RetirementComponent implements OnInit {
  public sales: any;

  constructor(
    private saleService: SaleService
  ) { }

  ngOnInit() {
  }

  getSales(rut: String) {
    this.sales = [
      {
        id: 1,
        rut_retirement: '0017665721-9',
        shoppingcart_id: 1,
        product_id: 1,
        quantity: 4
      },
      {
        id: 2,
        rut_retirement: '0017665721-9',
        shoppingcart_id: 2,
        product_id: 2,
        quantity: 4
      }
    ]
  }

}
