import { Component, OnInit } from '@angular/core';
import {Article} from "../../../../models/article";
import {ArticleService} from "../../../../services/article/article.service";
import {MatDialog} from "@angular/material/dialog";
import {CreateArticleModalComponent} from "../cms-my-articles/create-article-modal/create-article-modal.component";

@Component({
  selector: 'app-cms-articles',
  templateUrl: './cms-articles.component.html',
  styleUrls: ['./cms-articles.component.scss']
})
export class CmsArticlesComponent implements OnInit {
  public unpublishedArticles: Article[];
  public unpublishedArticlesDisplayedColumns = ['id', 'title', 'author', 'language'];

  public publishedArticles: Article[];
  public publishArticlesDisplayedColumns = ['id', 'title', 'author', 'publishDate', 'language', 'views'];

  constructor(private articleService: ArticleService,
              private matDialog: MatDialog) {
  }

  ngOnInit(): void {
    this.articleService.getAllArticles().subscribe((articles: Article[]) => {
      this.unpublishedArticles = articles.filter(article => !(article.published == 'PUBLISHED'));
      this.publishedArticles = articles.filter(article => article.published == 'PUBLISHED');
    }, () => {});
  }

  public editArticle(id: number): void {
    this.matDialog.open(CreateArticleModalComponent, {width: '50%', data: {editingArticleId: id}}).afterClosed().subscribe(() => {
      this.ngOnInit();
    });
  }

  public deleteArticle(id: number): void {
    this.articleService.deleteArticle(id).subscribe(() => {
      this.ngOnInit();
    })
  }

  public publishArticle(id: number): void {
    this.articleService.changeArticlePublishStatus(id, 'PUBLISHED').subscribe(() => {
      this.ngOnInit();
    })
  }

  public unpublishArticle(id: number): void {
    this.articleService.changeArticlePublishStatus(id, 'UNPUBLISHED').subscribe(() => {
      this.ngOnInit();
    })
  }

}
