import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartsComponent } from './carts/carts.component';
import { CartDetailComponent } from './cart-detail/cart-detail.component';
import { CartAddComponent } from './cart-add/cart-add.component';

const routes: Routes = [
  {
    path: '',
    component: CartsComponent,
  },
  {
    path: 'detail/:id',
    component: CartDetailComponent,
  },
  { path: 'create', component: CartAddComponent },
  { path: 'update/:id', component: CartDetailComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CartsRoutingModule {}
