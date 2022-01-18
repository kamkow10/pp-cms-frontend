import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ArticleService} from "../../../services/article/article.service";
import {Article} from "../../../models/article";
import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../../../services/user/user.service";
import {ERROR_OK} from "../../../consts/error.const";

@Component({
  selector: 'app-article-page',
  templateUrl: './article-page.component.html',
  styleUrls: ['./article-page.component.scss']
})
export class ArticlePageComponent implements OnInit {
  public article: Article;
  public addCommentForm: FormGroup;
  public submitted = false;
  public loggedIn: boolean;
  public showMessageServerError = false;

  constructor(private route: ActivatedRoute,
              private articleService: ArticleService,
              private fb: FormBuilder,
              private userService: UserService) {
  }

  ngOnInit(): void {
    this.loggedIn = this.userService.isLoggedIn();
    if (this.loggedIn) {
      this.addCommentForm = this.fb.group({
        newComment: ['', Validators.required]
      }, {
        updateOn: 'submit'
      })
    }
    const articleId = this.route.snapshot.params.id;
    this.articleService.getArticleById(articleId).subscribe((article) => {
      this.article = article;
    }, () => {});
  }

  public addComment(): void {
    this.submitted = true;
    if (this.addCommentForm.invalid) {
      return;
    }
    this.articleService.addComment(this.article.id, this.newComment?.value).subscribe(response => {
      if (response.error != ERROR_OK) {
        this.showMessageServerError = true;
      } else {
        this.ngOnInit();
      }
    }, () => {});
  }

  get newComment(): AbstractControl | null {
    return this.addCommentForm.get('newComment');
  }

}
