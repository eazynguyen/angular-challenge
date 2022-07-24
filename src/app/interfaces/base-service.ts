import {Observable} from "rxjs";

export interface IBaseService<T, R>{
  getAll(): Observable<T>;

  getPagination(skip: string, limit: number): Observable<T>;

  getOne(id: number): Observable<R>;

  create(body: R): Observable<R>;

  update(body: R, id: number): Observable<R>;

  delete(id: number): Observable<R>;
}
