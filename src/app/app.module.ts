import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {RouterModule} from '@angular/router';

import {AppComponent} from './app.component';
import {HomePageComponent} from './components/pages/home-page/home-page.component';
import {ROUTES} from "./consts/routes.const";
import {NavigationBarComponent} from './components/elements/navigation-bar/navigation-bar.component';
import {SliderComponent} from './components/pages/home-page/slider/slider.component';
import {FactsComponent} from './components/pages/home-page/facts/facts.component';
import {PopularArticlesComponent} from './components/pages/home-page/popular-articles/popular-articles.component';
import {UsersRankingComponent} from './components/pages/home-page/users-ranking/users-ranking.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatButtonToggleModule} from "@angular/material/button-toggle";
import {CmsPageComponent} from './components/pages/cms-page/cms-page.component';
import {LoginModalComponent} from './components/elements/navigation-bar/login-modal/login-modal.component';
import {MatDialogModule} from "@angular/material/dialog";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {HttpClientModule} from "@angular/common/http";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {AlertComponent} from './components/elements/alert/alert.component';
import {RegisterModalComponent} from './components/elements/navigation-bar/register-modal/register-modal.component';
import {ReactiveFormsModule} from "@angular/forms";
import { ArticlePageComponent } from './components/pages/article-page/article-page.component';
import { ArticleListPageComponent } from './components/pages/article-list-page/article-list-page.component';
import { UserListPageComponent } from './components/pages/user-list-page/user-list-page.component';
import { UserProfilePageComponent } from './components/pages/user-profile-page/user-profile-page.component';
import { CommentComponent } from './components/elements/comment/comment.component';

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    NavigationBarComponent,
    SliderComponent,
    FactsComponent,
    PopularArticlesComponent,
    UsersRankingComponent,
    CmsPageComponent,
    LoginModalComponent,
    AlertComponent,
    RegisterModalComponent,
    ArticlePageComponent,
    ArticleListPageComponent,
    UserListPageComponent,
    UserProfilePageComponent,
    CommentComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(ROUTES),
    BrowserAnimationsModule,
    MatSidenavModule,
    MatButtonToggleModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSnackBarModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
