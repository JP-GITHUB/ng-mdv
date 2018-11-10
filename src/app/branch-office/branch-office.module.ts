import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BranchOfficeComponent } from './branch-office.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { DataTablesModule } from 'angular-datatables';
import { BranchOfficeAddComponent } from './branch-office-add/branch-office-add.component';
import { BranchOfficeEditComponent } from './branch-office-edit/branch-office-edit.component';
import { BranchOfficeDeleteComponent } from './branch-office-delete/branch-office-delete.component';
import { BranchOffice } from '../_classes/branchOffice';

@NgModule({
  imports: [
    CommonModule,
    DataTablesModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [BranchOfficeComponent, BranchOfficeAddComponent, BranchOfficeEditComponent, BranchOfficeDeleteComponent]
})
export class BranchOfficeModule { }