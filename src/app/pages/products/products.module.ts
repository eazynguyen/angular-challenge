import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ProductsRoutingModule} from './products-routing.module';
import {ProductsComponent} from './products/products.component';
import {ProductDetailComponent} from './product-detail/product-detail.component';
import {ProductAddComponent} from './product-add/product-add.component';
import {SharedModule} from "../../modules/shared/shared.module";
import {
  TuiButtonModule,
  TuiFormatNumberPipeModule,
  TuiLinkModule,
  TuiLoaderModule,
  TuiTextfieldControllerModule
} from "@taiga-ui/core";
import {TuiCurrencyPipeModule} from "@taiga-ui/addon-commerce";
import {
  TuiDataListWrapperModule,
  TuiFieldErrorModule,
  TuiInputModule,
  TuiInputNumberModule,
  TuiInputSliderModule,
  TuiPaginationModule,
  TuiSelectModule
} from "@taiga-ui/kit";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {TuiAutoFocusModule, TuiLetModule} from "@taiga-ui/cdk";
import {TuiEditorNewModule} from "@taiga-ui/addon-editor";
import {ProductDeleteComponent} from './product-delete/product-delete.component';


@NgModule({
  declarations: [
    ProductsComponent,
    ProductDetailComponent,
    ProductAddComponent,
    ProductDeleteComponent
  ],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    SharedModule,
    TuiLinkModule,
    TuiCurrencyPipeModule,
    TuiFormatNumberPipeModule,
    TuiInputModule,
    ReactiveFormsModule,
    TuiTextfieldControllerModule,
    TuiAutoFocusModule,
    TuiButtonModule,
    TuiFieldErrorModule,
    TuiInputNumberModule,
    TuiSelectModule,
    TuiEditorNewModule,
    TuiLetModule,
    TuiLoaderModule,
    TuiInputSliderModule,
    TuiPaginationModule,
    FormsModule,
    TuiDataListWrapperModule,
  ]
})
export class ProductsModule { }
