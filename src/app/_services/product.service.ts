import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(
    private http: HttpClient
  ) { }

  getProductBySchool(school_id: Number) {
    return this.http.get('http://localhost:3000/products/school/' + school_id);
  }
}
