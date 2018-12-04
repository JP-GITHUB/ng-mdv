import { Component, OnInit, ViewChild, Renderer, AfterViewInit } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';

import { Existance } from '../_classes/existance';
import { ExistanceService } from '../_services/existance.service';
import { AuthService } from '../_services/auth.service';
import { Router } from '@angular/router';

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
    private existanceService: ExistanceService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    const that = this;

    if (this.authService.permissions.indexOf('EXISTANCES') == -1) {
      this.router.navigate(['/']);
    }

    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      serverSide: true,
      processing: true,
      ajax: (dataTablesParameters: any, callback) => {
        this.existanceService.getDatatablesData(dataTablesParameters).subscribe(resp => {
          that.existances = resp.data;

          callback({
            recordsTotal: resp.recordsTotal,
            recordsFiltered: resp.recordsFiltered,
            data: []
          });
        });
      },
      columns: [
        { data: 'Product.name', title: 'Producto' },
        { data: 'price', title: 'Precio', orderable: false },
        { data: 'quantity', title: 'Cantidad', orderable: false },
        { data: 'Size.description', title: 'Talla' },
        { title: 'Acciones', width: '15%', orderable: false }
      ]
    };
  }

  resetDatatables() {
    this.datatableElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.draw();
    });
  }
}
