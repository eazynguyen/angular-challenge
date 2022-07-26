import { Injectable } from '@angular/core';
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CancelService {
  private cancelRequests$ = new Subject<void>();

  constructor() { }

  onHttpCancelRequests (){
    return this.cancelRequests$.asObservable();
  }

  httpCancelRequestNext(){
    this.cancelRequests$.next();
  }
}
