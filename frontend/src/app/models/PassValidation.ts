import { AbstractControl } from "@angular/forms";

export class PassValidation {
  static matchPassword(control: AbstractControl) {

    const password = control.get("password").value;
    const confirmPassword = control.get("password_confirmation").value;

    if (password !== confirmPassword) {
      let errors = control.get("password_confirmation").errors;

      if (errors && typeof errors === "object") {
        Object.assign(errors, {
          matchPassword: `Passwords don't match`,
        });
      } else {
        errors = {
          matchPassword: `Passwords don't match`,
        };
      }

      control.get("password_confirmation").setErrors(errors);

    } else {
      return null;
    }
  }
}
