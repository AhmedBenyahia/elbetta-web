import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Observable, throwError} from 'rxjs';
import {map} from 'rxjs/operators';
import {Router} from '@angular/router';
import {User} from '../models/user.mode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _user: User;

  get user() {
    if (!this._user) { this.refreshUserInfo(); }
    return this._user;
  }

  set user(value) {
    this._user = value;
  }

  constructor(private http: HttpClient) {
    this._user = new User();
    this.refreshUserInfo();
  }

  login(username, password): Observable<any> {
    const headers = new HttpHeaders({Authorization: 'Basic ' + btoa(username + ':' + password)});
    localStorage.setItem('auth_header', 'Basic ' + btoa(username + ':' + password));
    return this.http.get<User>(environment.apiUrl + `/api/auth/login`, {headers}).pipe(map(user => {
      this._user = user;
      return user;
    }));
  }

  async refreshUserInfo() {
    const headers = new HttpHeaders({Authorization: localStorage.getItem('auth_header')});
    if (localStorage.getItem('auth_header')) {
      this._user = await this.http.get<User>(environment.apiUrl + `/api/auth/login`, {headers}).toPromise();
    } else {
      // throw throwError('Invalid login Information, Please login !!');
    }
    return this.user;
  }

  logout(): Observable<any> {
    localStorage.clear();
    return this.http.get(environment.apiUrl + `/api/auth/logout`);
  }

  createUserAccount(user): Observable<any> {
    const headers = new HttpHeaders({Authorization: localStorage.getItem('auth_header')});
    return this.http.post(environment.apiUrl + `/api/user/create`, user, {headers});
  }

}
