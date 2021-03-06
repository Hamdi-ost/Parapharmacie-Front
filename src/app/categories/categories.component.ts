import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages';
import { CategoryService } from 'app/services/category.service';
import { ProduitsService } from 'app/services/produits.service';
import { ConfirmationDialogService } from 'app/confirmation-dialoge/confirmation-dialog.service';
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
    private productService: ProduitsService,
    private confirmationDialogService: ConfirmationDialogService
  ) {}

  fetchData() {
    this.categoryService.getCategories().subscribe(data => {
      this.categories = data.reverse();
      this.columnsName = Object.keys(this.categories[0]);
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
    this.confirmationDialogService
    .confirm('Confirmer s\'il vous plait..', ' Vous etes sur de supprimer cette categorie ?')
    .then(confirmed => {
      console.log('User confirmed:', confirmed);
      if (confirmed) {
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
    })
    .catch(() =>
      console.log(
        'User dismissed the dialog (e.g., by using ESC, clicking the cross icon, or clicking outside the dialog)'
      )
    );
  }

  getCategory(id) {
    this.categoryId = id;
    this.categoryService.getCategory(id).subscribe(Category => {
      this.name = Category.name;
      this.description = Category.shortDescription;
      jQuery('#editModal').modal('show');
    });
  }

  detailsCategory(id) {
    this.categoryId = id;
    this.productService.getProducts().subscribe(prod => {
    this.categoryService.getCategory(id).subscribe(category => {
      this.products = this.productList(prod, category);
      this.name = category.name;
      this.description = category.shortDescription;
      jQuery('#detailsModal').modal('show');
    });
  });
  }

  productList(prod, cat) {
    const listProd = [];
    prod.forEach(element => {
      if (element.category) {
        if (element.category.name === cat.name) {
          listProd.push(element.name);
        }
      }
    });
    return listProd;
  }

  updateCategory() {
    const UpdatedCategory = {
      name: this.name,
      shortDescription: this.description,
    };
    console.log(UpdatedCategory);
    this.categoryService
      .updateCategory(UpdatedCategory, this.categoryId)
      .subscribe(data => {
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
      shortDescription: this.description,
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
        this.name = ''; this.description = '';
      }
      jQuery('#exampleModal').modal('hide');
      this.fetchData();
    });
  }

}
