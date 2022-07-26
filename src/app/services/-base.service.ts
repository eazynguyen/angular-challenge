import {Inject, Injectable} from '@angular/core';
import {IBaseService} from '../interfaces/base-service';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {delay, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BaseService<T, R> implements IBaseService<T, R> {
  url = environment.url;

  constructor(
    protected http: HttpClient,
    @Inject(String) private endPoint = '',
  ) {}

  create(body: R): Observable<R> {
    return this.http
      .post<R>(`${this.url}/${this.endPoint}/add`, body)
      .pipe(delay(400));
  }

  delete(id: number): Observable<R> {
    return this.http
      .delete<R>(`${this.url}/${this.endPoint}/${id}`)
      .pipe(delay(400));
  }

  getAll(): Observable<T> {
    return this.http.get<T>(`${this.url}/${this.endPoint}`).pipe(delay(400));
  }

  getOne(id: number): Observable<R> {
    return this.http.get<R>(`${this.url}/${this.endPoint}/${id}`).pipe(
      delay(400),
    );
  }

  update(body: R, id: number): Observable<R> {
    return this.http
      .put<R>(`${this.url}/${this.endPoint}/${id}`, body)
      .pipe(delay(400));
  }

  getPagination(skip: string, limit: number): Observable<T> {
    return this.http
      .get<T>(`${this.url}/${this.endPoint}`, { params: { skip, limit } })
      .pipe(delay(400));
  }
}
