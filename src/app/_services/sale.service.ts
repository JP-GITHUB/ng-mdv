import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SaleService {

  constructor(
    private http: HttpClient
  ) { }

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
    return this.http.get('http://localhost:3000/sales/' + code, {
      headers: this.getHeaders()
    });
  }

  deliver(code: String) {
    return this.http.post('http://localhost:3000/sales/deliver', { code: code }, {
      headers: this.getHeaders()
    });
  }
}
