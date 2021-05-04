import {RateCom} from './rateCom';
import {PublicationModel} from './publication.model';
import {User} from './user.mode';

export class CommentModel{
  id: number;
  content: string;
  creationDate: Date;
  score: number;
  ratingCom: Map<number, RateCom>;
  publication: PublicationModel;
  user: User;
  dislike: boolean;

  constructor() {
    // @ts-ignore
    this.ratingCom = {};
    this.user = new User();
  }
}
