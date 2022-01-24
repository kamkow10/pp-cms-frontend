import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-cms-page',
  templateUrl: './cms-page.component.html',
  styleUrls: ['./cms-page.component.scss']
})
export class CmsPageComponent implements OnInit {
  public selectedBoard = 'dashboard';

  constructor(private route: ActivatedRoute) {
    const boardNameInUrl = this.route.snapshot.params.boardName;
    if (boardNameInUrl) {
      this.selectedBoard = boardNameInUrl;
    }
  }

  ngOnInit(): void {
  }

}
