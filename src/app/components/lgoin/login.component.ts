import { ConfigService } from './../../config/config.service';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { loggedInUser, selectLoginError } from '../../store/user/user.selectors';
import { UserActions } from '../../store/user/user.actions';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  private ConfigService = inject(ConfigService);
  private router = inject(Router);
  private store = inject(Store)
  user: Observable<any> = this.store.select(loggedInUser);
  userError: Observable<any> = this.store.select(selectLoginError);
  loggedInuserDetails: any;
  loginForm!: FormGroup;
  loggedInuserErrorDetails: any;
  constructor(private formBuilder: FormBuilder) { }
  ngOnInit() {

    this.user.subscribe(store => {
      console.log("logged in user details login:", store)
      this.loggedInuserDetails = store;
    });

    this.userError.subscribe(store => {
      this.loggedInuserErrorDetails = store;
      console.log("this.loggedInuserErrorDetails inside login:", this.loggedInuserErrorDetails)
    });

    this.loginForm = this.formBuilder.group({
      firstName: [''],
      lastName: [''],
      emailId: ['', Validators.required],
      password: ['', [Validators.minLength(4), Validators.required]],
    });

    this.loginForm.controls['emailId'].setValue(this.loggedInuserDetails[0].emailId);
    this.loginForm.controls['password'].setValue(this.loggedInuserDetails[0].password);

  }

  login() {
    console.log("this.loginForm:", this.loginForm)
    let emailId = this.loginForm.controls['emailId'].value || "";
    let password = this.loginForm.controls['password'].value || "";
    this.store.dispatch(UserActions.addUser({ emailId: emailId, password: password }));
    this.router.navigate(['/feed']);


  }
}
