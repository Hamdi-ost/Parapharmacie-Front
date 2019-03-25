import { Component, OnInit } from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages';
import { ProduitsService } from 'app/services/produits.service';
import { CategoryService } from 'app/services/category.service';
import { MarqueService } from 'app/services/marque.service';
import { HomeProductsService } from 'app/services/home-products.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-product-home',
  templateUrl: './product-home.component.html',
  styleUrls: ['./product-home.component.scss']
})
export class ProductHomeComponent implements OnInit {
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
  categoryName;
  pourcentage;
  marqueId;
  inPromo = { selected: false };
  marques;
  disabled;
  productSelected = [];

  constructor(
    private productService: ProduitsService,
    private categoryService: CategoryService,
    private _flashMessagesService: FlashMessagesService,
    private marqueService: MarqueService,
    private homeProducts: HomeProductsService,
    private router: Router
  ) {}

  fetchData() {
    this.categoryService.getCategories().subscribe(cat => {
      this.productService.getProducts().subscribe(data => {
        this.marqueService.getMarques().subscribe(marq => {
          this.marques = marq;
          this.categories = cat;
          this.products = data.reverse();
          this.products.forEach(element => {
            if (element.category) {
              element.category = element.category.name;
            }
          });
          this.columnsName = Object.keys(this.products[0]);
          this.columnsName.pop();
          this.columnsName.shift();
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

  getProducts(prod) {
    this.productSelected = [];
    for (let i = 0; i < this.products.length; i++) {
      if (prod[i]) {
        this.productSelected.push(this.products[i].id);
      }
    }
  }

  cleanArray(array) {
    // tslint:disable-next-line:prefer-const
    let i, j, len = array.length, out = [], obj = {};
    for (i = 0; i < len; i++) {
      obj[array[i]] = 0;
    }
    // tslint:disable-next-line:forin
    for (j in obj) {
      out.push(j);
    }
    return out;
  }

  valider() {
    const product = [];
    this.productService.getProducts().subscribe(prod => {
      this.productSelected.forEach(el => {
        const prodToShow = prod.find(ell => {
          return ell.id === Number(el);
        });
        product.push(prodToShow);
      });
       const homeProductElement = {
        'product1' : { 'product': { 'id': product[0].id} },
        'product2' : { 'product': { 'id': product[1].id} },
        'product3' : { 'product': { 'id': product[2].id} }
       };

      console.log(homeProductElement);

         this.homeProducts.postProducts(homeProductElement).subscribe(data => {
           if (data.msg === 'existe') {
             this._flashMessagesService.show('Error!', {
               cssClass: 'alert-danger',
               timeout: 2500
             });
           } else {
             this._flashMessagesService.show('Produits choisi!', {
               cssClass: 'alert-success',
               timeout: 2500
             });
             this.router.navigate(['/produits']);
           }
         });

    });
  }
}
