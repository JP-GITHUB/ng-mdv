import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private messageSource = new BehaviorSubject('{}');
  currentMessage = this.messageSource.asObservable();

  getUrl() {
    return environment.apiEndPoint;
  }

  changeMessage(message: string) {
    this.messageSource.next(message);
  }
}
