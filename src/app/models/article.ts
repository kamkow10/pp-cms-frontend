import {UserData} from "./user-data";
import {RestResponse} from "./rest-response";
import {CommentData} from "./comment-data";

export class Article extends RestResponse {
  id: number;
  content: string;
  title: string;
  image: string;
  published: string;
  views: string;
  commentsAllowed: boolean;
  user: UserData;
  comments: CommentData[];
  date: string;
  language: any;
  articleTags: any;
}
