import {Component, Inject, OnInit} from '@angular/core';
import {Translation} from "../../../../../models/translation";
import {TranslationService} from "../../../../../services/translation/translation.service";
import {MAT_DIALOG_DATA, MatDialog} from "@angular/material/dialog";
import {ERROR_OK} from "../../../../../consts/error.const";

@Component({
  selector: 'app-add-translation-for-language-modal',
  templateUrl: './add-translation-for-language-modal.component.html',
  styleUrls: ['./add-translation-for-language-modal.component.scss']
})
export class AddTranslationForLanguageModalComponent implements OnInit {
  public showMessageServerError = false;
  public alertName = '';
  public editingAlertCode: string;
  public editingLanguageName: string;

  public editMode = false;
  public editingTranslationId: number;

  constructor(private translationService: TranslationService,
              private matDialog: MatDialog,
              @Inject(MAT_DIALOG_DATA) public data: { editingTranslationId: number, alertCode: string, language: string }) {
    this.editMode = this.data.editingTranslationId != null;
    this.editingAlertCode = this.data.alertCode;
    this.editingLanguageName = this.data.language;
  }

  ngOnInit(): void {
    if (this.editMode) {
      this.editingTranslationId = this.data.editingTranslationId;
      this.translationService.getTranslation(this.editingTranslationId).subscribe(response => {
        this.alertName = response.errorTranslation;
      });
    }
  }

  public addTranslationForLanguage(): void {
    this.translationService.addTranslationForLanguage(this.alertName, this.editingAlertCode, this.editingLanguageName).subscribe(response => {
      if (response.error != ERROR_OK) {
        this.showMessageServerError = true;
      } else {
        this.matDialog.closeAll();
      }
    }, () => {
      this.showMessageServerError = true;
    })
  }

  public editTranslationForLanguage(): void {
    this.translationService.changeTranslationForLanguage(this.editingTranslationId, this.alertName).subscribe(response => {
      if (response.error != ERROR_OK) {
        this.showMessageServerError = true;
      } else {
        this.matDialog.closeAll();
      }
    }, () => {
      this.showMessageServerError = true;
    })
  }
}
