import {Injectable} from '@angular/core';


// Declare SockJS and Stomp
declare var SockJS;
declare var Stomp;

@Injectable({
  providedIn: 'root'
})

export class MessageService {

  constructor() {
    this.initializeWebSocketConnection();
  }

  public stompClient;
  public msg = [];

  initializeWebSocketConnection() {
    const serverUrl = 'http://localhost:8081/api/socket';
    const ws = new SockJS(serverUrl);
    this.stompClient = Stomp.over(ws);
    const that = this;
    // tslint:disable-next-line:only-arrow-functions
    this.stompClient.connect({}, function(frame) {
      that.stompClient.subscribe('/message.1', (message) => {
        console.log('Got a msg');
        if (message.body) {
          that.msg.push(message.body);
        }
      });
    });
  }

  sendMessage(message) {
    const msgModel = {
      text: message,
      username: 'test',
      avatar: 'test'
    };
    this.stompClient.send('/app/send/message.1', {}, JSON.stringify(msgModel));
  }
}
