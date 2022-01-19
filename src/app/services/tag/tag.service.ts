import {Injectable} from '@angular/core';
import {RestService} from "../rest/rest.service";
import {Observable} from "rxjs";
import {Tag} from "../../models/tag";

@Injectable({
  providedIn: 'root'
})
export class TagService {

  constructor(private restService: RestService) {
  }

  public getTags(languageName: string): Observable<Tag[]> {
    return this.restService.getTags(languageName);
  }
}
