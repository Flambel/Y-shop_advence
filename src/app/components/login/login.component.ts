import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'app/services/auth.service';
import { NotificationService } from 'app/services/notification/notification.service';
import { ValidatorinputService } from 'app/services/validatorinput/validatorinput.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  submitted = false;
  loginForm: FormGroup;
  waitingLogin = false;
  email: string;
  password: string;

  constructor(
    private authService: AuthService,
    private router: Router,
    private sanitezeService: ValidatorinputService,
    // private authen: AuthService,
    private formLog: FormBuilder,
    private notification: NotificationService) {
  }

  ngOnInit(): void {
    this.loginForm = this.formLog.group({
      'email': ['', [Validators.required, Validators.email]],
      'password': ['', [Validators.required, Validators.minLength(6)]]
    });
    this.waitingLogin = false;
  }

  get f() {
    return this.loginForm.controls;
  }

  navigateToRegister() {
    this.router.navigate(['/registration']);
  }

  navigateToForgot() {
    this.router.navigate(['/forgot-password']);
  }



  loginWithGoogle() {
    this.authService.loginWithGoogle();
  }

  submit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }
    this.waitingLogin = true;
    this.email = this.loginForm.value.email;
    this.password = this.loginForm.value.password;

    this.authService.signIn(this.email, this.password)
      .then((result) => {
        this.router.navigate(['/dashboard']);
        this.submitted = false;
        this.waitingLogin = false;
      })
      .catch((error) => {
        this.waitingLogin = false;
        this.notification.showNotification('top', 'center', 'danger', 'pe-7s-close-circle', '\<b>Sorry !\</b>\<br>' + error.message);
        this.submitted = false;

      });
  }

}
