import { Component, OnInit } from '@angular/core';
import { Routes } from '@angular/router';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})



export class UsersComponent implements OnInit {
  dtOptions;
  data = [
    ['Hamdi', 'hamdi@yahoo.fr', 'admin']
  ];

  constructor() { }

  ngOnInit() {
    this.dtOptions = {
      data: this.data,
      columns: [
        { title: 'Nom' },
        { title: 'Email' },
        { title: 'Role' },
        {
          title: 'action', render: (data: any, type: any, full: any) => {
            // tslint:disable-next-line:max-line-length
            return '<button class="btn  btn-just-icon btn-round btn-light"><i class="material-icons">details</i></button><button class="btn  btn-just-icon btn-round btn-light"><i class="material-icons">edit</i></button><button class="btn  btn-just-icon btn-round btn-light"><i class="material-icons">delete</i></button>';
          }
        }
      ]
    };
  }

}
