import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {UsersComponent} from "./users/users.component";
import {UserDetailComponent} from "./user-detail/user-detail.component";
import {UserAddComponent} from "./user-add/user-add.component";

const routes: Routes = [
  {
    path: '', component: UsersComponent
  },
  {
    path: 'detail/:id', component: UserDetailComponent
  },
  {
    path: 'update/:id', component: UserAddComponent
  },
  {
    path: 'create', component: UserAddComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
