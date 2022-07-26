import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import {Observable, takeUntil} from 'rxjs';
import {CancelService} from "../services/cancel.service";
import {ActivatedRoute, ActivationEnd, Router} from "@angular/router";

@Injectable()
export class ManagerInterceptor implements HttpInterceptor {

  constructor(private cancelService: CancelService, private router: Router) {
    router.events.subscribe(event => {
      if(event instanceof  ActivationEnd) {
        this.cancelService.httpCancelRequestNext();
      }
    })
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(takeUntil(this.cancelService.onHttpCancelRequests()));
  }
}
