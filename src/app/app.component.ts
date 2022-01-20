import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {TranslationService} from "./services/translation/translation.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(private translationService: TranslationService) {
    this.translationService.initTranslations();
  }

  async ngOnInit() {
  }
}
