import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {FormService} from '../../../services/form.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
post;
  constructor(private  router: ActivatedRoute,
              private formService: FormService) { }

  async ngOnInit() {
    const id = this.router.snapshot.params.id;
    this.post = await this.formService.getPubById(id).toPromise();
  }

}
