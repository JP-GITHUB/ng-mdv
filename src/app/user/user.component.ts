import { Component, OnInit, ViewChild, Renderer, AfterViewInit } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';

import { User } from '../_classes/user';
import { UserService } from '../_services/user.service';
import { AuthService } from '../_services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  public profilesPage: any;

  @ViewChild(DataTableDirective)
  datatableElement: DataTableDirective;

  dtOptions: DataTables.Settings = {};
  users: User[];

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    const that = this;

    if (this.authService.permissions.indexOf('USERS') == -1) {
      this.router.navigate(['/']);
    }

    this.userService.getProfiles().subscribe(
      obj => {
        this.profilesPage = obj['data'];
      },
      error => {
        if (error.status === 401) {
          console.log(error);
          this.router.navigate(['/']);
        }
      }
    )

    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      serverSide: true,
      processing: true,
      ajax: (dataTablesParameters: any, callback) => {
        this.userService.getDatatablesData(dataTablesParameters).subscribe(
          resp => {
            that.users = resp.data;

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
      columns: [
        { data: 'id' },
        { data: 'name', title: 'nombre' },
        { data: 'lastname', title: 'apellidos' },
        { data: 'profile_name', title: 'nombre perfil' },
        { title: 'Acciones', width: '15%' }
      ]
    };
  }

  resetDatatables() {
    this.datatableElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.draw();
    });
  }

}