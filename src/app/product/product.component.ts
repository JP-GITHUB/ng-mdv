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
      language: {
        processing: "Procesando...",
        search: "Buscar:",
        lengthMenu: "Mostrar _MENU_ registros",
        info: "Mostrando desde _START_ al _END_ de _TOTAL_ elementos",
        infoEmpty: "Mostrando ningún elemento.",
        infoFiltered: "(filtrado _MAX_ elementos total)",
        infoPostFix: "",
        loadingRecords: "Cargando registros...",
        zeroRecords: "No se encontraron registros",
        emptyTable: "No hay datos disponibles en la tabla",
        paginate: {
          first: "Primero",
          previous: "Anterior",
          next: "Siguiente",
          last: "Último"
        },
        aria: {
          sortAscending: ": Activar para ordenar la tabla en orden ascendente",
          sortDescending: ": Activar para ordenar la tabla en orden descendente"
        }
      },
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
      columns: [{ data: 'id' }, { data: 'name', title: 'Nombre' }, { data: 'description', title: 'Descripción' },
      { data: 'School.name', title: 'Colegio' }, { data: 'Gender.description', title: 'Género' }, { title: 'Acciones', width: '15%' }]
    };
  }

  resetDatatables() {
    this.datatableElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.draw();
    });
  }
}