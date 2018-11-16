import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

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
}
