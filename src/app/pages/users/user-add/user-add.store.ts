import { Injectable } from '@angular/core';
import { ComponentStore, tapResponse } from '@ngrx/component-store';
import { TuiCountryIsoCode } from '@taiga-ui/i18n';
import { IUser } from '../../../interfaces/user';
import { UsersService } from '../../../services/users.service';
import { ILoadingStatus } from '../../../interfaces/loading-status';
import { finalize, map, of, switchMap, tap, withLatestFrom } from 'rxjs';
import { AlertService } from '../../../services/-alert.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';

export interface UserAddState {
  user: IUser;
  genders: string[];
  countries: readonly TuiCountryIsoCode[];
  countryIsoCode: TuiCountryIsoCode;
  isLoading: ILoadingStatus;
}

const initialState: UserAddState = {
  user: null as any,
  genders: ['male', 'female'],
  countries: [TuiCountryIsoCode.VN, TuiCountryIsoCode.US],
  countryIsoCode: TuiCountryIsoCode.VN,
  isLoading: ILoadingStatus.Idle,
};

@Injectable()
export class UserAddStore extends ComponentStore<UserAddState> {
  constructor(
    private usersService: UsersService,
    private alertService: AlertService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    super(initialState);

    this.getUser(this.route.params.pipe(map(({ id }) => `${id || ''}`)));
  }

  readonly user$ = this.select((s) => s.user);

  readonly getUser = this.effect<string>((action$) =>
    action$.pipe(
      switchMap((id) => {
        if (!id) return of('');

        return this.usersService.getOne(+id).pipe(
          tapResponse(
            (result) => {
              this.patchState({ user: result });
            },
            (error: HttpErrorResponse) => {
              this.alertService
                .error(error.error.message || error.message)
                .subscribe();
            }
          )
        );
      })
    )
  );

  readonly creteOrUpdateUser = this.effect<IUser>((action$) =>
    action$.pipe(
      tap(() => this.patchState({ isLoading: ILoadingStatus.Pending })),
      withLatestFrom(this.route.params),
      switchMap(([body, { id }]) => {
        if (!id) {
          return this.usersService.create(body).pipe(
            finalize(() => this.patchState({ isLoading: ILoadingStatus.Done })),
            tapResponse(
              () => {
                this.router.navigate(['/users']).then(() => {
                  this.alertService
                    .success('Create user successfully!')
                    .subscribe();
                });
              },
              (error: HttpErrorResponse) => {
                this.alertService
                  .error(error.error.message || error.message)
                  .subscribe();
              }
            )
          );
        } else {
          return this.usersService.update(body, +id).pipe(
            finalize(() => this.patchState({ isLoading: ILoadingStatus.Done })),
            tapResponse(
              () => {
                this.router.navigate(['/users']).then(() => {
                  this.alertService
                    .success('Update user successfully!')
                    .subscribe();
                });
              },
              (error: HttpErrorResponse) => {
                this.alertService
                  .error(error.error.message || error.message)
                  .subscribe();
              }
            )
          );
        }
      })
    )
  );
}
