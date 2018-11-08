import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/_services/data.service';
import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';
import { ShoppingcartService } from 'src/app/_services/shoppingcart.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
  animations: [
    trigger('openClose', [
      state('open', style({
        opacity: 1,
        display: 'block'
      })),
      state('closed', style({
        opacity: 0.2,
        display: 'none'
      })),
      transition('open => closed', [
        animate('0.2s')
      ]),
      transition('closed => open', [
        animate('0.2s')
      ]),
    ])
  ]
})
export class CheckoutComponent implements OnInit {

  public isOpen: boolean = true;
  public productSaved: any;

  constructor(
    private dataService: DataService,
    private shoppingcartService: ShoppingcartService
  ) { }

  ngOnInit() {
    this.dataService.currentMessage.subscribe(
      (data) => {
        let jsonData = JSON.parse(data);
        if (jsonData.hasOwnProperty('checkout')) {
          this.isOpen = !this.isOpen;

          this.productSaved = this.shoppingcartService.getProductLocalStorage();
        }
      }
    )
  }
}
