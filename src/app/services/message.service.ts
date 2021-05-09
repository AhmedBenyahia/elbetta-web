import {Injectable} from '@angular/core';
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
import {AuthService} from './auth.service';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {CommentModel} from '../models/comment';
import {environment} from '../../environments/environment';
import {User} from '../models/user.mode';

// // Declare SockJS and Stomp
// declare var SockJS;
// declare var Stomp;

@Injectable({
  providedIn: 'root'
})

export class MessageService {

  constructor(private authService: AuthService, private http: HttpClient) {
    this.initializeWebSocketConnection();
  }

  public stompClient;
  public msg: {
    date, text, user, destination }[] = [];

  initializeWebSocketConnection() {
    const serverUrl = 'http://localhost:8081/api/socket';
    const ws = new SockJS(serverUrl);
    this.stompClient = Stomp.over(ws);
    const that = this;
    // tslint:disable-next-line:only-arrow-functions
    this.stompClient.connect({}, function(frame) {
      that.stompClient.subscribe('/message', (message) => {
        console.log('Got a msg');
        if (message.body && JSON.parse(message.body).destination === that.authService.user.id) {
          that.msg.push(JSON.parse(message.body));
        }
      });
    });
  }

  sendMessage(message, user, destination) {
    const msgModel = {
      text: message,
      user,
      destination,
      date: new Date()
    };
    this.msg.push(msgModel);
    // this.stompClient.send('/app/hello', {}, JSON.stringify(msgModel));
    this.stompClient.send('/app/send/message', {}, JSON.stringify(msgModel));
    // this.stompClient.send('/app/hello', {}, {name: 'Any Name'});
  }

  getAllUsers() {
    const headers = new HttpHeaders({Authorization: localStorage.getItem('auth_header')});
    return this.http.get<User[]>(environment.apiUrl + '/api/user/', {headers});
  }
}
