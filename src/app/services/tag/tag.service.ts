import {Injectable} from '@angular/core';
import {RestService} from "../rest/rest.service";
import {Observable} from "rxjs";
import {Tag} from "../../models/tag";
import {RestResponse} from "../../models/rest-response";

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
}
