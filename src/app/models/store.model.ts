import {User} from './user.mode';
import {Product} from './product.model';


export class Store {

  id: number;

  title: string;

  category: string;

  description: string;

  avgRating: number;

  owner: User;

  products: Product[];

  creationDate: Date;
}
