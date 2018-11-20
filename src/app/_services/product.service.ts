import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DataTablesResponse } from '../_classes/data-tables-response';

import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  public url: String;

  constructor(public http: HttpClient) {
    this.url = environment.apiEndPoint;
  }

  getProductBySchool(school_id: Number) {
    return this.http.get(this.url + '/products/school/' + school_id);
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

  getDatatablesData(dataTablesParameters) {
    return this.http
      .post<DataTablesResponse>(
        this.url + '/products/datatables',
        dataTablesParameters, {
          headers: this.getHeaders()
        }
      );
  }

  getProductById(userId: number) {
    return this.http.get(this.url + '/products/' + userId, {
      headers: this.getHeaders()
    });
  }

  add(form: any) {
    return this.http.post(this.url + '/products', form,{
      headers: this.getHeaders()
    });
  }

  edit(form: any) {
    return this.http.put(this.url + '/products', form, {
      headers: this.getHeaders()
    });
  }

  delete(id: Number) {
    return this.http.delete(this.url + '/products/' + id, {
      headers: this.getHeaders()
    });
  }

}
