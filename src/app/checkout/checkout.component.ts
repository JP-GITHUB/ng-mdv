import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ShoppingcartService } from '../_services/shoppingcart.service';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  public position = 'checkout';
  private messageSale: String;
  private statusSale: boolean;

  public resumeProduct: any;
  public totalPrice: Number;
  public totalProduct: Number;

  @ViewChild('firstName') firstName: ElementRef;
  @ViewChild('lastName') lastName: ElementRef;
  @ViewChild('mail') mail: ElementRef;
  @ViewChild('rut') rut: ElementRef;

  constructor(
    private scService: ShoppingcartService,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.resumeProduct = JSON.parse(this.scService.getProductLocalStorage());
    this.totalPrice = Number(localStorage.getItem('TotalPrices'));
    this.loadInfoToken();

    this.totalProduct = this.scService.total;
  }

  loadInfoToken(){
    this.userService.getUserInToken().subscribe(
      resp => {
        this.firstName.nativeElement.value = resp['data'].name;
        this.lastName.nativeElement.value = resp['data'].lastname;
        this.mail.nativeElement.value = resp['data'].mail;
        this.rut.nativeElement.value = resp['data'].rut.trim();
      }
    );
  }

  makeSale() {
    let formData = {
      firstName: this.firstName.nativeElement.value,
      lastName: this.lastName.nativeElement.value,
      rut: this.rut.nativeElement.value,
      mail: this.mail.nativeElement.value,
      products: this.resumeProduct,
      totalValue: this.totalPrice
    };

    this.scService.makeSale(formData).subscribe(
      data => {
        console.log(data)
        this.messageSale = data['msg'];
        this.statusSale = data['status'];

        if (data['status']) {
          this.scService.clearProductLocalStorage();

        }

        this.position = 'messageSale';
      }
    );
  }

  showCheckout(){
    this.loadInfoToken();
    this.position = 'checkout';
  }

}
