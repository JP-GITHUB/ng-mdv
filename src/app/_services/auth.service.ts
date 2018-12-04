import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import * as moment from "moment";

import { environment } from '../../environments/environment';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public url: String;

  constructor(
    public http: HttpClient,
    private router: Router
  ) {
    this.url = environment.apiEndPoint;
  }

  login(email: string, password: string) {
    return this.http.post<any>(`${this.url}/auth/login`, { mail: email, password: password })
      .pipe(map(user => {
        if (user && user.token) {
          const expiresAt = moment().add('1', 'hours');
          localStorage.setItem('currentUser', JSON.stringify(user));
          localStorage.setItem("expiresAt", JSON.stringify(expiresAt.valueOf()));
        }

        return user;
      }));
  }

  infoAuth() {
    let dataUser = JSON.parse(localStorage.getItem('currentUser'));
    if (dataUser) {
      return dataUser.user_data;
    } else {
      return null;
    }

  }

  logout() {
    localStorage.removeItem('currentUser');
    this.router.navigate(['/']);
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

  getExpiration() {
    const expiration = localStorage.getItem("expiresAt");
    const expiresAt = JSON.parse(expiration);
    return moment(expiresAt);
  }

  isLoggedOut() {
    let statusExpire = moment().isBefore(this.getExpiration());

    if (!statusExpire) {
      this.logout();
    }

    return statusExpire;
  }

  get isLoggedIn() {
    return (localStorage.getItem('currentUser') !== null ? true : false);
  }
}
