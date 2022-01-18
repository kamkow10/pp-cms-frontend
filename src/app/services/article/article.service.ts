import {Injectable} from '@angular/core';
import {RestService} from "../rest/rest.service";
import {Observable} from "rxjs";
import {CommentData} from "../../models/comment-data";
import {Article} from "../../models/article";
import {RestResponse} from "../../models/rest-response";

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  constructor(private restService: RestService) {
  }

  public getArticleById(articleId: number): Observable<Article> {
    return this.restService.getArticleById(articleId);
  }

  public getArticleByCommentId(commentId: number): Observable<Article> {
    return this.restService.getArticleByCommentId(commentId);
  }

  public addComment(articleId: number, comment: string): Observable<RestResponse> {
    return this.restService.addComment(articleId, comment);
  }

  public editComment(commentId: number, content: string): Observable<RestResponse> {
    return this.restService.editComment(commentId, content);
  }

  public deleteComment(commentId: number): Observable<RestResponse> {
    return this.restService.deleteComment(commentId);
  }
}
