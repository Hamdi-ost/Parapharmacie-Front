import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages';
import { ProduitsService } from 'app/services/produits.service';
import { MarqueService } from 'app/services/marque.service';
declare var jQuery: any;

@Component({
  selector: 'app-marques',
  templateUrl: './marques.component.html',
  styleUrls: ['./marques.component.scss']
})
export class MarquesComponent implements OnInit {

  dtOptions: any;
  marques;
  titre = 'Liste des marques';
  description;
  name;
  products;
  MarqueId;
  columnsName;

  constructor(
    // tslint:disable-next-line:no-shadowed-variable
    private marqueService: MarqueService,
    private _flashMessagesService: FlashMessagesService,
    private productService: ProduitsService
  ) {}

  fetchData() {
    this.marqueService.getMarques().subscribe(data => {
      console.log(data);
      this.marques = data.reverse();
      this.columnsName = Object.keys(this.marques[0]);
      this.columnsName.push('Action');
    });
  }

  ngOnInit(): void {
    this.fetchData();
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 2
    };
  }

  deleteMarque(id) {
    this.marqueService.deleteMarque(id).subscribe(
      data => {
        this._flashMessagesService.show('Marque supprimé!', {
          cssClass: 'alert-success',
          timeout: 2500
        });
      },
      () => {},
      () => {
        this.fetchData();
      }
    );
  }

  getMarque(id) {
    this.MarqueId = id;
    this.marqueService.getMarque(id).subscribe(Marque => {
      this.name = Marque.name;
      this.description = Marque.description;
      jQuery('#editModal').modal('show');
    });
  }

  detailsMarque(id) {
    this.MarqueId = id;
    this.productService.getProducts().subscribe(prod => {
    this.marqueService.getMarque(id).subscribe(Marque => {
      this.products = this.productList(prod, Marque);
      this.name = Marque.name;
      this.description = Marque.description;
      jQuery('#detailsModal').modal('show');
    });
  });
  }

  productList(prod, cat) {
    const listProd = [];
    prod.forEach(element => {
      if (element.Marque) {
        if (element.Marque.name === cat.name) {
          listProd.push(element.name);
        }
      }
    });
    return listProd;
  }

  updateMarque() {
    const UpdatedMarque = {
      name: this.name,
      description: this.description,
    };
    this.marqueService
      .updateMarque(UpdatedMarque, this.MarqueId)
      .subscribe(data => {
        console.log(data);
        jQuery('#editModal').modal('hide');
        this.fetchData();
        this._flashMessagesService.show('Marque Updated!', {
          cssClass: 'alert-success',
          timeout: 2500
        });
      });
  }

  addMarque() {
    const Marque = {
      name: this.name,
      description: this.description,
    };
    this.marqueService.postMarque(Marque).subscribe(data => {
      console.log(data);
      if (data.msg === 'existe') {
        this._flashMessagesService.show('Marque existe déja!', {
          cssClass: 'alert-danger',
          timeout: 2500
        });
      } else {
        this._flashMessagesService.show('Marque créé!', {
          cssClass: 'alert-success',
          timeout: 2500
        });
      }
      jQuery('#exampleModal').modal('hide');
      this.fetchData();
    });
  }

}
