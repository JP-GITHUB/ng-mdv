import { Component, OnInit } from '@angular/core';
import { of, Observable } from 'rxjs';
import { ShoppingcartService } from 'src/app/_services/shoppingcart.service';

@Component({
  selector: 'app-shoppingcart',
  templateUrl: './shoppingcart.component.html',
  styleUrls: ['./shoppingcart.component.css']
})
export class ShoppingcartComponent implements OnInit {
  public productSaved: any;
  public obsProductSaved: Observable<any>;

  public productResume: any = [];
  public totalPrices = 0;

  constructor(
    private shoppingcartService: ShoppingcartService
  ) { }

  ngOnInit() {
    this.productSaved = JSON.parse(this.shoppingcartService.getProductLocalStorage());
    this.obsProductSaved = of(this.productSaved);
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

    this.shoppingcartService.setResumeProduct(this.productResume, this.totalPrices);
  }

  deleteProductCart(productId) {
    let tmpProducts = [];
    this.productSaved = JSON.parse(this.shoppingcartService.getProductLocalStorage()) as Array<any>;
    for (let index = 0; index < this.productSaved.length; index++) {
      if (this.productSaved[index].productId != productId) {
        tmpProducts.push(this.productSaved[index])
      }
    }
    localStorage.setItem("ProductCart", JSON.stringify(tmpProducts));
    this.obsProductSaved = of(tmpProducts);
  }
}