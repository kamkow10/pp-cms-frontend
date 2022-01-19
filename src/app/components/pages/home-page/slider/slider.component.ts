import {Component, Input, OnInit} from '@angular/core';
import {Article} from "../../../../models/article";

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss']
})
export class SliderComponent implements OnInit {
  @Input() public latestArticles: Article[] = [];

  constructor() {
  }

  ngOnInit(): void {
  }

}
