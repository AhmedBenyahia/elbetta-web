import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {AuthService} from '../../services/auth.service';
import {NgbDate} from '@ng-bootstrap/ng-bootstrap';

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
  firstname: FormControl;
  phone: FormControl;
  lastname: FormControl;
  email: FormControl;
  birthday: FormControl;

  // User Details
  user: { username, password, email, firstname, lastname, telephoneNumber, dateOfBirth? };

  // Date att
  date: NgbDate;
  focusDate: boolean;

  constructor(private authService: AuthService) {
    this.user = {username: null, password: null, email: null, firstname: null, lastname: null, telephoneNumber: null};
  }

  ngOnInit() {
    this.createFormControls();
    this.createForm();
  }

  /** create form controle */
  createFormControls() {
    this.username = new FormControl();
    this.password = new FormControl();
    this.phone = new FormControl();
    this.firstname = new FormControl();
    this.lastname = new FormControl();
    this.email = new FormControl();
    this.birthday = new FormControl();
  }

  /** create form validators */
  createForm() {
    this.signingForm = new FormGroup({
      username: this.username,
      password: this.password,
      firstname: this.firstname,
      phone: this.firstname,
      lastname: this.lastname,
      email: this.email,
      birthday: this.birthday,
    });
  }

  async signing() {
    await this.authService.createUserAccount(this.user).toPromise();
    console.log('User Added Succeed');
  }

  isActive(date: NgbDate) {
    return date.equals(this.date);
  }


  saveDate(date: NgbDate) {
    this.user.dateOfBirth = new Date(date.year, date.month, date.day);
  }

  mama($event: Event) {
    //
  }
}
