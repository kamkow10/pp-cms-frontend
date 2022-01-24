import {Component, Inject, OnInit} from '@angular/core';
import {AbstractControl, FormArray, FormBuilder, FormControl} from "@angular/forms";
import {Language} from "../../../../../models/language";
import {TranslationService} from "../../../../../services/translation/translation.service";
import {Tag} from "../../../../../models/tag";
import {TagService} from "../../../../../services/tag/tag.service";
import {ArticleService} from "../../../../../services/article/article.service";
import {CreateArticleData} from "../../../../../models/createArticleData";
import {ERROR_OK} from "../../../../../consts/error.const";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {Article} from "../../../../../models/article";

@Component({
  selector: 'app-create-article-modal',
  templateUrl: './create-article-modal.component.html',
  styleUrls: ['./create-article-modal.component.scss']
})
export class CreateArticleModalComponent implements OnInit {
  public createArticleForm = this.fb.group({
    'title': [''],
    'language': ['english'],
    'tags': new FormArray([]),
    'content': ['']
  })
  public languages: Language[];
  public languageTags: Tag[];
  public showMessageServerError = false;
  public formValid = false;

  public editMode = false;
  public editingArticle: Article;

  constructor(private fb: FormBuilder,
              private translationService: TranslationService,
              private tagService: TagService,
              private articleService: ArticleService,
              @Inject(MAT_DIALOG_DATA) public data: {editingArticleId: number}) {
    this.editMode = this.data != null;
  }

  async ngOnInit(): Promise<void> {
    this.createArticleForm.valueChanges.subscribe(() => {
      this.formValid =
        this.title?.value.length &&
        this.tags?.controls.some(control => control.value) &&
        this.content?.value.length;
    })
    if (!this.editMode) {
      this.translationService.getLanguages().subscribe(languages => {
        this.languages = languages;
        this.language?.setValue(this.languages[0].name);
        this.loadTagsForLanguage();
      });
    } else {
      this.languages = await this.translationService.getLanguages().toPromise();
      this.editingArticle = await this.articleService.getArticleById(this.data.editingArticleId).toPromise();
      this.title?.setValue(this.editingArticle.title);
      this.language?.setValue(this.editingArticle.language.name);
      await this.loadTagsForEditingArticle();
      this.content?.setValue(this.editingArticle.content);
    }
  }

  public createArticle(): void {
    const createArticleData = new CreateArticleData(
      this.title?.value,
      this.language?.value,
      this.getSelectedTags(),
      this.content?.value,
      'no image'
    );
    this.articleService.createArticle(createArticleData).subscribe(response => {
      if (response.error != ERROR_OK) {
        this.showMessageServerError = true;
      } else {
        window.location.href = 'cms/myArticles';
      }
    }, () => {
      this.showMessageServerError = true;
    })
  }

  public editArticle(): void {
    const editArticleData = new CreateArticleData(
      this.title?.value,
      this.language?.value,
      this.getSelectedTags(),
      this.content?.value,
      'no image',
      this.editingArticle.id
    );
    this.articleService.editArticle(editArticleData).subscribe(response => {
      if (response.error != ERROR_OK) {
        this.showMessageServerError = true;
      } else {
        window.location.href = 'cms/myArticles';
      }
    }, () => {
      this.showMessageServerError = true;
    })
  }

  public loadTagsForLanguage(): void {
    this.tagService.getTags(this.language?.value).subscribe(tags => {
      this.languageTags = tags;
      while (this.tags?.length !== 0) {
        this.tags?.removeAt(0)
      }
      this.languageTags.forEach(() => {
        this.tags?.push(new FormControl(false));
      })
    });
  }

  public async loadTagsForEditingArticle(): Promise<void> {
    this.languageTags = await this.tagService.getTags(this.language?.value).toPromise();
    while (this.tags?.length !== 0) {
      this.tags?.removeAt(0)
    }
    this.languageTags.forEach((tag, i) => {
      const isTagSelected = this.editingArticle.articleTags.some(editTag => editTag.id == tag.id);
      this.tags?.push(new FormControl(isTagSelected));
    })
  }

  public getSelectedTags(): {name: string}[] {
    return this.languageTags.filter((tag, i) => {
      return this.tags?.controls[i].value;
    }).map(tag => {
      return {
        name: tag.name
      }
    });
  }

  get title(): AbstractControl | null {
    return this.createArticleForm.get('title');
  }

  get language(): AbstractControl | null {
    return this.createArticleForm.get('language');
  }

  get tags(): FormArray | null {
    return this.createArticleForm.get('tags') as FormArray;
  }

  get content(): AbstractControl | null {
    return this.createArticleForm.get('content');
  }

}
