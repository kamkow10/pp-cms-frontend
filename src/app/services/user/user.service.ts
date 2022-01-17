import {Injectable} from '@angular/core';
import {RestService} from "../rest/rest.service";
import {LoginData} from "../../models/login-data";
import {Observable} from "rxjs";
import {UserData} from "../../models/user-data";
import {RegisterData} from "../../models/register-data";
import {RestResponse} from "../../models/rest-response";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  public userData: UserData = new UserData();

  constructor(private restService: RestService) {
    this.userData = JSON.parse(<string>localStorage.getItem('user'));
    console.log(this.userData);
  }

  public login(loginData: LoginData): Observable<UserData> {
    return this.restService.login(loginData);
  }

  public register(registerData: RegisterData): Observable<RestResponse> {
    return this.restService.register(registerData);
  }

  public editEmail(newMail: string): Observable<RestResponse> {
    return this.restService.editUserMail(newMail);
  }

  public editPassword(oldPassword: string, newPassword: string): Observable<RestResponse> {
    return this.restService.editUserPassword(oldPassword, newPassword);
  }

  public editUsername(newUsername: string): Observable<RestResponse> {
    return this.restService.editUserUsername(newUsername);
  }
}