import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

declare interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
}

export const ROUTES: RouteInfo[] = [
  // {path: '/dashboard', title: 'Dashboard', icon: 'ni-tv-2 text-primary', class: ''},
  // {path: '/icons', title: 'Icons', icon: 'ni-planet text-blue', class: ''},
  // {path: '/maps', title: 'Maps', icon: 'ni-pin-3 text-orange', class: ''},
  {path: '/add-post', title: 'User profile', icon: 'ni-single-02 text-yellow', class: ''},
  {path: '/store', title: 'My Stores', icon: 'ni-basket text-red', class: ''},
  {path: '/catalog', title: 'Product Catalog', icon: 'ni-basket text-red', class: ''},
  // {path: '/login', title: 'Login', icon: 'ni-key-25 text-info', class: ''},
  // {path: '/register', title: 'Register', icon: 'ni-circle-08 text-pink', class: ''}
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  public menuItems: any[];
  public isCollapsed = true;

  constructor(private router: Router) {
  }

  ngOnInit(): void {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
    this.router.events.subscribe((event) => {
      this.isCollapsed = true;
    });
  }
}
