import {Injectable} from '@angular/core';
import {RestService} from "../rest/rest.service";
import {Observable} from "rxjs";
import {UserData} from "../../models/user-data";
import {CommentData} from "../../models/comment-data";
import {UserScore} from "../../models/user-score";
import {RestResponse} from "../../models/rest-response";
import {Role} from "../../models/role";
import {CREATE_TAG_URL, GET_ROLES_URL} from "../../consts/url.const";

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private restService: RestService) {
  }

  public getUserData(id: number): Observable<UserData> {
    return this.restService.getUserData(id);
  }

  public getUsers(): Observable<UserData[]> {
    return this.restService.getUsers();
  }

  public getTopUsers(count: number): Observable<UserScore[]> {
    return this.restService.getTopUsers(count);
  }

  public findUsers(usernameQuery: string): Observable<UserData[]> {
    return this.restService.findUsers(usernameQuery);
  }

  public getUserComments(userId: number): Observable<CommentData[]> {
    return this.restService.getUserComments(userId);
  }

  public editCmsUserMail(userId: number, userMail: string): Observable<RestResponse> {
    return this.restService.editCmsUserMail(userId, userMail);
  }

  public editCmsUserUsername(userId: number, userName: string): Observable<RestResponse> {
    return this.restService.editCmsUserUsername(userId, userName);
  }

  public editCmsUserRole(userID: number, roleName: string): Observable<RestResponse> {
    return this.restService.editCmsUserRole(userID, roleName);
  }

  public deleteUser(userId: number): Observable<RestResponse> {
    return this.restService.deleteUser(userId);
  }

  public getRoles(): Observable<Role[]> {
    return this.restService.getRoles();
  }

  public createTag(name: string, language: string): Observable<RestResponse> {
    return this.restService.createTag(name, language);
  }
}
