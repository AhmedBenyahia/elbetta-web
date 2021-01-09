import {Component, OnInit, OnDestroy} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  // Form att
  loginForm: FormGroup;
  username: FormControl;
  password: FormControl;

  // User Details
  user: { username, password };

  constructor(private authService: AuthService) {
    this.user = {username: null, password: null};
  }

  ngOnInit() {

    this.createFormControls();
    this.createForm();
  }

  ngOnDestroy() {
  }

  async login() {
    await this.authService.login(this.user.username, this.user.password).toPromise();
    console.log('User Auth Succeed');
  }

  /** create form controle */
  createFormControls() {
    this.username = new FormControl();
    this.password = new FormControl();
  }

  /** create form validators */
  createForm() {
    this.loginForm = new FormGroup({
      username: this.username,
      password: this.password,
    });
  }
}
