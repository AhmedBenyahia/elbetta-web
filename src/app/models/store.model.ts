import {User} from './user.mode';
import {Product} from './product.model';
import {Observable} from 'rxjs';


export class Store {

  constructor(title?: string) {
    this.title = title;
  }


  id: number;

  title: string;

  category: string;

  description: string;

  avgRating: number;

  owner: User;

  products: Product[];

  // We will only execute a request for the store products list when the  observable is called
  products$: Observable<Product[]>;

  creationDate: Date;
}
