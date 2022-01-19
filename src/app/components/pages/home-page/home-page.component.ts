import {Component, OnInit} from '@angular/core';
import {ArticleService} from "../../../services/article/article.service";
import {UsersService} from "../../../services/users/users.service";
import {Article} from "../../../models/article";
import {UserData} from "../../../models/user-data";

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
  public articles: Article[];
  public topArticles: Article[];
  public users: UserData[];

  constructor(private articleService: ArticleService,
              private usersService: UsersService) {
  }

  ngOnInit(): void {
    this.articleService.getArticles('polish').subscribe(articles => {
      this.articles = articles;
    }, () => {});
    this.articleService.getTopArticles('polish', 3).subscribe(topArticles => {
      this.topArticles = topArticles;
    }, () => {});
    this.usersService.getUsers().subscribe(users => {
      this.users = users;
    }, () => {});
  }

}
