import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotFoundComponent } from './not-found/not-found.component';
import { AuthComponent } from './auth/auth.component';
import { PagesRoutingModule } from './pages-routing.module';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { BeforeLoginService } from 'app/services/before-login.service';
import { AfterLoginService } from 'app/services/after-login.service';

const routes: Routes = [
  { path: '', component: NotFoundComponent}
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
