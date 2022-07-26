import {IUser} from '../../../interfaces/user';
import {ILoadingStatus} from '../../../interfaces/loading-status';
import {Injectable} from '@angular/core';
import {ComponentStore, tapResponse} from '@ngrx/component-store';
import {IPagination} from '../../../interfaces/response';
import {Observable, switchMap, tap} from 'rxjs';
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

    this.getUsers(this.select((s) => s.skip));
    // this.searchUsers(this.select((s) => s.query));
  }

  vm$ = this.state$;

  readonly getUsers = this.effect((actions$: Observable<string>) =>
    actions$.pipe(
      switchMap((page) =>
        this.usersService.getPagination(page, PAGE_LIMIT).pipe(
          tapResponse(
            (result) => {
              this.patchState({
                users: result.users,
                pagination: {
                  totalResult: result.total,
                  totalPage: Math.ceil(result.total / PAGE_LIMIT),
                  currentPage: Math.floor(+page / PAGE_LIMIT),
                },
              });
            },
            (error: HttpErrorResponse) => {
              this.alertService.error(error.message).subscribe();
            }
          )
        )
      )
    )
  );

  readonly searchUsers = this.effect((query$: Observable<string>) =>
    query$.pipe(
      tap(() => this.patchState({ isLoading: ILoadingStatus.Pending})),
      switchMap((value) =>
        this.usersService.searchUsers({ q: value }).pipe(
          tapResponse(
            (result) => {
              this.patchState({
                users: result.users,
                isLoading: ILoadingStatus.Done,
                pagination: {
                  totalResult: result.total,
                  totalPage: Math.ceil(result.total / PAGE_LIMIT),
                  currentPage: 1,
                },
              });
            },
            (error: HttpErrorResponse) => {
              this.alertService.error(error.message).subscribe();
            }
          )
        )
      )
    )
  );
}
