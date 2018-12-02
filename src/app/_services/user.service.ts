import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DataTablesResponse } from '../_classes/data-tables-response';

import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class UserService {
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
        this.url + '/users/datatables',
        dataTablesParameters, {}
      )
  }

  getUserById(userId: number) {
    return this.http.get(this.url + '/users/' + userId, {
      headers: this.getHeaders()
    });
  }

  getUserInToken() {
    return this.http.get(this.url + '/info_token', {
      headers: this.getHeaders()
    });
  }

  getProfiles() {
    return this.http.get(this.url + '/profiles', {
      headers: this.getHeaders()
    });
  }

  registry(form: any) {
    return this.http.post(this.url + '/users/register', form);
  }

  add(form: any) {
    return this.http.post(this.url + '/users', form);
  }

  edit(form: any) {
    return this.http.put(this.url + '/users', form, {
      headers: this.getHeaders()
    });
  }

  delete(id: Number) {
    return this.http.delete(this.url + '/users/' + id, {
      headers: this.getHeaders()
    });
  }
}
