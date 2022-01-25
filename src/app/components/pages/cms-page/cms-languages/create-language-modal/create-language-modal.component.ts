import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog} from "@angular/material/dialog";
import {ERROR_LANGUAGE_ALREADY_EXISTS, ERROR_OK} from "../../../../../consts/error.const";
import {Language} from "../../../../../models/language";
import {TranslationService} from "../../../../../services/translation/translation.service";

@Component({
  selector: 'app-create-language-modal',
  templateUrl: './create-language-modal.component.html',
  styleUrls: ['./create-language-modal.component.scss']
})
export class CreateLanguageModalComponent implements OnInit {
  public showMessageServerError = false;
  public showMessageLanguageAlreadyExists = false;
  public languageName = '';
  public languageCode = '';

  public editMode = false;
  public editingLanguage: Language;

  constructor(private translationService: TranslationService,
              private matDialog: MatDialog,
              @Inject(MAT_DIALOG_DATA) public data: {editingLanguageId: number}) {
    this.editMode = this.data != null;
  }

  ngOnInit(): void {
    if (this.editMode) {
      this.translationService.getLanguage(this.data.editingLanguageId).subscribe(language => {
        this.editingLanguage = language;
        this.languageName = language.name;
        this.languageCode = language.languageCode;
      });
    }
  }

  public createLanguage(): void {
    this.translationService.createLanguage(this.languageName, this.languageCode).subscribe(response => {
      if (response.error != ERROR_OK) {
        if (response.error == ERROR_LANGUAGE_ALREADY_EXISTS) {
          this.showMessageLanguageAlreadyExists = true;
        } else {
          this.showMessageServerError = true;
        }
      } else {
        this.matDialog.closeAll();
      }
    }, () => {
      this.showMessageServerError = true;
    })
  }

  public editLanguage(): void {
    this.translationService.editLanguage(this.editingLanguage.id, this.languageName, this.languageCode).subscribe(response => {
      if (response.error != ERROR_OK) {
        if (response.error == ERROR_LANGUAGE_ALREADY_EXISTS) {
          this.showMessageLanguageAlreadyExists = true;
        } else {
          this.showMessageServerError = true;
        }
      } else {
        this.matDialog.closeAll();
      }
    }, () => {
      this.showMessageServerError = true;
    })
  }
}
