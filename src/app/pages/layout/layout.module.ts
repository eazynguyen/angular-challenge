import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LayoutRoutingModule } from './layout-routing.module';
import { LayoutComponent } from './layout.component';
import {SideBarComponent} from "../../components/side-bar/side-bar.component";
import {HeaderBarComponent} from "../../components/header-bar/header-bar.component";


@NgModule({
  declarations: [
    LayoutComponent,
    SideBarComponent,
    HeaderBarComponent
  ],
  imports: [
    CommonModule,
    LayoutRoutingModule
  ]
})
export class LayoutModule { }
