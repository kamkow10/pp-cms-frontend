import {Injectable} from '@angular/core';
import {RestService} from "../rest/rest.service";
import {Observable} from "rxjs";
import {UserData} from "../../models/user-data";
import {CommentData} from "../../models/comment-data";
import {UserScore} from "../../models/user-score";
import {RestResponse} from "../../models/rest-response";
import {
  DELETE_USER_URL,
  EDIT_CMS_USER_MAIL_URL,
  EDIT_CMS_USER_ROLE_URL,
  EDIT_CMS_USER_USERNAME_URL
} from "../../consts/url.const";

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
}
