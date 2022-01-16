import {Component, Input, OnInit} from '@angular/core';
import {CommentData} from "../../../models/comment-data";
import {UserService} from "../../../services/user/user.service";
import {UsersService} from "../../../services/users/users.service";
import {ArticleService} from "../../../services/article/article.service";
import {Article} from "../../../models/article";

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements OnInit {
  @Input() public comment: CommentData;
  @Input() public showArticleTitle = false;
  public article: Article;

  constructor(private articleService: ArticleService) {
  }

  ngOnInit(): void {
    if (this.showArticleTitle) {
      this.articleService.getArticleByCommentId(this.comment.id).subscribe((article) => {
        this.article = article;
      }, () => {});
    }
  }

}
