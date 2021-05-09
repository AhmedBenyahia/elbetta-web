import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormService} from '../../../services/form.service';
import {PublicationModel} from '../../../models/publication.model';
import {FormControl, FormGroup} from '@angular/forms';
import {CommentModel} from '../../../models/comment';
import {AuthService} from '../../../services/auth.service';
import {first} from 'rxjs/operators';
import {UtilityFunction} from '../../../helpers/UtilityFunction';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {Subject} from 'rxjs';
import {User} from '../../../models/user.mode';
import {RatePub} from '../../../models/ratePub';

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
  newPost: PublicationModel;
  closeResult$: Subject<any> = new Subject<any>();
  selectedComment: CommentModel;
  editCommentForm: FormGroup;
  user = new User();
  selectedPost: any;
  editPostForm: FormGroup;


  constructor(private  router: ActivatedRoute,
              private modalService: NgbModal,
              private route: Router,
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
    // console.log(Math.floor(this.post.score / Object.keys(this.post.ratingPub).length || 0));
    this.rate = [...Array(Math.floor(this.post.score / Object.keys(this.post.ratingPub).length || 0)).keys()];
    this.rateVide = [...Array(5 - this.rate.length).keys()];
    this.commentPost = await this.formService.getCommentByPub(id).toPromise();
    this.comm.publication = new PublicationModel(this.authService.user);
    this.comm.publication.id = this.post.id;
    this.comm.user = this.authService.user;
    this.newPost = new PublicationModel(this.authService.user);
    this.user = await this.authService.refreshUserInfo();
  }

  async like(comment: CommentModel, rate: string) {
    if (comment.dislike) {
      console.log('dislike');
    } else {
      comment = await this.formService.rateComment(comment, rate, this.authService.user.id).toPromise();
    }
  }

  getEmoit(comment: CommentModel) {
    const like = 'fas fa-thumbs-up';
    const defaultE = 'far fa-thumbs-up';
    const love = 'fab fa-gratipay';
    comment.dislike = false;
    const userReaction = Object.keys(comment.ratingCom).filter(c => c === this.authService.user.id.toString());
    if (!userReaction.length) {
      return defaultE;
    }
    comment.dislike = true;
    switch (comment.ratingCom[userReaction[0]]) {
      case 'LOVE':
        return love;
        break;
      case 'LIKE':
        return like;
        break;
    }
  }

  async deleteComment(id: number) {
    await this.formService.deleteComment(id).toPromise();
  }

  async deletePost(id: number) {
    await this.formService.deletePost(id).toPromise();
  }

  openModal(content, type, modalDimension, task, param?: CommentModel | any) {
    switch (task) {
      case 'edit-comment':
        this.editCommentForm = new FormGroup({
          updateComment: new FormControl()
        });
        this.selectedComment = param;
        break;
      case 'delete-comment':
        this.closeResult$.pipe(first()).subscribe(async (result: string) => {
          if (result.includes('Delete')) {
            await this.formService.deleteComment(param.id).toPromise();
            this.commentPost = this.commentPost.filter(c => c.id !== param.id);
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

  async editComment() {
    this.selectedComment = await this.formService.updateComment(this.selectedComment).toPromise();
    this.modalService.dismissAll();
  }

  async ratePost(i: number) {
    this.post = await this.formService.ratePost(this.user.id, this.post.id, RatePub[i]).toPromise();
    this.rate = [...Array(Math.floor(this.post.score / Object.keys(this.post.ratingPub).length || 0)).keys()];
    this.rateVide = [...Array(5 - this.rate.length).keys()];
  }

  openModalPost(content, type, modalDimension, task, param?: PublicationModel | any) {
    switch (task) {
      case 'edit-post':
        this.editPostForm = new FormGroup({
          updatePostTitle: new FormControl(),
          updatePostContent: new FormControl()
        });
        this.post = param;
        break;
      case 'delete-post':
        this.closeResult$.pipe(first()).subscribe(async (result: string) => {
          if (result.includes('Delete')) {
            await this.formService.deletePost(param.id).toPromise();
            this.route.navigate(['/form']);
            //  this.post = this.post.filter(c => c.id !== param.id);
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

  async editPost() {
    this.post = await this.formService.updatePost(this.post).toPromise();
    this.modalService.dismissAll();
  }
}
