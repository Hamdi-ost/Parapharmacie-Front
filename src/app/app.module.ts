import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './/app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DataTablesModule } from 'angular-datatables';
import { ProduitModule } from 'app/produits/produit.module';
import { UserModule } from 'app/users/user.module';
import { HttpClientModule } from '@angular/common/http';
import { Routes } from '@angular/router';

const routes: Routes = [

];

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    DataTablesModule,
    UserModule,
    ProduitModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
