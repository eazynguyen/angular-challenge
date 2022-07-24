import {Injectable} from '@angular/core';
import {BaseService} from "./-base.service";
import {IUser, IUserResponse} from "../interfaces/user";
import {HttpClient} from "@angular/common/http";
import {Params} from "@angular/router";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UsersService extends BaseService<IUserResponse, IUser>{

  constructor(http: HttpClient,) {
    super(http, 'users')
  }

  searchUsers(params: Params): Observable<IUserResponse> {
    return this.http.get<IUserResponse>(`${this.url}/users/search`, { params });
  }
}
