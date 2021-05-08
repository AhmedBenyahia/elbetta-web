import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';
import {FormControl, FormGroup} from '@angular/forms';
import {NgbDate} from '@ng-bootstrap/ng-bootstrap';
import {UtilityFunction} from '../../helpers/UtilityFunction';
import {User} from '../../models/user.mode';
import {PublicationModel} from '../../models/publication.model';
import {FormService} from '../../services/form.service';
import {CategoriePublication} from '../../models/categoriePublication.model';
import {CategoriesService} from '../../services/categories.service';
@Component({
  selector: 'app-user-profile',
  templateUrl: './add-post.component.html',
})
export class AddPostComponent implements OnInit {
  Categories$: any;
  // Form att
  pubForm: FormGroup;
  title: FormControl;
  content: FormControl;
  picture: FormControl;
  selectedFile: File;
  // User Details
  user: User;
  pubToCreate = new  PublicationModel();

  // Date att
  date: NgbDate;
  focusDate: boolean;
  userFile ;
  public imagePath;
  imgURL: any;
  public message: string;

  constructor(private authService: AuthService, private router: Router, private formService: FormService ,
              private categorieService: CategoriesService) {
  }

  async ngOnInit() {
    this.getUser();
    this.createFormControls();
    this.createForm();
    this.Categories$ = await this.categorieService.getCategories().toPromise();
  }

  async getUser() {
    this.user = await UtilityFunction.getLoggedUserInfo(this.authService, this.router);
  }

  /** create form controle */
  createFormControls() {
    this.title = new FormControl();
    this.content = new FormControl();
    this.picture = new FormControl();
  }

  /** create form validators */
  createForm() {
    this.pubForm = new FormGroup({
      title: this.title,
      id_categ: new FormControl(),
      content: this.content,
      picture: this.picture,
    });
  }

  isActive(date: NgbDate) {
    return date.equals(this.date);
  }


  // saveDate(date: NgbDate) {
  //   this.pubToCreate.date = new Date(date.year, date.month, date.day);
  // }

  mama($event: Event) {
    //
  }
  async addPost(){
   this.pubToCreate = await this.formService.addPost(this.pubToCreate).toPromise();
  }
  async uploadPicture(id: number) {
    // id = this.pubToCreate.id;
    //  this.pubToCreate.picture.toString() = await this.formService.uploadPicture(id).toPromise();
  }
  async onSelectFile(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.userFile = file;
      // this.f['profile'].setValue(file);

      const mimeType = event.target.files[0].type;
      if (mimeType.match(/image\/*/) == null) {
        this.message = 'Only images are supported.';
        return;
      }

      const reader = new FileReader();

      this.imagePath = file;
      reader.readAsDataURL(file);
      reader.onload = (_event) => {
        this.imgURL = reader.result;
      };
    }
  }

  onSelectCateg(value: any) {
    console.log(value);
  }
}
