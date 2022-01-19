import {Component, Input, OnInit} from '@angular/core';
import {Article} from "../../../../models/article";
import {UserData} from "../../../../models/user-data";

@Component({
  selector: 'app-facts',
  templateUrl: './facts.component.html',
  styleUrls: ['./facts.component.scss']
})
export class FactsComponent implements OnInit {
  @Input() public users: UserData[];
  @Input() public articles: Article[];

  constructor() {
  }

  ngOnInit(): void {
  }

  public getAllCommentsCount(): number {
    let commentsCounter = 0;
    this.articles.forEach(article => commentsCounter += article.comments.length);
    return commentsCounter;
  }

}
