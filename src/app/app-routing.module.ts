import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guard/auth.guard';
import { GetUserResolver } from './resolver/get-user.resolver';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./pages/layout/layout.module').then((m) => m.LayoutModule),
    canActivate: [AuthGuard],
    resolve: [GetUserResolver],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
