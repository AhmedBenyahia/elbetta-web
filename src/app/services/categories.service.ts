import { Injectable } from '@angular/core';
import {HttpClient, HttpEvent, HttpHeaders, HttpRequest} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor(private http: HttpClient) { }

  getCategories() {
    const headers = new HttpHeaders({Authorization: localStorage.getItem('auth_header')});
    return this.http.get(environment.apiUrl + '/api/categoriepublication', {headers});
  }
}
