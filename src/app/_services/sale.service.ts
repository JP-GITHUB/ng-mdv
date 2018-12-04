import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SaleService {
  public url: String;

  constructor(public http: HttpClient) {
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

  getSales(code: String) {
    return this.http.get(this.url + '/sales/code/' + code, {
      headers: this.getHeaders()
    });
  }

  getSalesByUser(email: String) {
    return this.http.get(this.url + '/sales/user_email/' + email, {
      headers: this.getHeaders()
    });
  }

  deliver(code: String) {
    return this.http.post(this.url + '/sales/deliver', { code: code }, {
      headers: this.getHeaders()
    });
  }

  cancelSale(saleId) {
    return this.http.post(this.url + '/sales/cancel', { sale_id: saleId }, {
      headers: this.getHeaders()
    });
  }

}
