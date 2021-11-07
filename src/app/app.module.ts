import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {RouterModule} from '@angular/router';

import {AppComponent} from './app.component';
import {HomePageComponent} from './components/pages/home-page/home-page.component';
import {ROUTES} from "./consts/routes.const";
import { NavigationBarComponent } from './components/parts/navigation-bar/navigation-bar.component';
import { SliderComponent } from './components/parts/slider/slider.component';
import { FactsComponent } from './components/parts/facts/facts.component';
import { PopularArticlesComponent } from './components/parts/popular-articles/popular-articles.component';
import { UsersRankingComponent } from './components/parts/users-ranking/users-ranking.component';

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    NavigationBarComponent,
    SliderComponent,
    FactsComponent,
    PopularArticlesComponent,
    UsersRankingComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(ROUTES)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
