import { Component, OnInit } from '@angular/core';

import { ShoppingcartService } from 'src/app/_services/shoppingcart.service';

@Component({
  selector: 'app-shoppingcart',
  templateUrl: './shoppingcart.component.html',
  styleUrls: ['./shoppingcart.component.css']
})
export class ShoppingcartComponent implements OnInit {
  public productSaved: any;
  public totalProductCart = 0;

  constructor(
    private shoppingcartService: ShoppingcartService
  ) { }

  ngOnInit() {
    console.log(this.shoppingcartService.getProductLocalStorage())
  }
}
