import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public url: String;

  constructor(public http: HttpClient) {
    this.url = environment.apiEndPoint;
  }

  login(email: string, password: string) {
    return this.http.post<any>(`${this.url}/auth/login`, { mail: email, password: password })
      .pipe(map(user => {
        if (user && user.token) {
          localStorage.setItem('currentUser', JSON.stringify(user));
        }

        return user;
      }));
  }

  logout() {
    localStorage.removeItem('currentUser');
  }

  get permissions() {
    try {
      let dataUser = JSON.parse(localStorage.getItem('currentUser'));
      if (dataUser) {
        let permission = [];
        dataUser['permissions'].forEach(element => {
          permission.push(element.name);
        });

        return permission;
      } else {
        return [];
      }
    } catch (error) {
      return [];
    }
  }

  get isLoggedIn() {
    return (localStorage.getItem('currentUser') !== null ? true : false);
  }
}
