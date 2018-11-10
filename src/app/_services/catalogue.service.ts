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
    return this.http.get('https://api-mdv.herokuapp.com/schools/branchoffice/' + branchoffice_id);
  }
}
