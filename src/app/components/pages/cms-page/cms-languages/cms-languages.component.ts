import {Component, OnInit} from '@angular/core';
import {Language} from "../../../../models/language";
import {TranslationService} from "../../../../services/translation/translation.service";
import {MatDialog} from "@angular/material/dialog";
import {CreateLanguageModalComponent} from "./create-language-modal/create-language-modal.component";

@Component({
  selector: 'app-cms-languages',
  templateUrl: './cms-languages.component.html',
  styleUrls: ['./cms-languages.component.scss']
})
export class CmsLanguagesComponent implements OnInit {
  public languages: Language[];
  public languagesDisplayedColumns = ['id', 'code', 'name'];

  constructor(private translationService: TranslationService,
              private matDialog: MatDialog) { }

  ngOnInit(): void {
    this.translationService.getLanguages().subscribe(languages => {
      this.languages = languages;
    })
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

}
