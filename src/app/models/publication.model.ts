import {User} from './user.mode';
import {RatePub} from './ratePub';
import DateTimeFormat = Intl.DateTimeFormat;
import {CategoriePublication} from './categoriePublication.model';


export class PublicationModel {
  id: number;
  title: string;
  content: string;
  picture: string;
  datePublication: Date;
  score: number;
  ratingPub: Map<number, RatePub>;
  user: User;
  comments: Set<Comment>;
  categoriePublications: CategoriePublication;

  constructor() {
    this.categoriePublications = new CategoriePublication();
  }

}
