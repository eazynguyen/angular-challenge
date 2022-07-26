import {Injectable, OnDestroy} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {UsersService} from '../../../services/users.service';
import {IUser} from '../../../interfaces/user';
import {ILoadingStatus} from '../../../interfaces/loading-status';
import {BehaviorSubject, catchError, finalize, of, Subject, switchMap, takeUntil, tap, withLatestFrom,} from 'rxjs';
import {AlertService} from '../../../services/-alert.service';
import {HttpErrorResponse} from '@angular/common/http';

@Injectable()
export class UserDetailService implements OnDestroy {
  private subject$ = new Subject();
  private state$ = new BehaviorSubject<UserState>({
    user: null as any,
    isLoading: ILoadingStatus.Idle,
  });

  vm$ = this.state$.asObservable();

  constructor(
    private route: ActivatedRoute,
    private usersService: UsersService,
    private alertService: AlertService
  ) {
    this.route.params.pipe(
      tap(()=> this.patchState({isLoading: ILoadingStatus.Pending})),
      switchMap(({id}) => this.getUser(+id))
    ).subscribe();
  }

  ngOnDestroy() {
    this.state$.complete();
    this.subject$.complete();
  }

  private getUser(id: number) {
    return this.usersService.getOne(id).pipe(
      tap((user) => {
        this.patchState({ user });
      }),
      finalize(() => this.patchState({ isLoading: ILoadingStatus.Done })),
      catchError((error: HttpErrorResponse) =>
        this.alertService.error(error.error.message || error.message)
      )
    );
  }

  patchState({ user, isLoading }: Partial<UserState>) {
    of('')
      .pipe(
        takeUntil(this.subject$),
        withLatestFrom(this.state$),
        tap(([, state]) => {
          this.state$.next({
            ...state,
            user: user || state.user,
            isLoading: isLoading || state.isLoading,
          });
        })
      )
      .subscribe();
  }
}

interface UserState {
  user: IUser;
  isLoading: ILoadingStatus;
}
