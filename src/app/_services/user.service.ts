import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { DataTablesResponse } from '../_classes/data-tables-response';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private http: HttpClient
  ) { }

  getDatatablesData(dataTablesParameters) {
    return this.http
      .post<DataTablesResponse>(
        'http://localhost:3000/users/datatables',
        dataTablesParameters, {}
      )
  }

  registry(form: any) {
    return this.http.post('http://localhost:3000/users/register', form);
  }
}
