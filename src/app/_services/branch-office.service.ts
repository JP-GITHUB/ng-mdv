import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DataTablesResponse } from '../_classes/data-tables-response';

import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BranchOfficeService {
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

  getDatatablesData(dataTablesParameters) {
    return this.http
      .post<DataTablesResponse>(
        this.url + '/branch-offices/datatables',
        dataTablesParameters, {
          headers: this.getHeaders()
        }
      );
  }

  getBranchOfficeById(branchOfficeId: number) {
    return this.http.get(this.url + '/branch-offices/' + branchOfficeId, {
      headers: this.getHeaders()
    });
  }

  add(form: any) {
    return this.http.post(this.url + '/branch-offices', form, {
      headers: this.getHeaders()
    });
  }

  edit(form: any) {
    return this.http.put(this.url + '/branch-offices', form, {
      headers: this.getHeaders()
    });
  }

  delete(branchOfficeId: Number) {
    return this.http.delete(this.url + '/branch-offices/' + branchOfficeId, {
      headers: this.getHeaders()
    });
  }  
}