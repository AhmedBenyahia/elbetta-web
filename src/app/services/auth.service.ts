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

  private _user;

  get user() {
    return this._user;
  }

  set user(value) {
    this._user = value;
  }

  constructor(private http: HttpClient) {
  }

  login(username, password): Observable<any> {
    const headers = new HttpHeaders({Authorization: 'Basic ' + btoa(username + ':' + password)});
    localStorage.setItem('auth_header', 'Basic ' + btoa(username + ':' + password));
    return this.http.get(environment.elbetaApiUrl + `/auth/login`, {headers}).pipe(map(user => {
      this._user = user;
      return user;
    }));
  }

  async refreshUserInfo() {
    const headers = new HttpHeaders({Authorization: localStorage.getItem('auth_header')});
    if (headers) {
      this._user = await this.http.get<User>(environment.elbetaApiUrl + `/auth/login`, {headers}).toPromise();
    } else {
      throw throwError('Invalid login Information, Please login !!');
    }
  }

  logout(): Observable<any> {
    localStorage.clear();
    return this.http.get(environment.elbetaApiUrl + `/logout`);
  }

  createUserAccount(user): Observable<any> {
    const headers = new HttpHeaders({Authorization: localStorage.getItem('auth_header')});
    return this.http.post(environment.elbetaApiUrl + `/api/user/create`, user, {headers});
  }

}
