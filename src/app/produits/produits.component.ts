import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages';
import { ProduitsService } from 'app/services/produits.service';
import { CategoryService } from 'app/services/category.service';
import { Product } from 'app/models/products';
import { MarqueService } from 'app/services/marque.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
declare var jQuery: any;

@Component({
  selector: 'app-produits',
  templateUrl: './produits.component.html',
  styleUrls: ['./produits.component.scss']
})
export class ProduitsComponent implements OnInit {
  dtOptions: any;
  products: any;
  titre = 'Liste des Produits';
  description;
  cost;
  name;
  picturePath;
  productId;
  columnsName;
  categories;
  categoryId;
  categoryUpdateName;
  categoryName;
  pourcentage;
  marqueId;
  inPromo = {selected : false};
  marques;
  disabled;
  marqueName;
  path;
  inPromotion;

  registerForm: FormGroup;
  submitted = false;
  constructor(
    private productService: ProduitsService,
    private categoryService: CategoryService,
    private _flashMessagesService: FlashMessagesService,
    private marqueService: MarqueService
    ) {}

  fetchData() {
    this.categoryService.getCategories().subscribe(cat => {
      this.productService.getProducts().subscribe(data => {
        this.marqueService.getMarques().subscribe(marq => {
          this.marques = marq;
          this.categories = cat;
          this.products = data.reverse();
          // Pour extraire le nom de category mais non l'objet
          this.products.forEach(element => {
            if (element.category) {
              element.category = element.category.name;
            }
            if (element.mark) {
              element.mark = element.mark.name;
            }
          });
          if (this.products.length > 0) {
            this.columnsName = Object.keys(this.products[0]);
            // Delete ID column
            this.columnsName.shift();
            this.columnsName.push('Action');
          }
        });
      });
    });
  }

  ngOnInit(): void {
    this.fetchData();
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 2
    };
  }


  deleteProduct(id) {
    this.productService.deleteProduct(id).subscribe(
      data => {
        this._flashMessagesService.show('Produit supprimé!', {
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

  getProduct(id) {

    this.productId = id;
    this.productService.getProduct(id).subscribe(product => {
      this.name = product.name;
      this.cost = product.cost;
      this.categoryUpdateName = product.category.name;
      this.description = product.longDescription;
      this.path = product.path;
      this.marqueName = product.mark.name;
      this.inPromotion = product.inPromotion;
      this.pourcentage = product.promotionPourcentage;
      jQuery('#editModal').modal('show');
    });
  }

  detailsProduct(id) {
    this.productId = id;
    this.productService.getProduct(id).subscribe(product => {
      this.categoryName = product.category.name;
      this.name = product.name;
      this.description = product.longDescription;
      this.cost = product.cost;
      this.picturePath = product.picturePath;
      this.marqueName = product.mark.name;
    });
    // console.log(this.productService.getCategoryName(cat));
    jQuery('#detailsModal').modal('show');
  }

  updateProduct() {
    this.categoryService.getCategory(this.categoryId).subscribe(cat => {
      this.marqueService.getMarque(this.marqueId).subscribe(marq => {
    let promo; let pourc;
    if (this.inPromo.selected) {
      promo = this.inPromo.selected;
      pourc = this.pourcentage;
    } else {
      promo = this.inPromo.selected;
      pourc = 0;
    }
    const UpdatedProduct = {
      name: this.name,
      cost: this.cost,
      inPromotion: promo,
      promotionPourcentage: pourc,
      category: cat,
      longDescription: this.description,
      picturePath: this.path,
      mark: marq
    };
    this.productService
      .updateProduct(UpdatedProduct, this.productId)
      .subscribe(data => {
        jQuery('#editModal').modal('hide');
        this.fetchData();
        this._flashMessagesService.show('Produit Updated!', {
          cssClass: 'alert-success',
          timeout: 2500
        });
      });
    });
  });
  }

  onFileSelected(event) {
    this.path = event.target.files[0].name;
  }

  addProduct() {
    this.categoryService.getCategory(this.categoryId).subscribe(cat => {
       this.marqueService.getMarque(this.marqueId).subscribe(marq => {
        // tslint:disable-next-line:prefer-const
        let promo; let pourc;
        if (this.inPromo.selected) {
          promo = this.inPromo.selected;
          pourc = this.pourcentage;
        } else {
          promo = this.inPromo.selected;
          pourc = 0;
        }
        const product = {
          name: this.name,
          cost: this.cost,
          inPromotion: promo,
          promotionPourcentage: pourc,
          category: cat,
          longDescription: this.description,
          picturePath: this.path,
          mark: marq
        };
        this.productService.postProduct(product).subscribe(data => {
          if (data.msg === 'existe') {
            this._flashMessagesService.show('Produit existe déja!', {
              cssClass: 'alert-danger',
              timeout: 2500
            });
          } else {
            this._flashMessagesService.show('Produit créé!', {
              cssClass: 'alert-success',
              timeout: 2500
            });
            this.name = ''; this.cost = ''; promo = false; this.description = ''; this.path = '';
          }
          jQuery('#exampleModal').modal('hide');
          this.fetchData();
        });
      });
    });
  }
}
