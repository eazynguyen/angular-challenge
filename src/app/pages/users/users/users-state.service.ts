import { Injectable, OnDestroy } from '@angular/core';
import {
  BehaviorSubject,
  catchError,
  finalize,
  of,
  Subject,
  switchMap,
  takeUntil,
  tap,
  withLatestFrom,
} from 'rxjs';
import { IUser } from '../../../interfaces/user';
import { ILoadingStatus } from '../../../interfaces/loading-status';
import { UsersService } from '../../../services/users.service';
import { AlertService } from '../../../services/-alert.service';
import { PAGE_LIMIT } from '../../../utils/constant';
import { HttpErrorResponse } from '@angular/common/http';
import { IPagination } from '../../../interfaces/response';

@Injectable()
export class UsersStateService implements OnDestroy {
  private subject$ = new Subject();
  private state$ = new BehaviorSubject<UserState>({
    users: [],
    isLoading: ILoadingStatus.Idle,
    pagination: null as any,
  });

  vm$ = this.state$.asObservable();

  constructor(
    private usersService: UsersService,
    private alertService: AlertService
  ) {
    this.getUsers();
  }

  ngOnDestroy() {
    this.subject$.complete();
    this.state$.complete();
  }

  getUsers(page = '0') {
    of('')
      .pipe(
        takeUntil(this.subject$),
        tap(() => this.patchState({ isLoading: ILoadingStatus.Pending })),
        switchMap(() =>
          this.usersService.getPagination(page, PAGE_LIMIT).pipe(
            tap((result) => {
              this.patchState({
                users: result.users,
                pagination: {
                  totalResult: result.total,
                  totalPage: Math.ceil(result.total / PAGE_LIMIT),
                  currentPage: Math.floor(+page / PAGE_LIMIT),
                },
              });
            }),
            finalize(() => this.patchState({ isLoading: ILoadingStatus.Done })),
            catchError((error: HttpErrorResponse) =>
              this.alertService.error(error.error.message || error.message)
            )
          )
        )
      )
      .subscribe();
  }

  patchState({ users, isLoading, pagination }: Partial<UserState>) {
    of('')
      .pipe(
        takeUntil(this.subject$),
        withLatestFrom(this.state$),
        tap(([, state]) => {
          this.state$.next({
            ...state,
            users: users || state.users,
            isLoading: isLoading || state.isLoading,
            pagination: pagination || state.pagination,
          });
        })
      )
      .subscribe();
  }
}

interface UserState {
  users: IUser[];
  isLoading: ILoadingStatus;
  pagination: IPagination;
}
