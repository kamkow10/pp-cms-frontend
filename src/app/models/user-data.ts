import {RestResponse} from "./rest-response";
import {Role} from "./role";

export class UserData extends RestResponse {
  public id: number;
  public userName: string;
  public userMail: string;
  public commentsCount: number;
  public roles: Role[];
}
