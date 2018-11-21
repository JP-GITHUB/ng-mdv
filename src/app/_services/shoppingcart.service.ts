import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from '../../environments/environment';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ShoppingcartService {

  public url: String;

  constructor(
    public http: HttpClient,
    private router: Router
  ) {
    this.url = environment.apiEndPoint;
  }

  private getHeaders() {
    let localSession = localStorage.getItem('currentUser');
    let headers = null;
    if (localSession) {
      let userData = JSON.parse(localSession);
      headers = new HttpHeaders()
        .set('Content-Type', 'application/json')
        .set('Authorization', 'Bearer ' + userData.token);
    }

    return headers;
  }

  saveProductLocalStorage(product: any) {
    let productCart = localStorage.getItem('ProductCart');
    let tmpCart: any;

    let tmpNewProduct = {
      productId: product.productId,
      productName: product.productName,
      genderText: product.genderText,
      image: product.image,
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
      if (countProduct > 0) {
        for (let index = 0; index < countProduct; index++) {
          const element = tmpCart[index];
          if (element.productId == product.productId) {
            for (let internalIndex = 0; internalIndex < tmpCart[index].sizes.length; internalIndex++) {
              const element = tmpCart[index].sizes[internalIndex];
              if (element.sizeId == product.sizeId) {
                tmpCart[index].sizes[internalIndex].sizeId = product.sizeId;
                tmpCart[index].sizes[internalIndex].quantity = product.quantity;
                break;
              } else {
                tmpCart[index].sizes.push({ sizeId: product.sizeId, textSize: product.textSize, quantity: product.quantity, price: product.price });
                break;
              }
            }

            localStorage.setItem("ProductCart", JSON.stringify(tmpCart));
          } else {
            let dato = tmpCart.find(o => o.productId == tmpNewProduct.productId);
            if (dato == undefined) {
              tmpCart.push(tmpNewProduct);
              localStorage.setItem("ProductCart", JSON.stringify(tmpCart));
            }
          }
          return;
        }
      } else {
        localStorage.setItem("ProductCart", JSON.stringify([tmpNewProduct]));
      }
    } else {
      localStorage.setItem("ProductCart", JSON.stringify([tmpNewProduct]));
    }
  }

  get total() {
    let productCart = localStorage.getItem('ProductCart');
    let tmpCart = JSON.parse(productCart);

    return (tmpCart) ? tmpCart.length : 0;
  }

  setResumeProduct(resumeProduct, totalPrices) {
    localStorage.setItem("ProductCart", JSON.stringify(resumeProduct));
    localStorage.setItem("TotalPrices", totalPrices);
    
    if(resumeProduct.length == 0){
      this.router.navigate(['/']);
    }
  }

  getProductLocalStorage() {
    let productCart = localStorage.getItem('ProductCart');
    return productCart;
  }

  clearProductLocalStorage() {
    localStorage.removeItem('ProductCart');
    localStorage.removeItem('TotalPrices');
  }

  makeSale(formData: any) {
    return this.http.post(this.url + '/sales', formData, {
      headers: this.getHeaders()
    });
  }

  payment(formData: any) {
    return this.http.post(this.url + '/payments', formData, {
      headers: this.getHeaders()
    });
  }
}
