import { Component, OnInit } from '@angular/core';
import {FormService} from '../../../services/form.service';
import {AuthService} from '../../../services/auth.service';
import {Router} from '@angular/router';
@Component({
  selector: 'app-suggestions',
  templateUrl: './suggestions.component.html',
  styleUrls: ['./suggestions.component.css']
})
export class SuggestionsComponent implements OnInit {
  // Add type post
  suggestions;
  constructor(private formService: FormService,
              private router: Router,
              private authService: AuthService) { }

  async ngOnInit() {
    let user = this.authService.user;
    if (!user) {
     await this.authService.refreshUserInfo();
     user = this.authService.user;
    }

    this.formService.getSuggestions(user.id).subscribe(value => {
      this.suggestions = value;
    });
  }

  getReadTime(content: string) {
    return Math.floor(content.split(' ').length / 200) + 1;
  }

  goToPost(post) {
    this.router.navigate(['/post-content']);
  }
}
