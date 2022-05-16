import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { Router } from "@angular/router";
import { PassValidation } from "src/app/models/PassValidation";
import { AuthService } from "src/app/services/auth.service";

@Component({
  selector: "app-register",
  templateUrl: "./register.page.html",
  styleUrls: ["./register.page.scss", "../login/login.page.scss"],
})
export class RegisterPage implements OnInit {

  form: FormGroup;

  constructor(
    private auth: AuthService,
    private router: Router,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.form = this.fb.group(
      {
        email: ["", [Validators.required, Validators.email]],
        name: ["", Validators.required],
        username: ["", Validators.required],
        password: ["", Validators.required],
        password_confirmation: ["", Validators.required],
      },
      {
        validator: [PassValidation.matchPassword],
      }
    );
  }

  register() {
    const user = { ...this.form.value };

    this.auth.register(user).subscribe(() => this.router.navigateByUrl(""));
  }

  get email(): FormControl {
    return this.form.get("email") as FormControl;
  }

  get name(): FormControl {
    return this.form.get("name") as FormControl;
  }

  get username(): FormControl {
    return this.form.get("username") as FormControl;
  }

  get password(): FormControl {
    return this.form.get("password") as FormControl;
  }

  get confirmPass(): FormControl {
    return this.form.get("password_confirmation") as FormControl;
  }
}
