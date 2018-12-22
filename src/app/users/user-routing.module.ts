import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { UsersComponent } from './users.component';
import { CreateUserComponent } from './create-user/create-user.component';

const routes: Routes = [
  { path: 'users', component: UsersComponent },
  { path: 'user/create', component: CreateUserComponent },
];


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [ RouterModule ],
  declarations: []
})
export class UserRoutingModule { }
