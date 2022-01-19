import {Component, Input, OnInit} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {FormBuilder} from "@angular/forms";
import {Tag} from "../../../../models/tag";
import {TagService} from "../../../../services/tag/tag.service";

@Component({
  selector: 'app-select-tags-modal',
  templateUrl: './select-tags-modal.component.html',
  styleUrls: ['./select-tags-modal.component.scss']
})
export class SelectTagsModalComponent implements OnInit {
  public tags: Tag[];
  public isTagSelected: boolean[] = [];

  constructor(private matDialog: MatDialog,
              private fb: FormBuilder,
              private tagService: TagService) {
  }

  ngOnInit(): void {
    this.tagService.getTags('polish').subscribe(tags => {
      this.tags = tags;
      this.tags.forEach(() => this.isTagSelected.push(false))
    });
  }

  public selectTags(): void {
    let selectedTagsIds: number[] = [];
    this.isTagSelected.forEach((selected, index) => {
      if (selected) {
        selectedTagsIds.push(this.tags[index].id);
      }
    })
    this.matDialog.getDialogById('selectTags')?.close(selectedTagsIds);
  }

}
