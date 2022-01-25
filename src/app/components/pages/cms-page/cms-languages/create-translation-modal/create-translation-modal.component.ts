import {Component, Inject, OnInit} from '@angular/core';
import {Language} from "../../../../../models/language";
import {TranslationService} from "../../../../../services/translation/translation.service";
import {MAT_DIALOG_DATA, MatDialog} from "@angular/material/dialog";
import {ERROR_ALERT_CODE_IN_USE, ERROR_LANGUAGE_ALREADY_EXISTS, ERROR_OK} from "../../../../../consts/error.const";
import {Translation} from "../../../../../models/translation";

@Component({
  selector: 'app-create-translation-modal',
  templateUrl: './create-translation-modal.component.html',
  styleUrls: ['./create-translation-modal.component.scss']
})
export class CreateTranslationModalComponent implements OnInit {
  public showMessageServerError = false;
  public showMessageAlertCodeInUse = false;
  public alertCode = '';
  public alertName = '';
  public mainLanguage: string;

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
