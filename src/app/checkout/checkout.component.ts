import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ShoppingcartService } from '../_services/shoppingcart.service';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  public resumeProduct: any;
  public totalPrice: Number;

  @ViewChild('firstName') firstName: ElementRef; 
  @ViewChild('lastName') lastName: ElementRef;
  @ViewChild('mail') mail: ElementRef; 

  constructor(
    private scService: ShoppingcartService,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.resumeProduct = JSON.parse(this.scService.getProductLocalStorage());
    this.totalPrice = Number(localStorage.getItem('TotalPrices'));

    this.userService.getUserInToken().subscribe(
      resp => {
        this.firstName.nativeElement.value = resp['data'].name;
        this.lastName.nativeElement.value = resp['data'].lastname;
        this.mail.nativeElement.value = resp['data'].mail;
      }
    );
  }

}
