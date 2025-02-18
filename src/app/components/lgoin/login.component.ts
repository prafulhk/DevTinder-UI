import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { distinctUntilChanged, filter, Observable, Subject, takeUntil } from 'rxjs';
import { loggedInUser, selectUserError } from '../../store/user/user.selectors';
import { UserActions } from '../../store/user/user.actions';
import { FeedActions } from '../../store/feed/feed.actions';
import { CommonModule } from '@angular/common';
import { ConfigService } from '../../config/config.service';

@Component({
  selector: 'app-login',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  private router = inject(Router);
  private store = inject(Store);
  private configService = inject(ConfigService)
  user: Observable<any> = this.store.select(loggedInUser);
  loggedInuserDetails: any;
  loginForm!: FormGroup;
  loggedInuserErrorDetails: any;
  userSubscription: any;
  error$: Observable<any> = this.store.pipe(select(selectUserError));
  errorSubscription: any;
  private destroy$ = new Subject<void>();
  signupUser: boolean = true;
  forgotPasswordFlag: boolean = false;
  constructor(private formBuilder: FormBuilder) { }


  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      firstName: [''],
      lastName: [''],
      emailId: ['', Validators.required],
      password: ['', [Validators.minLength(4), Validators.required]],
    });
    this.error$.subscribe(data => {
      this.errorSubscription = data
    });
  }

  login(action:string) {
    const { emailId, password } = this.loginForm.value;

    if(action === 'signup') {
      this.configService.signup(this.loginForm.value).subscribe();
    }
    else{
    this.store.dispatch(UserActions.addUser({ emailId: emailId, password: password }));
      this.user.pipe(
        takeUntil(this.destroy$),
        distinctUntilChanged((prev, curr) => JSON.stringify(prev) === JSON.stringify(curr)),
        filter(store => store && store.data && store.data.emailId)
      ).subscribe(store => {
        this.loggedInuserDetails = store;
        this.store.dispatch(FeedActions.addFeed());
        this.router.navigate(['/feed']);
      });
    }
    this.loginForm.reset();
  }

  forgotPassword(){
    this.forgotPasswordFlag = true;
    this.router.navigate(['/forgotPassword']);
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
