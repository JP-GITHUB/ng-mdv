import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { CatalogueComponent } from './catalogue/catalogue.component';
import { ModalCartComponent } from './modal-cart/modal-cart.component';

@NgModule({
  imports: [
    CommonModule,
    NgbModule
  ],
  declarations: [CatalogueComponent, ModalCartComponent]
})
export class CatalogueModule { }
