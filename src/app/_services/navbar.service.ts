import { Injectable, Output, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NavbarService {
  control = false;
  @Output() change: EventEmitter<boolean> = new EventEmitter()

  constructor() { }

  controlStatus(status: boolean) {
    this.control = status;
    this.change.emit(this.control);
  }
}
