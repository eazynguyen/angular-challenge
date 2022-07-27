import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { PAGE_LIMIT, PAGE_SIZE } from '../../../utils/constant';
import { UserListStore } from './users-store.store';
import { debounceTime } from 'rxjs';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [UserListStore],
})
export class UsersComponent implements OnInit, OnDestroy {
  vm$ = this.userListStore.state$;
  searchUser = new FormControl('');
  pageSize = PAGE_LIMIT;

  constructor(private userListStore: UserListStore) {}

  ngOnInit(): void {
    this.userListStore.setQuery(
      this.searchUser.valueChanges.pipe(debounceTime(300))
    );
  }

  ngOnDestroy() {}

  goToPage(index: number): void {
    this.userListStore.patchState({ skip: `${index * PAGE_LIMIT}` });
  }
}
