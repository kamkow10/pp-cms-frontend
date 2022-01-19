import {Injectable} from '@angular/core';
import {RestService} from "../rest/rest.service";
import {Observable} from "rxjs";
import {UserData} from "../../models/user-data";
import {CommentData} from "../../models/comment-data";
import {UserScore} from "../../models/user-score";

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
}
