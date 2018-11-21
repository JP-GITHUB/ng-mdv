import { Component, OnInit, ViewChild, Renderer, AfterViewInit } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';

import { Existance } from '../_classes/existance';
import { ExistanceService } from '../_services/existance.service';

@Component({
  selector: 'app-existance',
  templateUrl: './existance.component.html',
  styleUrls: ['./existance.component.css']
})
export class ExistanceComponent implements OnInit {
  @ViewChild(DataTableDirective)
  datatableElement: DataTableDirective;

  dtOptions: DataTables.Settings = {};
  existances: Existance[];

  constructor(
    private existanceService: ExistanceService
  ) { }

  ngOnInit(): void {
    const that = this;

    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      serverSide: true,
      processing: true,
      ajax: (dataTablesParameters: any, callback) => {
        this.existanceService.getDatatablesData(dataTablesParameters).subscribe(resp => {
          that.existances = resp.data;
          console.log(resp.data);

          callback({
            recordsTotal: resp.recordsTotal,
            recordsFiltered: resp.recordsFiltered,
            data: []
          });
        });
      },
      columns: [{ data: 'Product.name', title: 'Producto' }, { data: 'price', title: 'Precio' }, { data: 'quantity', title: 'Cantidad' },
      { data: 'Size.description', title: 'Talla' }, { title: 'Acciones', width: '15%' }]
    };
  }

  resetDatatables() {
    this.datatableElement.dtInstance.then((dtInstance: DataTables.Api) => { 
      dtInstance.draw();
    });
  }
}
