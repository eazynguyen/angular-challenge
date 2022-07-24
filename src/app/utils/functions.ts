import { AbstractControl, FormGroup, ValidationErrors } from '@angular/forms';
import { TuiValidationError } from '@taiga-ui/cdk';

export const funcValidateForm = (form: FormGroup) => {
  Object.values(form.controls).forEach((control: AbstractControl) => {
    if (control.invalid) {
      control.markAllAsTouched();
      control.updateValueAndValidity({ onlySelf: true });
    }
  });
};

export function funcFormRequired(
  message: string
): (control: AbstractControl) => ValidationErrors | null {
  return (control: AbstractControl): ValidationErrors | null =>
    control.value ? null : { required: new TuiValidationError(message) };
}
