import {Injectable} from '@angular/core';
import {RestService} from "../rest/rest.service";
import {Observable} from "rxjs";
import {Tag} from "../../models/tag";
import {RestResponse} from "../../models/rest-response";
import {DELETE_TAG_URL, EDIT_TAG_URL, GET_TAG_BY_ID_URL} from "../../consts/url.const";

@Injectable({
  providedIn: 'root'
})
export class TagService {

  constructor(private restService: RestService) {
  }

  public getTags(languageName: string): Observable<Tag[]> {
    return this.restService.getTags(languageName);
  }

  public createTag(name: string, language: string): Observable<RestResponse> {
    return this.restService.createTag(name, language);
  }

  public editTag(tagId: number, tagName: string): Observable<RestResponse> {
    return this.restService.editTag(tagId, tagName);
  }

  public deleteTag(tagId: number): Observable<RestResponse> {
    return this.restService.deleteTag(tagId);
  }

  public getTag(tagId: number): Observable<Tag> {
    return this.restService.getTag(tagId);
  }
}
