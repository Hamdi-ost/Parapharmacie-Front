import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {
  dtOptions;
  data;
  constructor() { }

  ngOnInit() {
    this.dtOptions = {
      data: this.data,
      columns: [
        { title: 'Name' },
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
