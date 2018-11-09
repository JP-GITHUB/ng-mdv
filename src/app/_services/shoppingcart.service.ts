import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ShoppingcartService {

  constructor() { }

  saveProductLocalStorage(product: any) {
    let productCart = localStorage.getItem('ProductCart');
    let tmpCart: any;

    let tmpNewProduct = {
      productId: product.productId,
      productName: product.productName,
      genderText: product.genderText,
      sizes: [
        {
          sizeId: product.sizeId,
          textSize: product.textSize,
          quantity: product.quantity,
          price: product.price
        }
      ]
    };

    if (productCart) {
      tmpCart = JSON.parse(productCart) as Array<any>;
      let countProduct = tmpCart.length;

      for (let index = 0; index < countProduct; index++) {
        const element = tmpCart[index];
        if (element.productId == product.productId) {
          for (let internalIndex = 0; internalIndex < tmpCart[index].sizes.length; internalIndex++) {
            const element = tmpCart[index].sizes[internalIndex];
            if (element.sizeId == product.sizeId) {
              tmpCart[index].sizes[internalIndex].sizeId = product.sizeId;
              tmpCart[index].sizes[internalIndex].quantity = product.quantity;
              break;
            }else{
              tmpCart[index].sizes.push({ sizeId: product.sizeId, textSize: product.textSize, quantity: product.quantity, price: product.price });
              break;
            }
          }

          localStorage.setItem("ProductCart", JSON.stringify(tmpCart));
        } else {
          tmpCart.push(tmpNewProduct);
          localStorage.setItem("ProductCart", JSON.stringify(tmpCart));
        }
        return;
      }
    } else {
      localStorage.setItem("ProductCart", JSON.stringify([tmpNewProduct]));
    }
  }

  setResumeProduct(resumeProduct, totalPrices){
    localStorage.setItem("ProductCart", JSON.stringify(resumeProduct));
    localStorage.setItem("TotalPrices", totalPrices);
  }

  getProductLocalStorage() {
    let productCart = localStorage.getItem('ProductCart');
    return productCart;
  }
}
