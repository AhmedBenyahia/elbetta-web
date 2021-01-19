import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';
import {FormControl, FormGroup} from '@angular/forms';
import {NgbDate} from '@ng-bootstrap/ng-bootstrap';
import {UtilityFunction} from '../../helpers/UtilityFunction';
import {User} from '../../models/user.mode';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  // Form att
  profileForm: FormGroup;
  username: FormControl;
  password: FormControl;
  firstname: FormControl;
  phone: FormControl;
  lastname: FormControl;
  email: FormControl;
  birthday: FormControl;
  address: FormControl;
  city: FormControl;
  country: FormControl;
  postalCode: FormControl;

  // User Details
  user: User;

  // Date att
  date: NgbDate;
  focusDate: boolean;

  constructor(private authService: AuthService, private router: Router) {
    this.user = new User();
  }

  ngOnInit() {
    this.getUser();
    this.createFormControls();
    this.createForm();
  }

  async getUser() {
    this.user = await UtilityFunction.getLoggedUserInfo(this.authService, this.router);
    this.user.mainAddress = this.user?.address[0];
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
    this.address = new FormControl();
    this.city = new FormControl();
    this.country = new FormControl();
    this.postalCode = new FormControl();
  }

  /** create form validators */
  createForm() {
    this.profileForm = new FormGroup({
      username: this.username,
      password: this.password,
      firstname: this.firstname,
      phone: this.firstname,
      lastname: this.lastname,
      email: this.email,
      birthday: this.birthday,
      address: this.address,
      city: this.city,
      country: this.country,
      postalCode: this.postalCode,
    });
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

  updateProfile() {

  }
}
