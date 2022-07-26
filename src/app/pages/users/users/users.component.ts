import {ChangeDetectionStrategy, Component, OnDestroy, OnInit} from '@angular/core';
import {UsersStateService} from './users-state.service';
import {FormControl} from '@angular/forms';
import {PAGE_LIMIT} from "../../../utils/constant";
import {debounceTime} from "rxjs";
import {UserListStore} from "./users-store.store";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [ UserListStore],
})
export class UsersComponent implements OnInit, OnDestroy {
  vm$ = this.userListStore.vm$;
  searchUser = new FormControl('');

  constructor(private userListStore: UserListStore
) {}

  ngOnInit(): void {
    this.vm$.subscribe(res => {
      console.log(res)
    })

    this.userListStore.searchUsers(this.searchUser.valueChanges);
  }

  ngOnDestroy() {}

  goToPage(index: number): void {
    this.userListStore.patchState({skip: `${index * PAGE_LIMIT}`})
  }
}
