import {Injectable} from '@angular/core';
import {Language} from "../../models/language";
import {RestService} from "../rest/rest.service";
import {Observable} from "rxjs";
import {Translation} from "../../models/translation";

@Injectable({
  providedIn: 'root'
})
export class TranslationService {
  public currentLang: string;
  public translations: Translation[];
  public readonly defaultLanguage = 'polish';

  constructor(private restService: RestService) {
    if (localStorage.getItem('lang')) {
      this.currentLang = <string>localStorage.getItem('lang');
    }
    if (localStorage.getItem('translations')) {
      this.translations = JSON.parse(<string>localStorage.getItem('translations'));
    }
  }

  public async initTranslations(): Promise<void> {
    if (this.translations === undefined) {
      let translations = await this.getTranslations(this.defaultLanguage).toPromise();
      localStorage.setItem('lang', this.defaultLanguage);
      localStorage.setItem('translations', JSON.stringify(translations));
      window.location.href = '';
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
}
