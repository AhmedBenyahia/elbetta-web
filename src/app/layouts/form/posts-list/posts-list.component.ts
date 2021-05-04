import { Component, OnInit } from '@angular/core';
import {FormService} from '../../../services/form.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-posts-list',
  templateUrl: './posts-list.component.html',
  styleUrls: ['./posts-list.component.css']
})
export class PostsListComponent implements OnInit {
 publication$;
  constructor(private formService: FormService,
              private router: ActivatedRoute) { }

  ngOnInit(): void {
    this.publication$ = this.formService.getPubByCategorie(this.router.snapshot.params.id);
  }
}
