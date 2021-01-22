import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Store} from '../models/store.model';
import {Product} from '../models/product.model';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  // Shared variable
  private _userStores;

  constructor(private http: HttpClient) {
  }

  get userStores() {
    return this._userStores;
  }

  set userStores(value) {
    this._userStores = value;
  }

  getUserStores({id}) {
    const headers = new HttpHeaders({Authorization: localStorage.getItem('auth_header')});
    return this.http.get<Store[]>(environment.elbetaApiUrl + `/store/get-my-stores/${id}`, {headers}).pipe(map((stores) => {
      stores.forEach(store => {
        store.products$ = this.getStoreProduct(store);
      });
      return stores;
    }));
  }

  createStore(newStore: Store) {
    const headers = new HttpHeaders({Authorization: localStorage.getItem('auth_header')});
    return this.http.post<Store>(environment.elbetaApiUrl + `/store/create`, newStore, {headers});
  }

  createProduct(newProduct: Product) {
    const headers = new HttpHeaders({Authorization: localStorage.getItem('auth_header')});
    return this.http.post<Product>(environment.elbetaApiUrl + `/product/create`, newProduct, {headers});
  }

  getStoreProduct(store: Store) {
    const headers = new HttpHeaders({Authorization: localStorage.getItem('auth_header')});
    return this.http.get<Product[]>(environment.elbetaApiUrl + `/product/store-product/${store.id}`, {headers});
  }

  deleteProduct(product: Product) {
    const headers = new HttpHeaders({Authorization: localStorage.getItem('auth_header')});
    return this.http.delete<void>(environment.elbetaApiUrl + `/product/delete/${product.id}`, {headers});
  }
}
