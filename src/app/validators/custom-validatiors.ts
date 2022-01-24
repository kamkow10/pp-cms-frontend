import {AbstractControl, ValidationErrors, ValidatorFn} from "@angular/forms";

export function confirmValidator(originalControlName: string): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    return control.parent?.get(originalControlName)?.value == control.value ?
      null : {confirm: true};
  };
}
