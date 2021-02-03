import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductCatalogRoutingModule } from './product-catalog-routing.module';
import {SharedModule} from '../../shared/shared.module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ProductCatalogRoutingModule,
    SharedModule
  ]
})
export class ProductCatalogModule { }
