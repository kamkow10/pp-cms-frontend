import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {CommentData} from "../../../models/comment-data";
import {UserService} from "../../../services/user/user.service";
import {UsersService} from "../../../services/users/users.service";
import {ArticleService} from "../../../services/article/article.service";
import {Article} from "../../../models/article";
import {MatDialog} from "@angular/material/dialog";
import {DeleteCommentDialogComponent} from "./delete-comment-dialog/delete-comment-dialog.component";
import {ERROR_OK} from "../../../consts/error.const";
import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements OnInit {
  @Input() public comment: CommentData;
  @Input() public showArticleTitle = false;
  @Output() public commentChanged = new EventEmitter<any>();
  public article: Article;
  public isLoggedUserComment: boolean;
  public showMessageServerError = false;
  public isEditModeOn = false;
  public editCommentForm: FormGroup;
  public editModeSubmitted = false;

  constructor(private articleService: ArticleService,
              private userService: UserService,
              private matDialog: MatDialog,
              private fb: FormBuilder) {
  }

  ngOnInit(): void {
    if (this.showArticleTitle) {
      this.articleService.getArticleByCommentId(this.comment.id).subscribe((article) => {
        this.article = article;
      }, () => {});
    }
    this.isLoggedUserComment = this.comment.user.id == this.userService.userData?.id;
  }

  public openDeleteCommentDialog(): void {
    this.matDialog.open(DeleteCommentDialogComponent, {id: 'deleteComment'}).afterClosed().subscribe((value) => {
      if (value == 'delete') {
        this.articleService.deleteComment(this.comment.id).subscribe((resposne) => {
          if (resposne.error != ERROR_OK) {
            this.showMessageServerError = true;
          } else {
            this.commentChanged.emit();
          }
        }, () => {
          this.showMessageServerError = true;
        })
      }
    });
  }

  public enterEditMode(): void {
    this.editCommentForm = this.fb.group({
      newCommentContent: [this.comment.content, Validators.required]
    }, {
      updateOn: 'submit'
    });
    this.isEditModeOn = true;
  }

  public editComment(): void {
    this.editModeSubmitted = true;
    if (this.editCommentForm.invalid) {
      return;
    }
    this.articleService.editComment(this.comment.id, this.newCommentContent?.value).subscribe((resposne) => {
      if (resposne.error != ERROR_OK) {
        this.showMessageServerError = true;
        this.isEditModeOn = false;
      } else {
        this.commentChanged.emit();
      }
    }, () => {
      this.showMessageServerError = true;
      this.isEditModeOn = false;
    })
  }

  get newCommentContent(): AbstractControl | null {
    return this.editCommentForm.get('newCommentContent');
  }

}
