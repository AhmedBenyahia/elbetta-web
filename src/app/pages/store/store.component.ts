import {Component, OnInit} from '@angular/core';
import {StoreService} from '../../services/store.service';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';
import {UtilityFunction} from '../../helpers/UtilityFunction';
import {Store} from '../../models/store.model';
import {Observable, Subject} from 'rxjs';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {FormControl, FormGroup} from '@angular/forms';
import {User} from '../../models/user.mode';
import {first, switchMap} from 'rxjs/operators';
import {Product} from '../../models/product.model';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.css']
})
export class StoreComponent implements OnInit {

  // Models
  user: User;
  newStore: Store;
  newProduct: Product;

  // Observables
  stores$: Observable<Store[]>;

  // Counter
  selectedStoreIndex = 0;

  // Form att
  storeForm: FormGroup;
  productForm: FormGroup;
  title: FormControl;
  category: FormControl;
  description: FormControl;
  avgRating: FormControl;
  model: FormControl;
  specification: FormControl;
  price: FormControl;
  stock: FormControl;

  closeResult$: Subject<any> = new Subject<any>();

  constructor(private _storeService: StoreService,
              private authService: AuthService,
              private modalService: NgbModal,
              private router: Router) {
  }

  /******  Life cycle hook methods  *****/

  async ngOnInit() {
    this.user = await UtilityFunction.getLoggedUserInfo(this.authService, this.router);
    this.getStoresInfo();
  }

  /**** Service Call methods ****/

  getStoresInfo() {
    this.stores$ = this._storeService.getUserStores(this.user);
  }


  createStore() {
    this.stores$ = this._storeService.createStore(this.newStore).pipe(switchMap(() => {
      this.modalService.dismissAll();
      return this._storeService.getUserStores(this.user);
    }));
  }

  createProduct() {
    this.stores$ = this._storeService.createProduct(this.newProduct).pipe(switchMap(() => {
      this.modalService.dismissAll();
      return this._storeService.getUserStores(this.user);
    }));
  }


  /****** Other Stuff ******/

  initStoreForm() {
    this.title = new FormControl();
    this.category = new FormControl();
    this.description = new FormControl();
    this.avgRating = new FormControl();

    this.storeForm = new FormGroup({
      title: this.title,
      category: this.category,
      description: this.description,
      avgRating: this.avgRating,
    });
    this.newStore = new Store();
  }

  initProductForm() {
    this.title = new FormControl();
    this.description = new FormControl();
    this.model = new FormControl();
    this.specification = new FormControl();
    this.category = new FormControl();
    this.price = new FormControl();
    this.stock = new FormControl();

    this.productForm = new FormGroup({
      title: this.title,
      description: this.description,
      model: this.model,
      specification: this.specification,
      category: this.category,
      price: this.price,
      stock: this.stock,
    });
    this.newProduct = new Product();
  }

  openModal(content, type, modalDimension, task, param?: Store | Product | any) {
    switch (task) {
      case 'create-product':
        this.initProductForm();
        this.newProduct.store = param;
        break;
      case 'create-store':
        this.initStoreForm();
        break;
        case 'edit-store':
        this.initStoreForm();
        this.newStore = param;
        break;
      case 'edit-product':
        this.initProductForm();
        this.newProduct = param;
        break;
        case 'delete-product':
        this.newProduct = param;
        this.closeResult$.pipe(first()).subscribe((result: string) => {
          if (result.includes('Delete')) {
            this.deleteProduct(param);
          }
        });
        break;
    }
    if (modalDimension === 'sm' && type === 'modal_mini') {
      this.modalService.open(content, {windowClass: 'modal-mini', size: 'sm', centered: true}).result.then((result) => {
        this.closeResult$.next(`Closed with: ${result}`);
      }, (reason) => {
        this.closeResult$.next(`Dismissed ${UtilityFunction.getDismissReason(reason)}`);
      });
    } else if (modalDimension === '' && type === 'Notification') {
      this.modalService.open(content, {windowClass: 'modal-danger', centered: true}).result.then((result) => {
        this.closeResult$.next(`Closed with: ${result}`);
      }, (reason) => {
        this.closeResult$.next(`Dismissed ${UtilityFunction.getDismissReason(reason)}`);
      });
    } else {
      this.modalService.open(content, {centered: true}).result.then((result) => {
        this.closeResult$.next(`Closed with: ${result}`);
      }, (reason) => {
        this.closeResult$.next(`Dismissed ${UtilityFunction.getDismissReason(reason)}`);
      });
    }
  }

  async deleteProduct(product: Product) {
    await this._storeService.deleteProduct(product).toPromise();
    this.stores$ = this._storeService.getUserStores(this.user);
  }
}
