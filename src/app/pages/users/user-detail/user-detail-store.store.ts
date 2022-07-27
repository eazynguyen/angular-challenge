import { Injectable } from '@angular/core';
import { ComponentStore, tapResponse } from '@ngrx/component-store';
import { IUser } from '../../../interfaces/user';
import { ILoadingStatus } from '../../../interfaces/loading-status';
import { ActivatedRoute } from '@angular/router';
import { finalize, map, switchMap } from 'rxjs';
import { UsersService } from '../../../services/users.service';
import { AlertService } from '../../../services/-alert.service';
import { HttpErrorResponse } from '@angular/common/http';

export interface UserDetailStoreState {
  user: IUser;
  isLoading: ILoadingStatus;
}

const initialState: UserDetailStoreState = {
  user: null as any,
  isLoading: ILoadingStatus.Idle,
};

@Injectable()
export class UserDetailStoreStore extends ComponentStore<UserDetailStoreState> {
  constructor(
    private route: ActivatedRoute,
    private usersService: UsersService,
    private alertService: AlertService
  ) {
    super(initialState);

    this.getUser(this.route.params.pipe(map(({ id }) => +id)));
  }

  getUser = this.effect<number>((action$) =>
    action$.pipe(
      switchMap((id) =>
        this.usersService.getOne(id).pipe(
          finalize(() => this.patchState({ isLoading: ILoadingStatus.Done })),
          tapResponse(
            (result) => {
              this.patchState({ user: result as IUser });
            },
            (error: HttpErrorResponse) => {
              this.alertService.error(error.error.message || error.message);
            }
          )
        )
      )
    )
  );
}
