import {Component, OnInit} from '@angular/core';
import {Language} from "../../../../models/language";
import {TranslationService} from "../../../../services/translation/translation.service";
import {MatDialog} from "@angular/material/dialog";
import {CreateLanguageModalComponent} from "./create-language-modal/create-language-modal.component";
import {CreateTranslationModalComponent} from "./create-translation-modal/create-translation-modal.component";
import {AddTranslationForLanguageModalComponent} from "./add-translation-for-language-modal/add-translation-for-language-modal.component";
import {UserService} from "../../../../services/user/user.service";
import {PRIVILEGES} from "../../../../consts/privilege.const";

@Component({
  selector: 'app-cms-languages',
  templateUrl: './cms-languages.component.html',
  styleUrls: ['./cms-languages.component.scss']
})
export class CmsLanguagesComponent implements OnInit {
  public languages: Language[];
  public languagesDisplayedColumns = ['id', 'code', 'name'];
  public translationsDisplayedColumns: string[];
  public translationsTableData: {
    alertCode: string,
    translations: { alertName: string | undefined, id: number | undefined }[]
  }[];
  public translationTableReady = false;
  public hasAccessToAddLanguage: boolean;
  public hasAccessToEditLanguage: boolean;
  public hasAccessToDeleteLanguage: boolean;
  public hasAccessToModifyTranslations: boolean;

  constructor(private translationService: TranslationService,
              private userService: UserService,
              private matDialog: MatDialog) {
    this.hasAccessToAddLanguage = this.userService.hasPrivilege(PRIVILEGES.ADD_LANGUAGE);
    this.hasAccessToEditLanguage = this.userService.hasPrivilege(PRIVILEGES.EDIT_LANGUAGE);
    this.hasAccessToDeleteLanguage = this.userService.hasPrivilege(PRIVILEGES.REMOVE_LANGUAGE);
    this.hasAccessToModifyTranslations = this.userService.hasPrivilege(PRIVILEGES.ADD_TRANSLATION);
  }

  async ngOnInit(): Promise<void> {
    this.translationTableReady = false;
    this.languages = await this.translationService.getLanguages().toPromise();
    this.translationsTableData = [];
    this.translationsTableData = (await this.translationService.getAllTranslations().toPromise()).map(translation => {
      return {
        alertCode: translation.alertCode,
        translations: []
      }
    });
    this.translationsDisplayedColumns = ['alertCode'];
    for (let i = 0; i < this.languages.length; i++) {
      const translationsForLanguage = await this.translationService.getTranslations(this.languages[i].name).toPromise();
      this.translationsDisplayedColumns.push(this.languages[i].name);
      for (let j = 0; j < this.translationsTableData.length; j++) {
        const translationForLanguage = translationsForLanguage.find(t => t.alertCode == this.translationsTableData[j].alertCode);
        this.translationsTableData[j].translations.push({
          alertName: translationForLanguage?.alertName,
          id: translationForLanguage?.id,
        });
      }
    }
    this.translationTableReady = true;
  }

  public createLanguage(): void {
    this.matDialog.open(CreateLanguageModalComponent, {
      width: '30%'
    }).afterClosed().subscribe(() => {
      this.ngOnInit();
    })
  }

  public editLanguage(id: number): void {
    this.matDialog.open(CreateLanguageModalComponent, {
      width: '30%',
      data: {editingLanguageId: id}
    }).afterClosed().subscribe(() => {
      this.ngOnInit();
    })
  }

  public deleteLanguage(id: number): void {
    this.translationService.deleteLanguage(id).subscribe(() => {
      this.ngOnInit();
    })
  }

  public createTranslation(): void {
    this.matDialog.open(CreateTranslationModalComponent,
      {
        width: '30%'
      }).afterClosed().subscribe(() => {
      this.ngOnInit();
    })
  }

  public editTranslation(id: number): void {
    this.matDialog.open(CreateTranslationModalComponent,
      {
        width: '30%',
        data: {editingTranslationId: id}
      }).afterClosed().subscribe(() => {
      this.ngOnInit();
    })
  }

  public deleteTranslation(id: number): void {
    this.translationService.deleteTranslation(id).subscribe(() => {
      this.ngOnInit();
    })
  }

  public addTranslationForLanguage(alertCode: string, languageName: string): void {
    this.matDialog.open(AddTranslationForLanguageModalComponent,
      {
        width: '30%',
        data: {
          alertCode: alertCode,
          language: languageName
        }
      }).afterClosed().subscribe(() => {
      this.ngOnInit();
    })
  }

  public changeTranslationForLanguage(id: string, alertCode: string, languageName: string): void {
    this.matDialog.open(AddTranslationForLanguageModalComponent,
      {
        width: '30%',
        data: {
          editingTranslationId: id,
          alertCode: alertCode,
          language: languageName
        }
      }).afterClosed().subscribe(() => {
      this.ngOnInit();
    })
  }

}
