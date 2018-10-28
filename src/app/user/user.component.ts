import { Component, OnInit } from '@angular/core';
import { User } from '../_classes/user';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  dtOptions: DataTables.Settings = {};
  users: User[];

  constructor(
    private userService: UserService
  ) { }

  ngOnInit(): void {
    const that = this;

    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      serverSide: true,
      processing: true,
      ajax: (dataTablesParameters: any, callback) => {
        this.userService.getDatatablesData(dataTablesParameters).subscribe(resp => {
          that.users = resp.data;

          callback({
            recordsTotal: resp.recordsTotal,
            recordsFiltered: resp.recordsFiltered,
            data: []
          });
        });
      },
      columns: [{ data: 'id' }, { data: 'name' }, { data: 'lastname' }]
    };
  }
}