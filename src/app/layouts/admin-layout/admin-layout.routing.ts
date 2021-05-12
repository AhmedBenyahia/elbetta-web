import { Routes } from '@angular/router';

import { IconsComponent } from '../../pages/icons/icons.component';
import { AddPostComponent } from '../../pages/add-post/add-post.component';

export const AdminLayoutRoutes: Routes = [
    { path: 'add-post',   component: AddPostComponent },
    { path: 'icons',          component: IconsComponent },
];
