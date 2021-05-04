import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {FormService} from '../../../services/form.service';
import {PublicationModel} from '../../../models/publication.model';
import {ArrayType} from '@angular/compiler';
import {FormControl, FormGroup} from '@angular/forms';
import {CommentModel} from '../../../models/comment';
import {AuthService} from '../../../services/auth.service';
import {RateCom} from '../../../models/rateCom';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
  post: PublicationModel;
  comm = new CommentModel();
  commentPost: CommentModel[];
  rate;
  rateVide;
  object = Object;
  formAdd: FormGroup;
  content: FormControl;

  constructor(private  router: ActivatedRoute,
              private formService: FormService, private authService: AuthService) {
  }

   ngOnInit() {
    this.initVariable();
    this.createform();
  }

  createform() {
    this.content = new FormControl();
    this.formAdd = new FormGroup({
      content: this.content
    });
  }

  async addComment() {
    this.commentPost.push(await this.formService.addComment(this.comm).toPromise());
    this.formAdd.reset();

  }

  async initVariable() {
    const id = this.router.snapshot.params.id;
    this.post = await this.formService.getPubById(id).toPromise();
    console.log(Math.floor(this.post.score / Object.keys(this.post.ratingPub).length || 1));
    this.rate = [...Array(Math.floor(this.post.score / Object.keys(this.post.ratingPub).length || 1)).keys()];
    this.rateVide = [...Array(5 - this.rate.length).keys()];
    this.commentPost = await this.formService.getCommentByPub(id).toPromise();
    this.comm.publication = new PublicationModel();
    this.comm.publication.id = this.post.id;
    this.comm.user = this.authService.user;
  }

  async like(comment: CommentModel, rate: RateCom) {
    if (comment.dislike) {
      // TODO: API dislike
    } else {
      comment = await this.formService.rateComment(comment, 'LIKE').toPromise();
    }
  }

  getEmoit(comment: CommentModel) {
    const like = 'fas fa-thumbs-up';
    const defaultE = 'far fa-thumbs-up';
    const love = 'fab fa-gratipay';
    comment.dislike = false;
    const userReaction = Object.keys(comment.ratingCom).filter(c => c === this.authService.user.id);
    if (!userReaction.length) { return defaultE; }
    comment.dislike = true;
    switch (comment.ratingCom[userReaction[0]]){
      case 'LOVE': return love; break;
      case 'LIKE': return like; break;
    }
  }
}
