import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {UserData} from "../../models/user-data";
import {
  ADD_COMMENT_URL,
  USER_EDIT_EMAIL_URL,
  FIND_USERS_URL,
  GET_ARTICLE_BY_COMMENT_ID_URL,
  GET_ARTICLE_BY_ID_URL,
  GET_USER_BY_ID_URL,
  GET_USER_COMMENTS_URL,
  LOGIN_URL,
  REGISTER_URL,
  USER_EDIT_USERNAME_URL,
  USER_EDIT_PASSWORD_URL,
  LOGOUT_URL,
  EDIT_COMMENT_URL,
  DELETE_COMMENT_URL,
  GET_ARTICLES_URL,
  GET_USERS_URL,
  GET_TOP_ARTICLE_URL,
  GET_TOP_USERS_URL,
  GET_TAGS_URL,
  SEARCH_ARTICLES_URL,
  GET_LANGUAGES_URL,
  GET_TRANSLATIONS_URL,
  GET_USER_ARTICLES,
  CREATE_ARTICLE_URL,
  GET_ALL_ARTICLES,
  EDIT_ARTICLE_URL,
  DELETE_ARTICLE_URL,
  CHANGE_ARTICLE_PUBLISH_STATUS_URL,
  DELETE_USER_URL,
  EDIT_CMS_USER_MAIL_URL,
  EDIT_CMS_USER_USERNAME_URL,
  EDIT_CMS_USER_ROLE_URL,
  GET_ROLES_URL,
  CREATE_TAG_URL,
  GET_CMS_USERS_URL,
  EDIT_TAG_URL,
  DELETE_TAG_URL,
  GET_TAG_BY_ID_URL,
  CREATE_LANGUAGE_URL,
  EDIT_LANGUAGE_URL,
  DELETE_LANGUAGE_URL,
  GET_LANGUAGE_BY_ID_URL,
  ADD_TRANSLATION_FOR_LANGUAGE_URL,
  GET_ALL_TRANSLATIONS_URL,
  CREATE_TRANSLATION_URL,
  EDIT_TRANSLATION_URL,
  DELETE_TRANSLATION_URL, CHANGE_TRANSLATION_FOR_LANGUAGE_URL, GET_TRANSLATION_BY_ID_URL, GET_MAIN_TRANSLATION_BY_ID_URL
} from "../../consts/url.const";
import {LoginData} from "../../models/login-data";
import {RegisterData} from "../../models/register-data";
import {CommentData} from "../../models/comment-data";
import {Article} from "../../models/article";
import {RestResponse} from "../../models/rest-response";
import {UserScore} from "../../models/user-score";
import {Tag} from "../../models/tag";
import {Language} from "../../models/language";
import {Translation} from "../../models/translation";
import {CreateArticleData} from "../../models/createArticleData";
import {Role} from "../../models/role";

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

  public logout(): Observable<any> {
    return this.httpClient.post(LOGOUT_URL, {});
  }

  public findUsers(usernameQuery: string): Observable<UserData[]> {
    return this.httpClient.get<UserData[]>(FIND_USERS_URL + `/${usernameQuery}`);
  }

  public getUserData(id: number): Observable<UserData> {
    return this.httpClient.get<UserData>(GET_USER_BY_ID_URL + `/${id}`);
  }

  public getUsers(): Observable<UserData[]> {
    return this.httpClient.get<UserData[]>(GET_USERS_URL);
  }

  public getTopUsers(count: number): Observable<UserScore[]> {
    return this.httpClient.get<UserScore[]>(GET_TOP_USERS_URL + `/${count}`);
  }

  public getUserComments(userId: number): Observable<CommentData[]> {
    return this.httpClient.get<CommentData[]>(GET_USER_COMMENTS_URL + `/${userId}`);
  }

  public getArticles(languageName: string): Observable<Article[]> {
    return this.httpClient.get<Article[]>(GET_ARTICLES_URL + `/${languageName}`);
  }

  public getTopArticles(languageName: string, articlesCount: number): Observable<Article[]> {
    return this.httpClient.get<Article[]>(GET_TOP_ARTICLE_URL + `/${languageName}/${articlesCount}`);
  }

  public searchArticles(languageName: string, query: string, tagNames: string[]): Observable<Article[]> {
    let requestBody: {name: string}[] = [];
    tagNames.forEach(tagName => requestBody.push({name: tagName}));
    return this.httpClient.post<Article[]>(SEARCH_ARTICLES_URL + `/${languageName}/contains/${query}`, requestBody);
  }

  public getArticleById(articleId: number): Observable<Article> {
    return this.httpClient.get<Article>(GET_ARTICLE_BY_ID_URL + `/${articleId}`);
  }

  public getArticleByCommentId(commentId: number): Observable<Article> {
    return this.httpClient.get<Article>(GET_ARTICLE_BY_COMMENT_ID_URL + `/${commentId}`);
  }

  public addComment(articleId: number, content: string): Observable<RestResponse> {
    return this.httpClient.post<RestResponse>(ADD_COMMENT_URL, {articleId, content});
  }

  public editComment(commentId: number, content: string): Observable<RestResponse> {
    return this.httpClient.put<RestResponse>(EDIT_COMMENT_URL, {commentId, content});
  }

  public deleteComment(commentId: number): Observable<RestResponse> {
    return this.httpClient.delete<RestResponse>(DELETE_COMMENT_URL + `/${commentId}`);
  }

  public editUserMail(newMail: string): Observable<RestResponse> {
    return this.httpClient.put<RestResponse>(USER_EDIT_EMAIL_URL, {newMail});
  }

  public editUserPassword(oldPassword: string, newPassword: string): Observable<RestResponse> {
    return this.httpClient.put<RestResponse>(USER_EDIT_PASSWORD_URL, {oldPassword, newPassword});
  }

  public editUserUsername(userName: string): Observable<RestResponse> {
    return this.httpClient.put<RestResponse>(USER_EDIT_USERNAME_URL, {userName});
  }

  public getTags(languageName: string): Observable<Tag[]> {
    return this.httpClient.get<Tag[]>(GET_TAGS_URL + `/${languageName}`);
  }

  public getLanguages(): Observable<Language[]> {
    return this.httpClient.get<Language[]>(GET_LANGUAGES_URL);
  }

  public getTranslations(languageName: string): Observable<Translation[]> {
    return this.httpClient.get<Translation[]>(GET_TRANSLATIONS_URL + `/${languageName}`);
  }

  public getUserArticles(): Observable<Article[]> {
    return this.httpClient.get<Article[]>(GET_USER_ARTICLES);
  }

  public getAllArticles(): Observable<Article[]> {
    return this.httpClient.get<Article[]>(GET_ALL_ARTICLES);
  }

  public createArticle(createArticleData: CreateArticleData): Observable<RestResponse> {
    return this.httpClient.post<RestResponse>(CREATE_ARTICLE_URL, createArticleData);
  }

  public editArticle(createArticleData: CreateArticleData): Observable<RestResponse> {
    return this.httpClient.put<RestResponse>(EDIT_ARTICLE_URL, createArticleData);
  }

  public deleteArticle(articleId: number): Observable<RestResponse> {
    return this.httpClient.delete<RestResponse>(DELETE_ARTICLE_URL + `/${articleId}`);
  }

  public changeArticlePublishStatus(articleId: number, publishStatus: string): Observable<RestResponse> {
    return this.httpClient.put<RestResponse>(CHANGE_ARTICLE_PUBLISH_STATUS_URL, {
      id: articleId,
      status: publishStatus
    });
  }

  public editCmsUserMail(userId: number, userMail: string): Observable<RestResponse> {
    return this.httpClient.put<RestResponse>(EDIT_CMS_USER_MAIL_URL, {userId, userMail});
  }

  public editCmsUserUsername(userId: number, userName: string): Observable<RestResponse> {
    return this.httpClient.put<RestResponse>(EDIT_CMS_USER_USERNAME_URL, {userId, userName});
  }

  public editCmsUserRole(userID: number, roleName: string): Observable<RestResponse> {
    return this.httpClient.put<RestResponse>(EDIT_CMS_USER_ROLE_URL, {userID, roleName});
  }

  public deleteUser(userId: number): Observable<RestResponse> {
    return this.httpClient.delete<RestResponse>(DELETE_USER_URL + `/${userId}`);
  }

  public getRoles(): Observable<Role[]> {
    return this.httpClient.get<Role[]>(GET_ROLES_URL);
  }

  public createTag(name: string, language: string): Observable<RestResponse> {
    return this.httpClient.post<RestResponse>(CREATE_TAG_URL, {name, language});
  }

  public editTag(tagId: number, tagName: string): Observable<RestResponse> {
    return this.httpClient.put<RestResponse>(EDIT_TAG_URL + `/${tagId}`, {name: tagName});
  }

  public deleteTag(tagId: number): Observable<RestResponse> {
    return this.httpClient.delete<RestResponse>(DELETE_TAG_URL + `/${tagId}`);
  }

  public getTag(tagId: number): Observable<Tag> {
    return this.httpClient.get<Tag>(GET_TAG_BY_ID_URL + `/${tagId}`);
  }

  public getCmsUsers(): Observable<UserData[]> {
    return this.httpClient.get<UserData[]>(GET_CMS_USERS_URL);
  }

  public createLanguage(name: string, languageCode: string): Observable<RestResponse> {
    return this.httpClient.post<RestResponse>(CREATE_LANGUAGE_URL, {name, languageCode});
  }

  public editLanguage(id: number, name: string, languageCode: string): Observable<RestResponse> {
    return this.httpClient.put<RestResponse>(EDIT_LANGUAGE_URL, {id, name, languageCode});
  }

  public deleteLanguage(id: number): Observable<RestResponse> {
    return this.httpClient.delete<RestResponse>(DELETE_LANGUAGE_URL + `/${id}`);
  }

  public getLanguage(id: number): Observable<Language> {
    return this.httpClient.get<Language>(GET_LANGUAGE_BY_ID_URL + `/${id}`);
  }

  public addTranslationForLanguage(alertName: string, alertCode: string, language: string): Observable<RestResponse> {
    return this.httpClient.post<RestResponse>(ADD_TRANSLATION_FOR_LANGUAGE_URL, {alertName, alertCode, language});
  }

  public changeTranslationForLanguage(id: number, alertName: string): Observable<RestResponse> {
    return this.httpClient.put<RestResponse>(CHANGE_TRANSLATION_FOR_LANGUAGE_URL, {id, alertName});
  }

  public getAllTranslations(): Observable<Translation[]> {
    return this.httpClient.get<Translation[]>(GET_ALL_TRANSLATIONS_URL);
  }

  public createTranslation(alertName: string, alertCode: string): Observable<RestResponse> {
    return this.httpClient.post<RestResponse>(CREATE_TRANSLATION_URL, {alertName, alertCode});
  }

  public editTranslation(id: number, alertName: string, alertCode: string): Observable<RestResponse> {
    return this.httpClient.put<RestResponse>(EDIT_TRANSLATION_URL, {id, alertName, alertCode});
  }

  public deleteTranslation(id: number): Observable<RestResponse> {
    return this.httpClient.delete<RestResponse>(DELETE_TRANSLATION_URL + `/${id}`);
  }

  public getTranslation(id: number): Observable<{errorTranslation: string}> {
    return this.httpClient.get<{errorTranslation: string}>(GET_TRANSLATION_BY_ID_URL + `/${id}`);
  }

  public getMainTranslation(id: number): Observable<Translation> {
    return this.httpClient.get<Translation>(GET_MAIN_TRANSLATION_BY_ID_URL + `/${id}`);
  }

}
