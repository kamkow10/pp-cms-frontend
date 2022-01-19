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
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {AlertComponent} from './components/elements/alert/alert.component';
import {RegisterModalComponent} from './components/elements/navigation-bar/register-modal/register-modal.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { ArticlePageComponent } from './components/pages/article-page/article-page.component';
import { ArticleListPageComponent } from './components/pages/article-list-page/article-list-page.component';
import { UserListPageComponent } from './components/pages/user-list-page/user-list-page.component';
import { UserProfilePageComponent } from './components/pages/user-profile-page/user-profile-page.component';
import { CommentComponent } from './components/elements/comment/comment.component';
import { UserSettingsModalComponent } from './components/pages/user-profile-page/user-settings-modal/user-settings-modal.component';
import {BasicAuthInterceptor} from "./interceptors/basic-auth.interceptor";
import { DeleteCommentDialogComponent } from './components/elements/comment/delete-comment-dialog/delete-comment-dialog.component';
import { SelectTagsModalComponent } from './components/pages/article-list-page/select-tags-modal/select-tags-modal.component';
import {MatCheckboxModule} from "@angular/material/checkbox";

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
    UserSettingsModalComponent,
    DeleteCommentDialogComponent,
    SelectTagsModalComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(ROUTES, {
      scrollPositionRestoration: 'top'
    }),
    BrowserAnimationsModule,
    MatSidenavModule,
    MatButtonToggleModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSnackBarModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatCheckboxModule,
    FormsModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: BasicAuthInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
