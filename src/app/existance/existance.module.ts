import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExistanceComponent } from './existance.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NotifierModule } from 'angular-notifier';

import { DataTablesModule } from 'angular-datatables';
import { ExistanceAddComponent } from './existance-add/existance-add.component';
import { ExistanceEditComponent } from './existance-edit/existance-edit.component';

@NgModule({
  imports: [
    CommonModule,
    DataTablesModule,
    FormsModule,
    ReactiveFormsModule,
    NotifierModule
  ],
  declarations: [ExistanceComponent, ExistanceAddComponent, ExistanceEditComponent]
})
export class ExistanceModule { }