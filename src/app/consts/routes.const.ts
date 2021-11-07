import {Routes} from "@angular/router";
import {HomePageComponent} from "../components/pages/home-page/home-page.component";

export const ROUTES: Routes = [
  {path: 'home', component: HomePageComponent},
  {path: '**', redirectTo: 'home'}
];
