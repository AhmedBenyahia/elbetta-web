import {AfterViewInit, Component, OnInit} from '@angular/core';
import noUiSlider from 'nouislider';
import {Store} from '../../models/store.model';
import {StoreService} from '../../services/store.service';
import {AuthService} from '../../services/auth.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {Router} from '@angular/router';
import {Observable} from 'rxjs';
import {Product} from '../../models/product.model';
import {tap} from 'rxjs/operators';
import {FormControl, FormGroup} from '@angular/forms';


@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.css']
})
export class CatalogComponent implements OnInit {

  store: Store;
  products$: Observable<Product[]>;
  shoppingCard: Product[];

  filterParams = {
    maxPrice: 0,
    minPrice: 0,
    categories: new Set()
  };
  sliderValue: string;

  // Form att
  filterForm: FormGroup;
  tag: FormControl;

  constructor(private _storeService: StoreService,
              private authService: AuthService,
              private modalService: NgbModal,
              private router: Router) {
  }

  ngOnInit(): void {
    this.store = new Store('Sayto Store');
    this.getStoresProduct();
    this.initFilterForm();
  }

  getStoresProduct() {
    this.products$ = this._storeService.getStoreProducts(this.store).pipe(tap((products) => {
      this.filterParams.maxPrice = Math.max(...products.map(c => c.price));
      this.filterParams.categories = new Set(products.map(c => c.category));
      this.initFilters();
    }));
  }

  filterProducts(products: Product[]) {
    return products.filter(c => c.price >= this.filterParams.minPrice && c.price <= this.filterParams.maxPrice
      && this.filterParams.categories.has(c.category));
  }

  initFilters() {
    const slider = document.getElementById('input-slider-1');

    noUiSlider.create(slider, {
      start: [0, this.filterParams.maxPrice],
      connect: true,
      range: {
        min: 0,
        max: this.filterParams.maxPrice + 1
      }
    });

    // @ts-ignore
    slider.noUiSlider.on('update', (values) => {
      this.sliderValue = values;
    });

    // @ts-ignore
    slider.noUiSlider.on('end', () => {
      this.filterParams.maxPrice = Number(this.sliderValue[1]);
      this.filterParams.minPrice = Number(this.sliderValue[0]);
    });
  }

  removeCategoryFromFilters(category: string) {
    this.filterParams.categories.delete(category);
  }

  initFilterForm() {
    this.tag = new FormControl();
    this.filterForm = new FormGroup({
      tag: this.tag
    });
  }

  addCategory() {
    this.tag.value && this.filterParams.categories.add(this.tag.value);
    this.tag.setValue('');
  }

  toggleAddToShoppingCart(product: Product) {
    !product.clicked && this._storeService.shoppingCart.push(product);
    product.clicked && (this._storeService.shoppingCart = this._storeService.shoppingCart.filter(p => p.id !== product.id));
    product.clicked = !product.clicked ;
  }
}
