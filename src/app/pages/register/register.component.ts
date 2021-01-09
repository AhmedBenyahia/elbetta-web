import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {


  // Form att
  signingForm: FormGroup;
  username: FormControl;
  password: FormControl;
  email: FormControl;

  // User Details
  user: { username, password, email };

  constructor(private authService: AuthService) {
    this.user = {username: null, password: null, email: null};
  }

  ngOnInit() {
    this.createFormControls();
    this.createForm();
  }

  /** create form controle */
  createFormControls() {
    this.username = new FormControl();
    this.password = new FormControl();
    this.email = new FormControl();
  }

  /** create form validators */
  createForm() {
    this.signingForm = new FormGroup({
      username: this.username,
      password: this.password,
      email: this.email,
    });
  }

  async signing() {
    await this.authService.createUserAccount(this.user).toPromise();
    console.log('User Added Succeed');
  }

}
