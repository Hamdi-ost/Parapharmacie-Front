import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './not-found/not-found.component';
import { AuthComponent } from './auth/auth.component';
import { BeforeLoginService } from 'app/services/before-login.service';
import { AfterLoginService } from 'app/services/after-login.service';


const routes: Routes = [
  { path: 'notfound', component: NotFoundComponent },
  { path: 'auth', component: AuthComponent },
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
export class PagesRoutingModule { }
