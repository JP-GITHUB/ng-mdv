import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CatalogueService {
  public url: String;

  constructor(public http: HttpClient) {
    this.url = environment.apiEndPoint;
  }

  getShoolsByBranchoffice(branchoffice_id: Number) {
    return this.http.get(this.url + '/schools/branchoffice/' + branchoffice_id);
  }
}
