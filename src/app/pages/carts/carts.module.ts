import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CartsRoutingModule } from './carts-routing.module';
import { CartsComponent } from './carts/carts.component';
import { CartDetailComponent } from './cart-detail/cart-detail.component';
import { CartAddComponent } from './cart-add/cart-add.component';
import {SharedModule} from "../../modules/shared/shared.module";
import {TuiLinkModule} from "@taiga-ui/core";
import {TuiPaginationModule} from "@taiga-ui/kit";


@NgModule({
  declarations: [
    CartsComponent,
    CartDetailComponent,
    CartAddComponent
  ],
  imports: [
    CommonModule,
    CartsRoutingModule,
    SharedModule,
    TuiLinkModule,
    TuiPaginationModule
  ]
})
export class CartsModule { }
