import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { UsersComponent } from './users.component';
import { SharedModuleModule } from 'app/shared-module/shared-module.module';
import { CreateUserComponent } from './create-user/create-user.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { DetailsUserComponent } from './details-user/details-user.component';
import { FormsModule } from '@angular/forms';

const routes: Routes = [
  { path: '', component: UsersComponent }
];

@NgModule({
  imports: [
    CommonModule,
    SharedModuleModule,
    RouterModule.forChild(routes),
    FormsModule
  ],
  declarations: [UsersComponent, CreateUserComponent, EditUserComponent, DetailsUserComponent]
})
export class UserModule { }
