import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages';
import { CategoryService } from 'app/services/category.service';
import { ProduitsService } from 'app/services/produits.service';
declare var jQuery: any;

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {

  dtOptions: any;
  categories;
  titre = 'Liste des Categories';
  description;
  name;
  products;
  categoryId;
  columnsName;

  constructor(
    private categoryService: CategoryService,
    private _flashMessagesService: FlashMessagesService,
    private productService: ProduitsService
  ) {}

  fetchData() {
    this.categoryService.getCategories().subscribe(data => {
      this.categories = data.reverse();
      this.columnsName = Object.keys(this.categories[0]);
      this.columnsName.pop();
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

  deleteCategory(id) {
    this.categoryService.deleteCategory(id).subscribe(
      data => {
        this._flashMessagesService.show('Category supprimé!', {
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

  getCategory(id) {
    this.categoryId = id;
    this.categoryService.getCategory(id).subscribe(Category => {
      this.name = Category.name;
      this.description = Category.description;
      jQuery('#editModal').modal('show');
    });
  }

  detailsCategory(id) {
    this.categoryId = id;
    this.productService.getProducts().subscribe(prod => {
    this.categoryService.getCategory(id).subscribe(Category => {
      this.products = prod;
      this.name = Category.name;
      this.description = Category.description;
      jQuery('#detailsModal').modal('show');
    });
  });
  }

  updateCategory() {
    const UpdatedCategory = {
      name: this.name,
      description: this.description,
    };
    this.categoryService
      .updateCategory(UpdatedCategory, this.categoryId)
      .subscribe(data => {
        console.log(data);
        jQuery('#editModal').modal('hide');
        this.fetchData();
        this._flashMessagesService.show('Category Updated!', {
          cssClass: 'alert-success',
          timeout: 2500
        });
      });
  }

  addCategory() {
    const Category = {
      name: this.name,
      description: this.description,
    };
    this.categoryService.postCategory(Category).subscribe(data => {
      console.log(data);
      if (data.msg === 'existe') {
        this._flashMessagesService.show('Category existe déja!', {
          cssClass: 'alert-danger',
          timeout: 2500
        });
      } else {
        this._flashMessagesService.show('Category créé!', {
          cssClass: 'alert-success',
          timeout: 2500
        });
      }
      jQuery('#exampleModal').modal('hide');
      this.fetchData();
    });
  }

}
