import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, Validators} from "@angular/forms";
import {ArticleService} from "../../../services/article/article.service";
import {Article} from "../../../models/article";
import {MatDialog} from "@angular/material/dialog";
import {SelectTagsModalComponent} from "./select-tags-modal/select-tags-modal.component";
import {Tag} from "../../../models/tag";
import {TagService} from "../../../services/tag/tag.service";

@Component({
  selector: 'app-article-list-page',
  templateUrl: './article-list-page.component.html',
  styleUrls: ['./article-list-page.component.scss']
})
export class ArticleListPageComponent implements OnInit {
  public articleSearchForm = this.fb.group({
      articleName: ['', Validators.required]
    },
    {
      updateOn: 'submit'
    });
  public submitted = false;
  public foundedArticles: Article[];
  public isAnyTagSelected = false;
  public tags: Tag[];
  public selectedTags: Tag[];

  constructor(private fb: FormBuilder,
              private articleService: ArticleService,
              private matDialog: MatDialog,
              private tagService: TagService) {
  }

  ngOnInit(): void {
    this.articleService.getArticles('polish').subscribe(articles => {
      this.foundedArticles = articles;
    }, () => {
    });
    this.tagService.getTags('polish').subscribe(tags => {
      this.tags = tags;
    });
  }

  public searchArticles(): void {
    this.submitted = true;
    if (this.articleSearchForm.invalid && !this.isAnyTagSelected) {
      return;
    }
    let selectedTagNames = this.isAnyTagSelected ? this.selectedTags.map(tag => tag.name) : [];
    this.articleService.searchArticles(this.articleName?.value, selectedTagNames).subscribe(articles => {
      this.foundedArticles = articles;
      this.submitted = false;
    }, () => {});
  }

  public openSelectTagsModal(): void {
    this.matDialog.open(SelectTagsModalComponent, {id: 'selectTags'}).afterClosed().subscribe((selectedTagsIds: number[]) => {
      if (selectedTagsIds) {
        this.selectedTags = [];
        selectedTagsIds.forEach(id => {
          this.selectedTags.push(<Tag>this.tags.find(tag => tag.id == id));
        });
        if (this.selectedTags.length) {
          this.isAnyTagSelected = true;
        }
      }
    }, () => {});
  }

  public deleteSelectedTag(id: number): void {
    this.selectedTags = this.selectedTags.filter(tag => tag.id != id);
  }

  get articleName(): AbstractControl | null {
    return this.articleSearchForm.get('articleName');
  }

}
