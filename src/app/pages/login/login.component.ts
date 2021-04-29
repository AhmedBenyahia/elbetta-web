import {Component, OnInit, OnDestroy} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';

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

  constructor(private authService: AuthService,
              private router: Router) {
    this.user = {username: null, password: null};
  }

  ngOnInit() {

    if (this.authService.user) {
      this.router.navigate(['/form']);
    }

    this.createFormControls();
    this.createForm();
  }

  ngOnDestroy() {
  }

  login() {
    this.authService.login(this.user.username, this.user.password).subscribe(value => {
      console.log('User Auth Succeed');
      this.router.navigate(['/form']);
    });
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
