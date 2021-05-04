import { Component, OnInit } from '@angular/core';
import {FormService} from '../../../services/form.service';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-latest-post',
  templateUrl: './latest-post.component.html',
  styleUrls: ['./latest-post.component.css']
})
export class LatestPostComponent implements OnInit {

  latestPub$: Observable<any>;
  constructor(private _formService: FormService) { }

  ngOnInit(): void {
    this.latestPub$ = this._formService.getLatestPub();
  }

}
