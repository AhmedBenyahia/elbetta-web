import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormRoutingModule } from './form-routing.module';
import { FormComponent } from './form.component';
import { LatestPostComponent } from './latest-post/latest-post.component';
import { SuggestionsComponent } from './suggestions/suggestions.component';
import { PostComponent } from './post/post.component';
import { CategoriesComponent } from './categories/categories.component';
import {SharedModule} from '../../shared/shared.module';
import { PostsListComponent } from './posts-list/posts-list.component';
import {NgbDropdownModule} from '@ng-bootstrap/ng-bootstrap';
import { HomeComponent } from './home/home.component';


@NgModule({
  declarations: [FormComponent, LatestPostComponent, SuggestionsComponent, PostComponent, CategoriesComponent, PostsListComponent, HomeComponent],
  imports: [
    CommonModule,
    FormRoutingModule,
    SharedModule,
    NgbDropdownModule
  ]
})
export class FormModule { }
