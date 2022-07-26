import {ChangeDetectionStrategy, Component, OnDestroy, OnInit} from '@angular/core';
import {UsersStateService} from './users-state.service';
import {FormControl} from '@angular/forms';
import {PAGE_LIMIT} from "../../../utils/constant";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [UsersStateService],
})
export class UsersComponent implements OnInit, OnDestroy {
  vm$ = this.usersStateService.vm$;
  searchUser = new FormControl('');

  constructor(private usersStateService: UsersStateService) {}

  ngOnInit(): void {}

  ngOnDestroy() {}

  goToPage(index: number): void {
    this.usersStateService.getUsers(`${index * PAGE_LIMIT}`);
  }
}
