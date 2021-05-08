import {Store} from './store.model';


export class User {

  id: number;

  username: string;

  firstname: string;

  lastname: string;

  email: string;

  password: string;

  dateOfBirth: Date;

  // Comma separated list of roles
  roles: string;

  active: boolean;

  telephoneNumber: string;

  address: any;

  mainAddress: any;


  infoBanks: any;

  stores: Set<Store>;
  login: any;
}
