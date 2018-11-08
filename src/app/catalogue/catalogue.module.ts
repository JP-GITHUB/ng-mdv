import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NotifierModule } from 'angular-notifier';

import { CatalogueComponent } from './catalogue/catalogue.component';
import { ModalCartComponent } from './modal-cart/modal-cart.component';


@NgModule({
  imports: [
    CommonModule,
    NgbModule,
    FormsModule,
    NotifierModule
  ],
  declarations: [CatalogueComponent, ModalCartComponent]
})
export class CatalogueModule { }
