import {Component, OnInit} from '@angular/core';
import {FormService} from '../../../services/form.service';
import {Router} from '@angular/router';
import {AuthService} from '../../../services/auth.service';
import {CategoriesService} from '../../../services/categories.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {
  categories;

  constructor(private categoriesService: CategoriesService,
              private router: Router,
              private authService: AuthService) {
  }

  ngOnInit() {
    this.categoriesService.getCategories().subscribe(value => {
      this.categories = value;
    });
  }
}
