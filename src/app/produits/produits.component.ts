import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-produits',
  templateUrl: './produits.component.html',
  styleUrls: ['./produits.component.scss']
})
export class ProduitsComponent implements OnInit {
  dtOptions;
  data = [
    ['Tiger Nixon', 'System Architect', 'Edinburgh', '5421', '2011/04/25', '$320,800']
  ];

  constructor() { }

  ngOnInit() {
    this.dtOptions = {
      data: this.data,
      columns: [
        { title: 'Nom' },
        { title: 'Categorie' },
        { title: 'En promotion' },
        { title: 'Disponible' },
        { title: 'Quantité' },
        { title: 'Prix' },
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
