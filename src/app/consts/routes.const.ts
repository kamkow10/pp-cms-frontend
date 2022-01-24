import {Routes} from "@angular/router";
import {HomePageComponent} from "../components/pages/home-page/home-page.component";
import {ArticlePageComponent} from "../components/pages/article-page/article-page.component";
import {UserListPageComponent} from "../components/pages/user-list-page/user-list-page.component";
import {CmsPageComponent} from "../components/pages/cms-page/cms-page.component";
import {UserProfilePageComponent} from "../components/pages/user-profile-page/user-profile-page.component";
import {ArticleListPageComponent} from "../components/pages/article-list-page/article-list-page.component";

export const ROUTES: Routes = [
  {path: 'home', component: HomePageComponent},
  {path: 'cms', component: CmsPageComponent},
  {path: 'cms/:boardName', component: CmsPageComponent},
  {path: 'article/:id', component: ArticlePageComponent},
  {path: 'articles', component: ArticleListPageComponent},
  {path: 'users', component: UserListPageComponent},
  {path: 'user/:id', component: UserProfilePageComponent},
  {path: '**', redirectTo: 'home'}
];
