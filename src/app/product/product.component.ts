import { Component, OnInit, ViewChild, Renderer, AfterViewInit } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';

import { Product } from '../_classes/product';
import { ProductService } from '../_services/product.service';
import { AuthService } from '../_services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  @ViewChild(DataTableDirective)
  datatableElement: DataTableDirective;

  dtOptions: DataTables.Settings = {};
  products: Product[];

  constructor(
    private productService: ProductService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    const that = this;

    if (this.authService.permissions.indexOf('PRODUCTS') == -1) {
      this.router.navigate(['/']);
    }

    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      serverSide: true,
      processing: true,
      ajax: (dataTablesParameters: any, callback) => {
        this.productService.getDatatablesData(dataTablesParameters).subscribe(
          resp => {
            that.products = resp.data.filter(data => data.status == true);

            callback({
              recordsTotal: resp.recordsTotal,
              recordsFiltered: resp.recordsFiltered,
              data: []
            });
          },
          error => {
            if (error.status === 401) {
              console.log(error);
              this.router.navigate(['/']);
            }
          });
      },
      columns: [{ data: 'id' }, { data: 'name', title: 'nombre' }, { data: 'description', title: 'descripción' },
      { data: 'School.name', title: 'colegio' }, { data: 'Gender.description', title: 'genero' }, { title: 'Acciones', width: '15%' }]
    };
  }

  resetDatatables() {
    this.datatableElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.draw();
    });
  }
}