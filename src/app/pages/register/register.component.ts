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
  login: FormControl;
  password: FormControl;
  firstname: FormControl;
  tel: FormControl;
  lastname: FormControl;
  mail: FormControl;
  birthday: FormControl;

  // User Details
  user: { login, password, mail, firstname, lastname, tel, birthday? };

  // Date att
  date: NgbDate;
  focusDate: boolean;

  constructor(private authService: AuthService) {
    this.user = {login: null, password: null, mail: null, firstname: null, lastname: null, tel: null};
  }

  ngOnInit() {
    this.createFormControls();
    this.createForm();
  }

  /** create form controle */
  createFormControls() {
    this.login = new FormControl();
    this.password = new FormControl();
    this.tel = new FormControl();
    this.firstname = new FormControl();
    this.lastname = new FormControl();
    this.mail = new FormControl();
    this.birthday = new FormControl();
  }

  /** create form validators */
  createForm() {
    this.signingForm = new FormGroup({
      username: this.login,
      password: this.password,
      firstname: this.firstname,
      phone: this.firstname,
      lastname: this.lastname,
      mail: this.mail,
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
    this.user.birthday = new Date(date.year, date.month, date.day);
  }

  mama($event: Event) {
    //
  }
}
