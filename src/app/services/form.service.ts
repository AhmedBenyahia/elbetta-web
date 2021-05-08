import {Injectable} from '@angular/core';
import {HttpClient, HttpEvent, HttpHeaders, HttpRequest} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {PublicationModel} from '../models/publication.model';
import {CommentModel} from '../models/comment';
import {RateCom} from '../models/rateCom';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FormService {

  constructor(private http: HttpClient) {
  }

  getSuggestions(id: number) {
    const headers = new HttpHeaders({Authorization: localStorage.getItem('auth_header')});
    return this.http.get(environment.apiUrl + '/api/publication/suggestion/' + id, {headers});
  }

  getLatestPub() {
    const headers = new HttpHeaders({Authorization: localStorage.getItem('auth_header')});
    return this.http.get(environment.apiUrl + '/api/publication/new/', {headers});
  }

  getPubByCategorie(id: number) {
    const headers = new HttpHeaders({Authorization: localStorage.getItem('auth_header')});
    return this.http.get(environment.apiUrl + '/api/publication/getPubBYCategorie/' + id, {headers});
  }

  getPubById(id: number) {
    const headers = new HttpHeaders({Authorization: localStorage.getItem('auth_header')});
    return this.http.get<PublicationModel>(environment.apiUrl + '/api/publication/getPubById/' + id, {headers});
  }

  getCommentByPub(id: number) {
    const headers = new HttpHeaders({Authorization: localStorage.getItem('auth_header')});
    return this.http.get<CommentModel[]>(environment.apiUrl + '/api/comment/getbyPostId/' + id, {headers});
  }

  addComment(comm: CommentModel) {
    const headers = new HttpHeaders({Authorization: localStorage.getItem('auth_header')});
    return this.http.post<CommentModel>(environment.apiUrl + '/api/comment/create/', comm, {headers});
  }

  rateComment(comment: CommentModel, rate: string, userId: number) {
    const headers = new HttpHeaders({Authorization: localStorage.getItem('auth_header')});
    return this.http.get<CommentModel>(
      `${environment.apiUrl}/api/comment/rate/${comment.id}/${userId}/${rate}`, {headers});
  }

  getAllPosts() {
    const headers = new HttpHeaders({Authorization: localStorage.getItem('auth_header')});
    return this.http.get<PublicationModel[]>(environment.apiUrl + '/api/publication/', {headers});
  }

  deleteComment(id: number) {
    const headers = new HttpHeaders({Authorization: localStorage.getItem('auth_header')});
    return this.http.delete<CommentModel>(environment.apiUrl + '/api/comment/delete/' + id, {headers});
  }

  updateComment(comm: CommentModel) {
    const headers = new HttpHeaders({Authorization: localStorage.getItem('auth_header')});
    return this.http.put<CommentModel>(environment.apiUrl + '/api/comment/update/', comm, {headers});
  }

  addPost(newPost: PublicationModel) {
    const headers = new HttpHeaders({Authorization: localStorage.getItem('auth_header')});
    return this.http.post<PublicationModel>(environment.apiUrl + '/api/publication/create/', newPost, {headers});
  }

  deletePost(id: number) {
    const headers = new HttpHeaders({Authorization: localStorage.getItem('auth_header')});
    return this.http.delete<PublicationModel>(environment.apiUrl + '/api/publication/delete/' + id, {headers});
  }

  updatePost(newPost: PublicationModel) {
    const headers = new HttpHeaders({Authorization: localStorage.getItem('auth_header')});
    return this.http.put<PublicationModel>(environment.apiUrl + '/api/publication/update/', newPost, {headers});
  }

  ratePost(idUser: number, idPost: number, ratePub: string) {
    const headers = new HttpHeaders({Authorization: localStorage.getItem('auth_header')});
    return this.http.get<PublicationModel>(
      `${environment.apiUrl}/api/publication/rate/${idPost}/${idUser}/${ratePub}`, {headers});
  }
  getPubByUser(idUser: number) {
    const headers = new HttpHeaders({Authorization: localStorage.getItem('auth_header')});
    return this.http.get<PublicationModel[]>(environment.apiUrl + 'publication/find-user-publication/' + idUser, {headers});
  }
  uploadFile(file: File, idPost: number): Observable<HttpEvent<{}>> {
    const formdata: FormData = new FormData();
    formdata.append('file', file);
    const req = new HttpRequest('POST', 'publication/uploadFiles/' + idPost, formdata, {
      reportProgress: true,
      responseType: 'text'
    });

    return this.http.request(req);
  }
  uploadPicture(idPost: number) {
    const headers = new HttpHeaders({Authorization: localStorage.getItem('auth_header')});
    return this.http.post<PublicationModel>(environment.apiUrl + 'publication/uploadFiles/' + idPost, {headers});
  }
}
