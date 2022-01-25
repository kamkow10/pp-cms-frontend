import {Injectable} from '@angular/core';
import {Language} from "../../models/language";
import {RestService} from "../rest/rest.service";
import {Observable} from "rxjs";
import {Translation} from "../../models/translation";
import {RestResponse} from "../../models/rest-response";
import {
  CREATE_LANGUAGE_URL,
  DELETE_LANGUAGE_URL,
  EDIT_LANGUAGE_URL,
  GET_LANGUAGE_BY_ID_URL
} from "../../consts/url.const";

@Injectable({
  providedIn: 'root'
})
export class TranslationService {
  public currentLang: string;
  public translations: Translation[];

  constructor(private restService: RestService) {
    if (localStorage.getItem('lang')) {
      this.currentLang = <string>localStorage.getItem('lang');
    }
    if (localStorage.getItem('translations')) {
      this.translations = JSON.parse(<string>localStorage.getItem('translations'));
    }
  }

  public async setLanguage(languageName: string): Promise<void> {
    if (this.currentLang != languageName || this.translations === undefined) {
      let translations = await this.getTranslations(languageName).toPromise();
      localStorage.setItem('lang', languageName);
      localStorage.setItem('translations', JSON.stringify(translations));
      window.location.href = '';
    }
  }

  public getLanguages(): Observable<Language[]> {
    return this.restService.getLanguages();
  }

  public getTranslations(languageName: string): Observable<any> {
    return this.restService.getTranslations(languageName);
  }

  public createLanguage(name: string, languageCode: string): Observable<RestResponse> {
    return this.restService.createLanguage(name, languageCode);
  }

  public editLanguage(id: number, name: string, languageCode: string): Observable<RestResponse> {
    return this.restService.editLanguage(id, name, languageCode);
  }

  public deleteLanguage(id: number): Observable<RestResponse> {
    return this.restService.deleteLanguage(id);
  }

  public getLanguage(id: number): Observable<Language> {
    return this.restService.getLanguage(id);
  }
}
