import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';


const routes: Routes = [
  {
    path: '', component: DashboardComponent,
    children: [
      { path: 'produits', loadChildren: '../produits/produit.module#ProduitModule',  },
      { path: 'categories', loadChildren: '../categories/categories.module#CategoriesModule' },
      { path: 'marques', loadChildren: '../marques/marques.module#MarquesModule' },
      { path: 'interfaces', loadChildren: '../interfaces/interfaces.module#InterfacesModule' },
      { path: 'users', loadChildren: '../users/user.module#UserModule' },
      { path: 'login', loadChildren: '../pages/pages.module#PagesModule' },
    ] /*, canActivate: [BeforeLoginService] */
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
