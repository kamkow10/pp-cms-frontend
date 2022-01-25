import {Component, OnInit} from '@angular/core';
import {TranslationService} from "./services/translation/translation.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(private translationService: TranslationService) {
    if (this.translationService.currentLang === undefined) {
      this.setDefaultLanguage();
    } else {
      this.translationService.setLanguage(this.translationService.currentLang);
    }
  }

  ngOnInit() {
  }

  public setDefaultLanguage(): void {
    this.translationService.getLanguages().subscribe(languages => {
      this.translationService.setLanguage(languages[0].name);
    })
  }
}
