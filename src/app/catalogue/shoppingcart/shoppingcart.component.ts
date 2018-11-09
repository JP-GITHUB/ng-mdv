import { Component, OnInit } from '@angular/core';

import { ShoppingcartService } from 'src/app/_services/shoppingcart.service';

@Component({
  selector: 'app-shoppingcart',
  templateUrl: './shoppingcart.component.html',
  styleUrls: ['./shoppingcart.component.css']
})
export class ShoppingcartComponent implements OnInit {
  public productSaved: any;
  public productResume: any = [];
  public totalPrices = 0;

  constructor(
    private shoppingcartService: ShoppingcartService
  ) { }

  ngOnInit() {
    this.productSaved = JSON.parse(this.shoppingcartService.getProductLocalStorage());

    this.productSaved.forEach(element => {
      let internalElement = element;
      let sumPrice = 0;
      for (let index = 0; index < element.sizes.length; index++) {
        let internalSizes = element.sizes[index];
        sumPrice += internalSizes.price;
      }

      internalElement.totalPrice = sumPrice;
      this.totalPrices += sumPrice;
      this.productResume.push(internalElement);
    });
  }
}
