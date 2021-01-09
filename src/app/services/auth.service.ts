import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) {
  }

  login(username, password): Observable<any> {
    const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(username + ':' + password) });
    localStorage.setItem('auth_header', 'Basic ' + btoa(username + ':' + password));
    return this.http.get(environment.elbetaApiUrl + `/auth/login`, {headers});
  }

  logout(): Observable<any> {
    return this.http.get(environment.elbetaApiUrl + `/logout`);
  }

  createUserAccount({username, email, password}): Observable<any> {
    const headers = new HttpHeaders({ Authorization:  localStorage.getItem('auth_header')});
    return this.http.post(environment.elbetaApiUrl + `/api/user/create`, {username, email, password}, {headers});
  }

}
