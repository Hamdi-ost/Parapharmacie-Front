import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { DashboardHomeComponent } from './dashboard-home/dashboard-home.component';

const routes: Routes = [
  {
    path: '', component: DashboardComponent,
    children: [
      { path: 'produits', loadChildren: '../produits/produit.module#ProduitModule' },
      { path: 'categories', loadChildren: '../categories/categories.module#CategoriesModule' },
      { path: 'interfaces', loadChildren: '../interfaces/interfaces.module#InterfacesModule' },
      { path: 'users', loadChildren: '../users/user.module#UserModule' },

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
