import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages';
import { ProduitsService } from 'app/services/produits.service';
import { MarqueService } from 'app/services/marque.service';
import { ConfirmationDialogService } from 'app/confirmation-dialoge/confirmation-dialog.service';
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
    private productService: ProduitsService,
    private confirmationDialogService: ConfirmationDialogService
  ) {}

  fetchData() {
    this.marqueService.getMarques().subscribe(data => {
      this.marques = data.reverse();
      this.columnsName = Object.keys(this.marques[0]);
      this.columnsName.shift();
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
    this.confirmationDialogService
    .confirm('Confirmer s\'il vous plait..', ' Vous etes sur de supprimer cette marque?')
    .then(confirmed => {
      console.log('User confirmed:', confirmed);
      if (confirmed) {
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
    })
    .catch(() =>
      console.log(
        'User dismissed the dialog (e.g., by using ESC, clicking the cross icon, or clicking outside the dialog)'
      )
    );
  }

  getMarque(id) {
    this.MarqueId = id;
    this.marqueService.getMarque(id).subscribe(Marque => {
      this.name = Marque.name;
      // this.description = Marque.description;
      jQuery('#editModal').modal('show');
    });
  }

  detailsMarque(id) {
    this.MarqueId = id;
    this.productService.getProducts().subscribe(prod => {
    this.marqueService.getMarque(id).subscribe(Marque => {
      this.products = this.productList(prod, Marque);
      this.name = Marque.name;
      // this.description = Marque.description;
      jQuery('#detailsModal').modal('show');
    });
  });
  }

  productList(prod, cat) {
    const listProd = [];
    prod.forEach(element => {
      if (element.mark) {
        if (element.mark.name === cat.name) {
          listProd.push(element.name);
        }
      }
    });

    return listProd;
  }

  updateMarque() {
    const UpdatedMarque = {
      name: this.name
      // description: this.description,
    };
    this.marqueService
      .updateMarque(UpdatedMarque, this.MarqueId)
      .subscribe(data => {
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
      name: this.name
      // description: this.description
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
        this.name = '';
      }
      jQuery('#exampleModal').modal('hide');
      this.fetchData();
    });
  }

}
