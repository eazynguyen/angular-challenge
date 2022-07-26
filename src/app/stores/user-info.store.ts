import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';

export interface UserInfoState {
  token: string;
};

const initialState: UserInfoState = {
  token: `${localStorage.getItem('token') || ''}`
};

@Injectable({providedIn: 'root'})
export class UserInfoStore extends ComponentStore<UserInfoState> {
  constructor() {
    super(initialState);
  }

  token$ = this.select(s => s.token);
}
