import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CatalogComponent} from '../../components/catalog/catalog.component';
import {ProductCatalogComponent} from './product-catalog/product-catalog.component';

const routes: Routes = [
  { path: 'catalog',      component: CatalogComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductCatalogRoutingModule { }
