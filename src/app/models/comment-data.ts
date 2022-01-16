import {RestResponse} from "./rest-response";
import {UserData} from "./user-data";

export class CommentData extends RestResponse{
  public id: number;
  public user: UserData;
  public content: string;
  public date: string;
}
