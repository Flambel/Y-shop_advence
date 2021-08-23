import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'app/services/auth.service';
import { NotificationService } from 'app/services/notification/notification.service';
import { ValidatorinputService } from 'app/services/validatorinput/validatorinput.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  submitted = false;
  registerForm: FormGroup;
  waitingRegister = false;
  name: string;
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
    this.registerForm = this.formLog.group({
      'name': ['', [Validators.required]],
      'email': ['', [Validators.required, Validators.email]],
      'password': ['', [Validators.required, Validators.minLength(6)]]
    });
    this.waitingRegister = false;
  }

  get f() {
    return this.registerForm.controls;
  }

  navigateToLogin() {
    this.router.navigate(['/login']);
  }

  navigateToForgot() {
    this.router.navigate(['/forgot-password']);
  }

  registerWithGoogle() {
    this.authService.loginWithGoogle();
  }

  submit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    }

    this.waitingRegister = true;
    this.name = this.registerForm.value.name;
    this.email = this.registerForm.value.email;
    this.password = this.registerForm.value.password;
    console.log('name: ', this.name);

    this.authService.signUp(this.email, this.password, this.name)
      .then((result) => {
        this.router.navigate(['/products']);
        this.submitted = false;
        this.waitingRegister = false;
      })
      .catch((error) => {
        this.waitingRegister = false;
        this.notification.showNotification('top', 'center', 'danger', 'pe-7s-close-circle', '\<b>Sorry !\</b>\<br>' + error.message);
        this.submitted = false;
        this.waitingRegister = false;

      });
  }

}
