import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { DataTablesResponse } from '../_classes/data-tables-response';

@Injectable({
  providedIn: 'root'
})
export class BranchOfficeService {

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

  getDatatablesData(dataTablesParameters) {
    return this.http
      .post<DataTablesResponse>(
        'http://localhost:3000/branch-offices/datatables',
        dataTablesParameters, {}
      )
  }

  getBranchOfficeById(branchOfficeId: number) {
    return this.http.get('http://localhost:3000/branch-offices/' + branchOfficeId, {
      headers: this.getHeaders()
    });
  }

  add(form: any) {
    return this.http.post('http://localhost:3000/branch-offices', form);
  }

  edit(form: any) {
    return this.http.put('http://localhost:3000/branch-offices', form, {
      headers: this.getHeaders()
    });
  }

  delete(branchOfficeId: Number) {
    return this.http.delete('http://localhost:3000/branch-offices/' + branchOfficeId, {
      headers: this.getHeaders()
    });
  }  
}