import {Component, OnInit} from '@angular/core';
import {MessageService} from '../../../services/message.service';
import {AuthService} from '../../../services/auth.service';
import {User} from '../../../models/user.mode';
import {FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-messaging',
  templateUrl: './messaging.component.html',
  styleUrls: ['./messaging.component.css']
})
export class MessagingComponent implements OnInit {
  input;
  users: User[];
  selectedUser = new User();
  searchForm: FormGroup;
  usersFiltered = [];
  selectedUserMsg: { text, user, destination }[];

  constructor(public messageService: MessageService, public auth: AuthService) {
    this.searchForm = new FormGroup({
      search: new FormControl()
    });
  }

  sendMessage() {
    if (this.input) {
      this.messageService.sendMessage(this.input, this.auth.user, this.selectedUser.id);
      this.input = '';
    }
  }

  async ngOnInit() {
    this.users = await this.messageService.getAllUsers().toPromise();
    this.usersFiltered = this.users;
    this.selectedUser = this.users[0];
    this.usersFiltered = this.users.filter(c => c.login !== this.auth.user.login);
  }

  selectUserChat(user: User) {
    this.selectedUser = user;
    this.selectedUserMsg = this.messageService.msg.filter(c => c.user.id === user.id);
    this.messageService.msg = [];
  }

  filterUser(value) {
    this.usersFiltered = this.users.filter(c => c?.login?.includes(value) && c.id !== this.auth.user.id);
  }
}
