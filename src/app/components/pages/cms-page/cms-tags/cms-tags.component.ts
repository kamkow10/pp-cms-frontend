import {Component, OnInit} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {Tag} from "../../../../models/tag";
import {TagService} from "../../../../services/tag/tag.service";
import {Language} from "../../../../models/language";
import {TranslationService} from "../../../../services/translation/translation.service";
import {CreateTagModalComponent} from "./create-tag-modal/create-tag-modal.component";
import {UserService} from "../../../../services/user/user.service";
import {PRIVILEGES} from "../../../../consts/privilege.const";

@Component({
  selector: 'app-cms-tags',
  templateUrl: './cms-tags.component.html',
  styleUrls: ['./cms-tags.component.scss']
})
export class CmsTagsComponent implements OnInit {
  public tags: Tag[];
  public languages: Language[];
  public selectedLanguage: string;
  public tagsDisplayedColumns = ['id', 'name'];
  public hasAccessToAddTag: boolean;
  public hasAccessToEditTag: boolean;
  public hasAccessToDeleteTag: boolean;

  constructor(private tagService: TagService,
              private matDialog: MatDialog,
              private userService: UserService,
              private translationService: TranslationService) {
    this.hasAccessToAddTag = this.userService.hasPrivilege(PRIVILEGES.ADD_TAGS_CMS);
    this.hasAccessToEditTag = this.userService.hasPrivilege(PRIVILEGES.EDIT_TAG);
    this.hasAccessToDeleteTag = this.userService.hasPrivilege(PRIVILEGES.REMOVE_TAGS);
  }

  ngOnInit(): void {
    this.translationService.getLanguages().subscribe(languages => {
      this.languages = languages;
      if (this.selectedLanguage === undefined) {
        this.selectedLanguage = this.languages[0].name;
      }
      this.updateTagsTable();
    });
  }

  public updateTagsTable(): void {
    this.tagService.getTags(this.selectedLanguage).subscribe(tags => {
      this.tags = tags;
    })
  }

  public createTag(): void {
    this.matDialog.open(CreateTagModalComponent, {
      width: '30%',
      data: {language: this.selectedLanguage}
    }).afterClosed().subscribe(() => {
      this.ngOnInit();
    })
  }

  public editTag(id: number) {
    this.matDialog.open(CreateTagModalComponent, {
      width: '30%',
      data: {editingTagId: id, language: this.selectedLanguage}
    }).afterClosed().subscribe(() => {
      this.ngOnInit();
    })
  }

  public deleteTag(id: number) {
    this.tagService.deleteTag(id).subscribe(() => {
      this.ngOnInit();
    })
  }

}
