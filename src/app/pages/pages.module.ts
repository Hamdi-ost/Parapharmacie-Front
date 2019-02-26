import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotFoundComponent } from './not-found/not-found.component';
import { AuthComponent } from './auth/auth.component';
import { PagesRoutingModule } from './pages-routing.module';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

const routes: Routes = [
  { path: '', component: AuthComponent }
];

@NgModule({
  imports: [
    CommonModule,
    PagesRoutingModule,
    RouterModule.forChild(routes),
    FormsModule
  ],
  declarations: [NotFoundComponent, AuthComponent]
})
export class PagesModule { }
