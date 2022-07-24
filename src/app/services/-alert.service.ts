import { Inject, Injectable } from '@angular/core';
import { TuiAlertService, TuiNotification } from '@taiga-ui/core';

@Injectable({
  providedIn: 'root',
})
export class AlertService {
  constructor(
    @Inject(TuiAlertService)
    private readonly alertService: TuiAlertService
  ) {}

  success(str = '') {
    return this.alertService.open('', {
      label: str,
      status: TuiNotification.Success,
    });
  }

  error(str = '') {
    return this.alertService.open('', {
      label: str,
      status: TuiNotification.Error,
    });
  }
}
