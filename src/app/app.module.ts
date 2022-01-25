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
import {CredentialsInterceptor} from "./interceptors/credentials.interceptor";
import { DeleteCommentDialogComponent } from './components/elements/comment/delete-comment-dialog/delete-comment-dialog.component';
import { SelectTagsModalComponent } from './components/pages/article-list-page/select-tags-modal/select-tags-modal.component';
import {MatCheckboxModule} from "@angular/material/checkbox";
import { TranslatePipe } from './pipes/translate.pipe';
import {MatMenuModule} from "@angular/material/menu";
import { CmsMyArticlesComponent } from './components/pages/cms-page/cms-my-articles/cms-my-articles.component';
import { CmsArticlesComponent } from './components/pages/cms-page/cms-articles/cms-articles.component';
import { CmsUsersComponent } from './components/pages/cms-page/cms-users/cms-users.component';
import { CmsAdministrationUsersComponent } from './components/pages/cms-page/cms-administration-users/cms-administration-users.component';
import { CmsTagsComponent } from './components/pages/cms-page/cms-tags/cms-tags.component';
import { CmsLanguagesComponent } from './components/pages/cms-page/cms-languages/cms-languages.component';
import { CmsSecurityComponent } from './components/pages/cms-page/cms-security/cms-security.component';
import {MatTableModule} from "@angular/material/table";
import { CreateArticleModalComponent } from './components/pages/cms-page/cms-my-articles/create-article-modal/create-article-modal.component';
import {MatSelectModule} from "@angular/material/select";
import { EditUserModalComponent } from './components/pages/cms-page/cms-users/edit-user-modal/edit-user-modal.component';
import { CreateTagModalComponent } from './components/pages/cms-page/cms-tags/create-tag-modal/create-tag-modal.component';
import { CreateLanguageModalComponent } from './components/pages/cms-page/cms-languages/create-language-modal/create-language-modal.component';
import { CreateTranslationModalComponent } from './components/pages/cms-page/cms-languages/create-translation-modal/create-translation-modal.component';
import { AddTranslationForLanguageModalComponent } from './components/pages/cms-page/cms-languages/add-translation-for-language-modal/add-translation-for-language-modal.component';

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
    TranslatePipe,
    CmsMyArticlesComponent,
    CmsArticlesComponent,
    CmsUsersComponent,
    CmsAdministrationUsersComponent,
    CmsTagsComponent,
    CmsLanguagesComponent,
    CmsSecurityComponent,
    CreateArticleModalComponent,
    EditUserModalComponent,
    CreateTagModalComponent,
    CreateLanguageModalComponent,
    CreateTranslationModalComponent,
    AddTranslationForLanguageModalComponent,
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
        FormsModule,
        MatMenuModule,
        MatTableModule,
        MatSelectModule
    ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: CredentialsInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
