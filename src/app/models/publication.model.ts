import {User} from './user.mode';
import {RatePub} from './ratePub';


export class PublicationModel{
id: number;
title: string;
content: string;
picture: string;
datePublication: Date;
score: number;
ratingPub: Map<number, RatePub>;
user: User;
comments: Set<Comment>;

}
