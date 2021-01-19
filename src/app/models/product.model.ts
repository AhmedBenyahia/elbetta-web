import {Store} from './store.model';


export class Product {

  id: number;

  title: string;

  description: string;

  model: string;

  specification: string;

  category: string;

  createdBy: string;

  creationDate: Date;

  price: number;

  currentStock: number;

  /** The total sum of supplies for a specific product */
  totalStock: number;

  store: Store;

  status: string;
}
