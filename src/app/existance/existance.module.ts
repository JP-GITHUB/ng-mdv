import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExistanceComponent } from './existance.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { DataTablesModule } from 'angular-datatables';
import { ExistanceAddComponent } from './existance-add/existance-add.component';
import { ExistanceEditComponent } from './existance-edit/existance-edit.component';
import { ExistanceDeleteComponent } from './existance-delete/existance-delete.component';

@NgModule({
  imports: [
    CommonModule,
    DataTablesModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [ExistanceComponent, ExistanceAddComponent, ExistanceEditComponent, ExistanceDeleteComponent]
})
export class ExistanceModule { }