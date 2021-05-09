import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../../../services/auth.service';
import {FormService} from '../../../services/form.service';
import {PublicationModel} from '../../../models/publication.model';
import {User} from '../../../models/user.mode';
import {Observable} from 'rxjs';


@Component({
  selector: 'app-activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.css']
})
export class ActivityComponent implements OnInit {
user: User;
publications$: Observable<PublicationModel[]>;
  constructor(private router: Router,
              private authService: AuthService,
              private formService: FormService) { }

    ngOnInit(): void{
    this.user = this.authService.user;
    if (!this.user) {
         this.authService.refreshUserInfo();
         this.user = this.authService.user;
      }
    this.publications$ = this.formService.getPubByUser(this.user.id);
    }

  openPost() {
    this.router.navigate(['/post-content']);
  }
}
