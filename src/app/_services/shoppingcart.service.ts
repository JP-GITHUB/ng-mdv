import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ShoppingcartService {

  constructor() { }

  saveProductLocalStorage(product: any) {
    let productCart = localStorage.getItem('ProductCart');
    let tmpCart: any;

    if (productCart) {
      tmpCart = JSON.parse(productCart) as Array<any>;
      let countProduct = tmpCart.length;

      for (let index = 0; index < countProduct; index++) {
        const element = tmpCart[index];
        if (element.productId == product.productId && element.genderId == element.genderId && element.sizeId == product.sizeId) {
          console.log("???")
          tmpCart[index].quantity = product.quantity;
          tmpCart[index].price = product.price;

          localStorage.setItem("ProductCart", JSON.stringify(tmpCart));
          return;
        }
      }

      tmpCart.push(product);
      localStorage.setItem("ProductCart", JSON.stringify(tmpCart));
    } else {
      localStorage.setItem("ProductCart", JSON.stringify([product]));
    }
  }
}
