import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';

import { ContactForm } from './contact';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Authorization': 'my-auth-token'
  })
};

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  contactUrl = 'Colocar aqui la api cuando entienda esta shit';

  constructor(
    private http: HttpClient,
  ) { }

  addContact (contactForm : ContactForm): Observable<ContactForm> {
    return this.http.post<ContactForm>(this.contactUrl, contactForm, httpOptions)
      .pipe();
  }
}
