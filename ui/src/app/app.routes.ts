import { Routes } from '@angular/router';
import { PageNotFoundComponent } from "./components/page-not-found/page-not-found.component";
import {
  UserListContainerComponent
} from "./modules/users/components/user-list-container/user-list-container.component";
import { HistoryComponent } from "./modules/history/history.component";

export const routes: Routes = [
  { path: 'users', component: UserListContainerComponent },
  { path: 'history', component: HistoryComponent },
  { path: '', redirectTo: '/users', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent }
];
