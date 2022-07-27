import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { UsersComponent } from './users/users.component';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { UserAddComponent } from './user-add/user-add.component';
import {SharedModule} from "../../modules/shared/shared.module";
import {
    TuiButtonModule,
    TuiFormatNumberPipeModule,
    TuiFormatPhonePipeModule,
    TuiLinkModule,
    TuiTextfieldControllerModule
} from "@taiga-ui/core";
import {TuiFieldErrorModule, TuiInputModule, TuiPaginationModule} from "@taiga-ui/kit";
import {TuiAutoFocusModule} from "@taiga-ui/cdk";
import {ReactiveFormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    UsersComponent,
    UserDetailComponent,
    UserAddComponent
  ],
  imports: [
    CommonModule,
    UsersRoutingModule,
    SharedModule,
    TuiLinkModule,
    TuiFormatPhonePipeModule,
    TuiInputModule,
    TuiTextfieldControllerModule,
    TuiAutoFocusModule,
    TuiButtonModule,
    ReactiveFormsModule,
    TuiFormatNumberPipeModule,
    TuiPaginationModule,
    TuiFieldErrorModule
  ],
})
export class UsersModule { }
