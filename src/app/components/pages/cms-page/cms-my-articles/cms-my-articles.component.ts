import {Component, OnInit} from '@angular/core';
import {Article} from "../../../../models/article";
import {ArticleService} from "../../../../services/article/article.service";
import {MatDialog} from "@angular/material/dialog";
import {CreateArticleModalComponent} from "./create-article-modal/create-article-modal.component";

@Component({
  selector: 'app-cms-my-articles',
  templateUrl: './cms-my-articles.component.html',
  styleUrls: ['./cms-my-articles.component.scss']
})
export class CmsMyArticlesComponent implements OnInit {
  public unpublishedArticles: Article[];
  public unpublishedArticlesDisplayedColumns = ['id', 'title', 'language'];

  public publishedArticles: Article[];
  public publishArticlesDisplayedColumns = ['id', 'title', 'publishDate', 'language', 'views'];

  constructor(private articleService: ArticleService,
              private matDialog: MatDialog) {
  }

  ngOnInit(): void {
    this.articleService.getUserArticles().subscribe((articles: Article[]) => {
      this.unpublishedArticles = articles.filter(article => !(article.published == 'PUBLISHED'));
      this.publishedArticles = articles.filter(article => article.published == 'PUBLISHED');
    }, () => {});
  }

  public openCreateArticleModal(): void {
    this.matDialog.open(CreateArticleModalComponent, {width: '50%'});
  }

}
