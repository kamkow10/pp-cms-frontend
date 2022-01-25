import {Component, Inject, OnInit} from '@angular/core';
import {Translation} from "../../../../../models/translation";
import {TranslationService} from "../../../../../services/translation/translation.service";
import {MAT_DIALOG_DATA, MatDialog} from "@angular/material/dialog";
import {ERROR_ALERT_CODE_IN_USE, ERROR_OK} from "../../../../../consts/error.const";

@Component({
  selector: 'app-add-translation-for-language-modal',
  templateUrl: './add-translation-for-language-modal.component.html',
  styleUrls: ['./add-translation-for-language-modal.component.scss']
})
export class AddTranslationForLanguageModalComponent implements OnInit {
  public showMessageServerError = false;
  public showMessageAlertCodeInUse = false;
  public alertName = '';
  public editingLanguageName: string;

  public editMode = false;
  public editingTranslation: Translation;

  constructor(private translationService: TranslationService,
              private matDialog: MatDialog,
              @Inject(MAT_DIALOG_DATA) public data: {editingTranslationId: number}) {
    this.editMode = this.data != null;
  }

  ngOnInit(): void {
    this.translationService.getLanguages().subscribe(languages => this.mainLanguage = languages[0].name)
    if (this.editMode) {
      this.translationService.getTranslation(this.data.editingTranslationId).subscribe(result => {
        this.editingTranslation = result.alertCode;
        this.alertCode = this.editingTranslation.alertCode;
        this.alertName = this.editingTranslation.alertName;
      });
    }
  }

  public createTranslation(): void {
    this.translationService.createTranslation(this.alertName, this.alertCode).subscribe(response => {
      if (response.error != ERROR_OK) {
        if (response.error == ERROR_ALERT_CODE_IN_USE) {
          this.showMessageAlertCodeInUse = true;
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

  public editTranslation(): void {
    this.translationService.editTranslation(this.editingTranslation.id, this.alertName, this.alertCode).subscribe(response => {
      if (response.error != ERROR_OK) {
        if (response.error == ERROR_ALERT_CODE_IN_USE) {
          this.showMessageAlertCodeInUse = true;
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
