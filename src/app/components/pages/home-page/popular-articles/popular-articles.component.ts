import {Component, Input, OnInit} from '@angular/core';
import {Article} from "../../../../models/article";

@Component({
  selector: 'app-popular-articles',
  templateUrl: './popular-articles.component.html',
  styleUrls: ['./popular-articles.component.scss']
})
export class PopularArticlesComponent implements OnInit {
  @Input() public topArticles: Article[];

  constructor() {
  }

  ngOnInit(): void {
  }

}
