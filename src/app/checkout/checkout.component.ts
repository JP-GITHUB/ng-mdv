import { Component, OnInit } from '@angular/core';
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

  public externalPayUrl: String;

  public firstName: String;
  public lastName: String;
  public mail: String;
  public rut: String;

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

  loadInfoToken() {
    this.userService.getUserInToken().subscribe(
      resp => {
        this.firstName = resp['data'].name;
        this.lastName = resp['data'].lastname;
        this.mail = resp['data'].mail;
        this.rut = resp['data'].rut.trim();
      }
    );
  }

  public eventSale(event) {
    let dataEvent = JSON.parse(event);

    if (dataEvent['status']) {
      console.log(dataEvent['msg']);
      this.messageSale = "Gracias por comprar en Confecciones MDV";
      this.statusSale = dataEvent['status'];
      this.position = 'messageSale';
    }else{
      this.showCheckout();
    }
  }

  showCheckout() {
    this.loadInfoToken();
    this.position = 'checkout';
  }

}
