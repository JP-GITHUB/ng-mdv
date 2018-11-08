import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NotifierModule } from 'angular-notifier';

import { CatalogueComponent } from './catalogue/catalogue.component';
import { ModalCartComponent } from './modal-cart/modal-cart.component';
import { CheckoutComponent } from './checkout/checkout.component';


@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CommonModule,
    NgbModule,
    FormsModule,
    NotifierModule
  ],
  declarations: [CatalogueComponent, ModalCartComponent, CheckoutComponent]
})
export class CatalogueModule { }
