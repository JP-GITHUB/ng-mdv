import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExistanceComponent } from './existance.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { DataTablesModule } from 'angular-datatables';
import { ExistanceAddComponent } from './existance-add/Existance-add.component';
import { ExistanceEditComponent } from './existance-edit/Existance-edit.component';
import { ExistanceDeleteComponent } from './existance-delete/Existance-delete.component';

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