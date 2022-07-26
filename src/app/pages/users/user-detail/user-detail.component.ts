import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { UserDetailService } from './user-detail.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [UserDetailService],
})
export class UserDetailComponent implements OnInit {
  vm$ = this.userDetailService.vm$;

  constructor(private userDetailService: UserDetailService) {}

  ngOnInit(): void {}
}
