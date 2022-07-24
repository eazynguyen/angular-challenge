import {Component, OnDestroy, OnInit} from '@angular/core';
import {UsersStateService} from './users-state.service';
import {FormControl} from "@angular/forms";
import {UsersService} from "../../../services/users.service";
import {debounceTime} from "rxjs";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
  providers: [UsersStateService],
})
export class UsersComponent implements OnInit, OnDestroy {
  vm$ = this.usersStateService.vm$;
  searchUser = new FormControl('');

  constructor(private usersStateService: UsersStateService) {}

  ngOnInit(): void {
    this.getUsers();


  }

  ngOnDestroy() {}

  getUsers() {
    this.usersStateService.getUsers();
  }
}
