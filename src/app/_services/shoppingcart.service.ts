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
        if (element.productId == product.productId) {
          for (let internalIndex = 0; internalIndex < tmpCart[index].sizes.length; internalIndex++) {
            const element = tmpCart[index].sizes[internalIndex];
            if (element.sizeId == product.sizeId) {
              tmpCart[index].sizes[internalIndex].quantity = product.quantity;
              tmpCart[index].sizes[internalIndex].price = product.price;
            }
          }
          localStorage.setItem("ProductCart", JSON.stringify(tmpCart));
          return;
        }
      }

      tmpCart.push(product);
      localStorage.setItem("ProductCart", JSON.stringify(tmpCart));
    } else {
      let tmpProduct = [{
        productId: product.productId,
        genderId: product.genderId,
        sizes: [
          {
            sizeId: product.sizeId,
            quantity: product.quantity,
            price: product.price
          }
        ]
      }];
      console.log(tmpProduct)
      localStorage.setItem("ProductCart", JSON.stringify(tmpProduct));
    }
  }

  getProductLocalStorage() {
    let productCart = localStorage.getItem('ProductCart');
    return productCart;
  }
}
