import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loginForm: FormGroup;

  constructor(
    private router: Router,
    private auth: AuthService
  ) { }

  // TODO: HANDLE HARDWARE BACK BUTTON
  ngOnInit() {
    this.loginForm = new FormGroup({
      email: new FormControl("", [Validators.required, Validators.email]),
      password: new FormControl("", [Validators.required]),
      autologin: new FormControl(false, [Validators.required])
    });
  }

  login() {
    const { email, password } = this.loginForm.value
    this.auth.login(email, password)
      .subscribe(resp => this.router.navigateByUrl(''))
  }

}
