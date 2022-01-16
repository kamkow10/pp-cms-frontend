import {RestResponse} from "./rest-response";

export class UserData extends RestResponse {
  public id: number;
  public userName: string;
  public userMail: string;
  public commentsCount: number;
}
