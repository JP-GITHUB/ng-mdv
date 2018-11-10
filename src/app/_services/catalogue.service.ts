import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CatalogueService {

  constructor(
    private http: HttpClient
  ) { }

  getShoolsByBranchoffice(branchoffice_id: Number) {
    return this.http.get('http://localhost:3000/schools/branchoffice/' + branchoffice_id);
  }
}
