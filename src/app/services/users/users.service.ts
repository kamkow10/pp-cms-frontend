import {Injectable} from '@angular/core';
import {RestService} from "../rest/rest.service";
import {Observable} from "rxjs";
import {UserData} from "../../models/user-data";
import {CommentData} from "../../models/comment-data";

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private restService: RestService) {
  }

  public getUserData(id: number): Observable<UserData> {
    return this.restService.getUserData(id);
  }

  public findUsers(usernameQuery: string): Observable<UserData[]> {
    return this.restService.findUsers(usernameQuery);
  }

  public getUserComments(userId: number): Observable<CommentData[]> {
    return this.restService.getUserComments(userId);
  }
}
