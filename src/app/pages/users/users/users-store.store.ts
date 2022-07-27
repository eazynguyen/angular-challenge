import {IUser} from '../../../interfaces/user';
import {ILoadingStatus} from '../../../interfaces/loading-status';
import {Injectable} from '@angular/core';
import {ComponentStore, tapResponse} from '@ngrx/component-store';
import {IPagination} from '../../../interfaces/response';
import {combineLatest, finalize, switchMap, tap,} from 'rxjs';
import {UsersService} from '../../../services/users.service';
import {PAGE_LIMIT} from '../../../utils/constant';
import {AlertService} from '../../../services/-alert.service';
import {HttpErrorResponse} from '@angular/common/http';

export interface UsersListState {
  users: IUser[];
  isLoading: ILoadingStatus;
  pagination: IPagination;
  skip: string;
  query: string;
}

const init: UsersListState = {
  isLoading: ILoadingStatus.Idle,
  users: [],
  pagination: null as any,
  skip: '0',
  query: '',
};

@Injectable()
export class UserListStore extends ComponentStore<UsersListState> {
  constructor(
    private usersService: UsersService,
    private alertService: AlertService
  ) {
    super(init);

    this.getUsers(
      combineLatest([this.select((s) => s.skip), this.select((s) => s.query)])
    );
  }

  readonly setQuery = this.updater((state, query: string) => ({
    ...state,
    query: query,
  }));

  readonly getUsers = this.effect<[string, string]>((action$) =>
    action$.pipe(
      tap(() => this.patchState({isLoading: ILoadingStatus.Pending})),
      switchMap(([skip, query]) => {
        if (!query) {
          return this.usersService.getPagination(skip, PAGE_LIMIT).pipe(
            finalize(() => this.patchState({isLoading: ILoadingStatus.Done})),
            tapResponse(
              (result) => {
                this.patchState({
                  users: result.users,
                  pagination: {
                    totalResult: result.total,
                    totalPage: Math.ceil(result.total / PAGE_LIMIT),
                    currentPage: Math.floor(+skip / PAGE_LIMIT),
                  },
                });
              },
              (error: HttpErrorResponse) => {
                this.alertService.error(error.message).subscribe();
              }
            )
          );
        } else {
          return this.usersService
            .searchUsers({ q: query, skip: skip, limit: PAGE_LIMIT })
            .pipe(
              finalize(() => this.patchState({isLoading: ILoadingStatus.Done})),
              tapResponse(
                (result) => {
                  this.patchState({
                    users: result.users,
                    pagination: {
                      totalResult: result.total,
                      totalPage: Math.ceil(result.total / PAGE_LIMIT),
                      currentPage: Math.floor(+skip / PAGE_LIMIT),
                    },
                  });
                },
                (error: HttpErrorResponse) => {
                  this.alertService.error(error.message).subscribe();
                }
              )
            );
        }
      })
    )
  );
}
