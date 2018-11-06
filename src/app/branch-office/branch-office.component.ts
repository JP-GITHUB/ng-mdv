import { Component, OnInit, ViewChild } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';

import { BranchOffice } from '../_classes/branchOffice';
import { BranchOfficeService } from '../_services/branch-office.service'

@Component({
  selector: 'app-branch-office',
  templateUrl: './branch-office.component.html',
  styleUrls: ['./branch-office.component.css']
})
export class BranchOfficeComponent implements OnInit {
  @ViewChild(DataTableDirective)
  datatableElement: DataTableDirective;

  dtOptions: DataTables.Settings = {};
  branchOffices: BranchOffice[];

  constructor(
    private branchOfficeService: BranchOfficeService
  ) { }

  ngOnInit(): void {
    const that = this;

    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      serverSide: true,
      processing: true,
      ajax: (dataTablesParameters: any, callback) => {
        this.branchOfficeService.getDatatablesData(dataTablesParameters).subscribe(resp => {
          that.branchOffices = resp.data;

          callback({
            recordsTotal: resp.recordsTotal,
            recordsFiltered: resp.recordsFiltered,
            data: []
          });
        });
      },
      columns: [{ data: 'name', title: 'Nombre' }, { data: 'location', title: 'Ubicación' }, { data: 'telephone', title: 'Telefono'}, { title: 'Acciones', width: '15%' }]
    };
  }
  
  resetDatatables() {
    this.datatableElement.dtInstance.then((dtInstance: DataTables.Api) => { 
      dtInstance.draw();
    });
  }

}
