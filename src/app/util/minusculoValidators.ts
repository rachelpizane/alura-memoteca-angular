import { AbstractControl, ValidationErrors } from "@angular/forms";

export function minusculoValidator(control: AbstractControl): ValidationErrors | null {
  const value: string = control.value || '';

  if (value !== value.toLowerCase()) {
    return { minusculo: true };
  }

  return null;
}
