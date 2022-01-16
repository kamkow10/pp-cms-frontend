import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {UserData} from "../../models/user-data";
import {
  ADD_COMMENT_URL,
  EDIT_MAIL_URL,
  FIND_USERS_URL, GET_ARTICLE_BY_COMMENT_ID_URL, GET_ARTICLE_BY_ID_URL,
  GET_USER_BY_ID_URL,
  GET_USER_COMMENTS_URL,
  LOGIN_URL,
  REGISTER_URL
} from "../../consts/url.const";
import {LoginData} from "../../models/login-data";
import {RegisterData} from "../../models/register-data";
import {CommentData} from "../../models/comment-data";
import {Article} from "../../models/article";
import {RestResponse} from "../../models/rest-response";

@Injectable({
  providedIn: 'root'
})
export class RestService {

  constructor(private httpClient: HttpClient) {
  }

  public login(loginData: LoginData): Observable<UserData> {
    return this.httpClient.post<UserData>(LOGIN_URL, loginData, {headers: {
        'Authorization': 'Basic ' + btoa(loginData.userMail + ':' + loginData.password)
      }});
  }

  public register(registerData: RegisterData): Observable<UserData> {
    return this.httpClient.post<UserData>(REGISTER_URL, registerData);
  }

  public findUsers(usernameQuery: string): Observable<UserData[]> {
    return this.httpClient.get<UserData[]>(FIND_USERS_URL + `/${usernameQuery}`);
  }

  public getUserData(id: number): Observable<UserData> {
    return this.httpClient.get<UserData>(GET_USER_BY_ID_URL + `/${id}`);
  }

  public getUserComments(userId: number): Observable<CommentData[]> {
    return this.httpClient.get<CommentData[]>(GET_USER_COMMENTS_URL + `/${userId}`);
  }

  public getArticleById(articleId: number): Observable<Article> {
    return this.httpClient.get<Article>(GET_ARTICLE_BY_ID_URL + `/${articleId}`);
  }

  public getArticleByCommentId(commentId: number): Observable<Article> {
    return this.httpClient.get<Article>(GET_ARTICLE_BY_COMMENT_ID_URL + `/${commentId}`);
  }

  public addComment(articleId: number, content: string): Observable<RestResponse> {
    return this.httpClient.post<RestResponse>(ADD_COMMENT_URL, {
      articleId: articleId,
      content: content
    });
  }

  // na później
  public editUserMail(newMail: string): Observable<any> {
    return this.httpClient.put(EDIT_MAIL_URL, newMail);
  }
}
