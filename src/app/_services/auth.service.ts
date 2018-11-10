import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) { }

  login(email: string, password: string) {
    return this.http.post<any>(`https://api-mdv.herokuapp.com/auth/login`, { mail: email, password: password })
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
