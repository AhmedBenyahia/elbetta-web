import { Component } from '@angular/core';
import {AuthService} from './services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(private  auth: AuthService, private router: Router) {
    if (!auth.user.id) {
      this.initUser();
    }
  }

  private async initUser() {
    await this.auth.refreshUserInfo();
    if (!this.auth.user.id) {
      this.router.navigate(['/login']);
    }
  }
}
