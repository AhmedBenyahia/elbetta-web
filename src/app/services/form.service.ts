import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {PublicationModel} from '../models/publication.model';
import {CommentModel} from '../models/comment';
import {RateCom} from '../models/rateCom';

@Injectable({
  providedIn: 'root'
})
export class FormService {

  constructor(private http: HttpClient) {}

  getSuggestions(id: number) {
    const headers = new HttpHeaders({Authorization: localStorage.getItem('auth_header')});
    return this.http.get(environment.apiUrl + '/api/publication/suggestion/' + id, {headers});
  }

  getLatestPub() {
    const headers = new HttpHeaders({Authorization: localStorage.getItem('auth_header')});
    return this.http.get(environment.apiUrl + '/api/publication/new/', {headers});
  }
  getPubByCategorie(id: number){
    const headers = new HttpHeaders({Authorization: localStorage.getItem('auth_header')});
    return this.http.get(environment.apiUrl + '/api/publication/getPubBYCategorie/' + id, {headers});
  }
  getPubById(id: number){
    const headers = new HttpHeaders({Authorization: localStorage.getItem('auth_header')});
    return this.http.get<PublicationModel>(environment.apiUrl + '/api/publication/getPubById/' + id, {headers});
  }
  getCommentByPub(id: number){
    const headers = new HttpHeaders({Authorization: localStorage.getItem('auth_header')});
    return this.http.get<CommentModel[]>(environment.apiUrl + '/api/comment/getbyPostId/' + id, {headers});
  }
  addComment(comm: CommentModel){
    const headers = new HttpHeaders({Authorization: localStorage.getItem('auth_header')});
    return this.http.post<CommentModel>(environment.apiUrl + '/api/comment/create/', comm, {headers});
  }

  rateComment(comment: CommentModel, rate: string) {
    const headers = new HttpHeaders({Authorization: localStorage.getItem('auth_header')});
    return this.http.get<CommentModel>(
      `${environment.apiUrl}/api/comment/rate/${comment.id}/${comment.user.id}/${rate}`, {headers});
  }
}
