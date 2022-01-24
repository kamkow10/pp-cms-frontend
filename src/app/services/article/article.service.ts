import {Injectable} from '@angular/core';
import {RestService} from "../rest/rest.service";
import {Observable} from "rxjs";
import {Article} from "../../models/article";
import {RestResponse} from "../../models/rest-response";
import {CREATE_ARTICLE_URL, DELETE_ARTICLE_URL, EDIT_ARTICLE_URL, GET_TOP_ARTICLE_URL} from "../../consts/url.const";
import {CreateArticleData} from "../../models/createArticleData";

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  constructor(private restService: RestService) {
  }

  public getArticles(languageName: string): Observable<Article[]> {
    return this.restService.getArticles(languageName);
  }

  public getTopArticles(languageName: string, articlesCount: number): Observable<Article[]> {
    return this.restService.getTopArticles(languageName, articlesCount);
  }

  public searchArticles(languageName: string, query: string, tagNames: string[]): Observable<Article[]> {
    return this.restService.searchArticles(languageName, query, tagNames);
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

  public getUserArticles(): Observable<Article[]> {
    return this.restService.getUserArticles();
  }

  public getAllArticles(): Observable<Article[]> {
    return this.restService.getAllArticles();
  }

  public createArticle(createArticleData: CreateArticleData): Observable<RestResponse> {
    return this.restService.createArticle(createArticleData);
  }

  public editArticle(createArticleData: CreateArticleData): Observable<RestResponse> {
    return this.restService.editArticle(createArticleData);
  }

  public deleteArticle(articleId: number): Observable<RestResponse> {
    return this.restService.deleteArticle(articleId);
  }
}
