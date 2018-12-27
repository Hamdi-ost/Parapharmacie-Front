import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages';
import { ProduitsService } from 'app/services/produits.service';
import { CategoryService } from 'app/services/category.service';
declare var jQuery: any;

@Component({
  selector: 'app-produits',
  templateUrl: './produits.component.html',
  styleUrls: ['./produits.component.scss']
})
export class ProduitsComponent implements OnInit {
  dtOptions: any;
  products;
  titre = 'Liste des Produits';
  description;
  cost;
  name;
  picturePath;
  productId;
  columnsName;
  categories;
  categoryId;
  categoryName;

  constructor(
    private productService: ProduitsService,
    private categoryService: CategoryService,
    private _flashMessagesService: FlashMessagesService
  ) {}

  fetchData() {
    this.categoryService.getCategories().subscribe(cat => {
    this.productService.getProducts().subscribe(data => {
      this.categories = cat;
      this.products = data.reverse();
      this.columnsName = Object.keys(this.products[0]);
      this.columnsName.pop();
      this.columnsName.push('Action');
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
    this.productService.getProduct(id).subscribe(Product => {
      this.name = Product.name;
      this.description = Product.description;
      this.cost = Product.cost;
      jQuery('#editModal').modal('show');
    });
  }

  detailsProduct(id) {
    this.productId = id;
    let cat;
    this.productService.getProduct(id).subscribe(Product => {
      cat = Product.category;
      this.name = Product.name;
      this.description = Product.description;
      this.cost = Product.cost;
      this.picturePath = Product.picturePath;
      });
      console.log(this.productService.getCategoryName(cat));
      jQuery('#detailsModal').modal('show');
  }

  updateProduct() {
    const UpdatedProduct = {
      name: this.name,
      cost: this.cost,
      category: this.categoryId,
      description: this.description,
      picturePath: '/path'
    };
    this.productService
      .updateProduct(UpdatedProduct, this.productId)
      .subscribe(data => {
        console.log(data);
        jQuery('#editModal').modal('hide');
        this.fetchData();
        this._flashMessagesService.show('Produit Updated!', {
          cssClass: 'alert-success',
          timeout: 2500
        });
      });
  }

  addProduct() {
    const Product = {
      name: this.name,
      cost: this.cost,
      category: this.categoryId,
      description: this.description,
      picturePath: '/path'
    };
    console.log(Product);
    this.productService.postProduct(Product).subscribe(data => {
      console.log(data);
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
      }
      jQuery('#exampleModal').modal('hide');
      this.fetchData();
  });
  }
}
