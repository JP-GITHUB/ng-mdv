import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DataTablesResponse } from '../_classes/data-tables-response';

import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SchoolService {
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
        this.url + '/schools/datatables',
        dataTablesParameters, {
          headers: this.getHeaders()
        }
      );
  }

  getSchoolById(schoolId: number) {
    return this.http.get(this.url + '/schools/' + schoolId, {
      headers: this.getHeaders()
    });
  }

  getSchools() {
    return this.http.get(this.url + '/schools', {
      headers: this.getHeaders()
    });
  }

  add(form: any) {
    return this.http.post(this.url + '/schools', form, {
      headers: this.getHeaders()
    });
  }

  edit(form: any) {
    return this.http.put(this.url + '/schools', form, {
      headers: this.getHeaders()
    });
  }

  delete(branchOfficeId: Number) {
    return this.http.delete(this.url + '/schools/' + branchOfficeId, {
      headers: this.getHeaders()
    });
  }  
}