import {ChangeDetectionStrategy, Component, OnDestroy, OnInit, ViewChild,} from '@angular/core';
import {FormControl} from '@angular/forms';
import {PAGE_LIMIT} from '../../../utils/constant';
import {UserListStore} from './users-store.store';
import {debounceTime} from 'rxjs';
import {AlertDirective} from "../../../directives/alert.directive";
import {IUser} from "../../../interfaces/user";
import {UserDeleteComponent} from "../user-delete/user-delete.component";
import {initializeApp} from '@firebase/app';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [UserListStore],
})
export class UsersComponent implements OnInit, OnDestroy {
  @ViewChild(AlertDirective) showAlert!: AlertDirective;
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

  deleteUser(user: IUser){
    const viewContainerRef = this.showAlert.viewContainerRef;
    viewContainerRef.clear();

    const componentRef = viewContainerRef.createComponent<UserDeleteComponent>(UserDeleteComponent);

    componentRef.instance
  }
}
