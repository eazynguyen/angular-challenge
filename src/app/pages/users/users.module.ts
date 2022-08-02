import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { UsersComponent } from './users/users.component';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { UserAddComponent } from './user-add/user-add.component';
import { SharedModule } from '../../modules/shared/shared.module';
import {
  TuiButtonModule,
  TuiFormatNumberPipeModule,
  TuiFormatPhonePipeModule,
  TuiLinkModule,
  TuiTextfieldControllerModule,
} from '@taiga-ui/core';
import {
  TuiDataListWrapperModule,
  TuiFieldErrorModule,
  TuiInputDateModule,
  TuiInputModule,
  TuiInputNumberModule,
  TuiInputPhoneInternationalModule,
  TuiPaginationModule,
  TuiSelectModule,
} from '@taiga-ui/kit';
import { TuiAutoFocusModule } from '@taiga-ui/cdk';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserDeleteComponent } from './user-delete/user-delete.component';

@NgModule({
  declarations: [UsersComponent, UserDetailComponent, UserAddComponent, UserDeleteComponent],
  imports: [
    CommonModule,
    UsersRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    TuiLinkModule,
    TuiFormatPhonePipeModule,
    TuiInputModule,
    TuiTextfieldControllerModule,
    TuiAutoFocusModule,
    TuiButtonModule,
    TuiFormatNumberPipeModule,
    TuiPaginationModule,
    TuiFieldErrorModule,
    TuiInputNumberModule,
    TuiSelectModule,
    TuiDataListWrapperModule,
    TuiInputPhoneInternationalModule,
    TuiInputDateModule,
  ],
})
export class UsersModule {}
