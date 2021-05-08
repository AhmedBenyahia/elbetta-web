import { Routes } from '@angular/router';

import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { IconsComponent } from '../../pages/icons/icons.component';
import { MapsComponent } from '../../pages/maps/maps.component';
import { AddPostComponent } from '../../pages/add-post/add-post.component';
import { TablesComponent } from '../../pages/tables/tables.component';
import {StoreComponent} from '../../pages/store/store.component';

export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard',      component: DashboardComponent },
    { path: 'add-post',   component: AddPostComponent },
    { path: 'tables',         component: TablesComponent },
    { path: 'icons',          component: IconsComponent },
    { path: 'maps',           component: MapsComponent },
    { path: 'store',           component: StoreComponent }
];
