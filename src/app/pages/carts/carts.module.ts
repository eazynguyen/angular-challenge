import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CartsRoutingModule } from './carts-routing.module';
import { CartsComponent } from './carts/carts.component';
import { CartDetailComponent } from './cart-detail/cart-detail.component';
import { CartAddComponent } from './cart-add/cart-add.component';
import {SharedModule} from "../../modules/shared/shared.module";
import {TuiButtonModule, TuiLinkModule, TuiTextfieldControllerModule} from "@taiga-ui/core";
import {TuiInputModule, TuiPaginationModule} from "@taiga-ui/kit";


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
    TuiPaginationModule,
    TuiInputModule,
    TuiTextfieldControllerModule,
    TuiButtonModule
  ]
})
export class CartsModule { }
