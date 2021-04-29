import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {PostComponent} from './post/post.component';
import {SuggestionsComponent} from './suggestions/suggestions.component';
import {HomeComponent} from './home/home.component';
import {PostsListComponent} from './posts-list/posts-list.component';

const routes: Routes = [
  { path: 'form',          component: HomeComponent },
  { path: 'post-content',          component: PostComponent },
  { path: 'suggestion',          component: SuggestionsComponent },
  { path: 'posts',          component: PostsListComponent },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FormRoutingModule { }
