import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { funcFormRequired, funcValidateForm } from '../../../utils/functions';

@Component({
  selector: 'app-user-add',
  templateUrl: './user-add.component.html',
  styleUrls: ['./user-add.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserAddComponent implements OnInit {
  formUser: FormGroup = null as any;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.initForm();
  }

  private initForm() {
    this.formUser = this.fb.group({
      firstName: [null, [funcFormRequired('First name is required!')]],
      lastName: [null, [funcFormRequired('Last name is required!')]],
      maidenName: [null, [funcFormRequired('Maiden name is required!')]],
      age: [null, [funcFormRequired('Age is required!')]],
      gender: [null, [funcFormRequired('Gender is required')]],
      email: [null, [funcFormRequired('Email is required')]],
      phone: [null, [funcFormRequired('Phone is required!')]],
    });
  }

  onSubmit() {
    if (this.formUser.valid) {
    } else {
      funcValidateForm(this.formUser);
    }
  }
}
