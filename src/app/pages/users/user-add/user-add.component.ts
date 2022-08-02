import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { funcFormRequired, funcValidateForm } from '../../../utils/functions';
import { TuiDay } from '@taiga-ui/cdk';
import { UserAddStore } from './user-add.store';

@Component({
  selector: 'app-user-add',
  templateUrl: './user-add.component.html',
  styleUrls: ['./user-add.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [UserAddStore],
})
export class UserAddComponent implements OnInit {
  formUser: FormGroup = null as any;

  vm$ = this.userAddStore.state$;

  constructor(private fb: FormBuilder, private userAddStore: UserAddStore) {}

  ngOnInit(): void {
    this.initForm();

    this.userAddStore.user$.subscribe((user) => {
      if (user) {
        this.formUser.patchValue(user);
      }
    });
  }

  private initForm() {
    this.formUser = this.fb.group({
      firstName: ['Nguyen', [funcFormRequired('First name is required!')]],
      lastName: ['Cam', [funcFormRequired('Last name is required!')]],
      maidenName: ['Van', [funcFormRequired('Maiden name is required!')]],
      age: [33, [funcFormRequired('Age is required!')]],
      gender: ['male', [funcFormRequired('Gender is required')]],
      email: [
        'camnv@rikkeisoft.com',
        [funcFormRequired('Email is required'), Validators.email],
      ],
      phone: ['813201089', [funcFormRequired('Phone is required!')]],
      birthDate: [new TuiDay(1989, 10, 20)],
    });
  }

  onSubmit() {
    if (this.formUser.valid) {
      this.userAddStore.creteOrUpdateUser(this.formUser.getRawValue());
    } else {
      funcValidateForm(this.formUser);
    }
  }
}
