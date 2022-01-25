import {Injectable} from '@angular/core';
import {Language} from "../../models/language";
import {RestService} from "../rest/rest.service";
import {Observable} from "rxjs";
import {Translation} from "../../models/translation";
import {RestResponse} from "../../models/rest-response";
import {
  ADD_TRANSLATION_FOR_LANGUAGE_URL, CHANGE_TRANSLATION_FOR_LANGUAGE_URL,
  CREATE_LANGUAGE_URL, CREATE_TRANSLATION_URL,
  DELETE_LANGUAGE_URL, DELETE_TRANSLATION_URL,
  EDIT_LANGUAGE_URL, EDIT_TRANSLATION_URL, GET_ALL_TRANSLATIONS_URL,
  GET_LANGUAGE_BY_ID_URL, GET_TRANSLATION_BY_ID_URL
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

  public getTranslations(languageName: string): Observable<Translation[]> {
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

  public addTranslationForLanguage(alertName: string, alertCode: string, language: string): Observable<RestResponse> {
    return this.restService.addTranslationForLanguage(alertName, alertCode, language);
  }

  public changeTranslationForLanguage(id: number, alertName: string): Observable<RestResponse> {
    return this.restService.changeTranslationForLanguage(id, alertName);
  }

  public getAllTranslations(): Observable<Translation[]> {
    return this.restService.getAllTranslations();
  }

  public createTranslation(alertName: string, alertCode: string): Observable<RestResponse> {
    return this.restService.createTranslation(alertName, alertCode);
  }

  public editTranslation(id: number, alertName: string, alertCode: string): Observable<RestResponse> {
    return this.restService.editTranslation(id, alertName, alertCode);
  }

  public deleteTranslation(id: number): Observable<RestResponse> {
    return this.restService.deleteTranslation(id);
  }

  public getTranslation(id: number): Observable<{alertCode: Translation}> {
    return this.restService.getTranslation(id);
  }
}
