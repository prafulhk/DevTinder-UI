import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { distinctUntilChanged, filter, Observable, Subject, takeUntil } from 'rxjs';
import { loggedInUser, selectUserError } from '../../store/user/user.selectors';
import { UserActions } from '../../store/user/user.actions';
import { FeedActions } from '../../store/feed/feed.actions';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  private router = inject(Router);
  private store = inject(Store)
  user: Observable<any> = this.store.select(loggedInUser);
  loggedInuserDetails: any;
  loginForm!: FormGroup;
  loggedInuserErrorDetails: any;
  userSubscription: any;
  error$: Observable<any> = this.store.pipe(select(selectUserError));
  errorSubscription: any;
  private destroy$ = new Subject<void>();

  constructor(private formBuilder: FormBuilder) { }


  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      firstName: [''],
      lastName: [''],
      emailId: ['', Validators.required],
      password: ['', [Validators.minLength(4), Validators.required]],
    });
    this.error$.subscribe(data => {
      console.log("data:", data)
      this.errorSubscription = data
    });
  }

  login() {
    let emailId = this.loginForm.controls['emailId'].value || "";
    let password = this.loginForm.controls['password'].value || "";
    this.store.dispatch(UserActions.addUser({ emailId: emailId, password: password }));

    this.user.pipe(
      takeUntil(this.destroy$),
      distinctUntilChanged((prev, curr) => JSON.stringify(prev) === JSON.stringify(curr)),
      filter(store => store && store.data && store.data.emailId)
    ).subscribe(store => {
      this.loggedInuserDetails = store;
      console.log("this.loggedInuserDetails from store:", this.loggedInuserDetails);
      console.log("form:", this.loginForm);
      this.store.dispatch(FeedActions.addFeed());
      this.router.navigate(['/feed']);
    });

  }

  ngOnDestroy() {
    // if (this.userSubscription) {
    //   this.userSubscription.unsubscribe();
    // }
    this.destroy$.next();
    this.destroy$.complete();
  }
}
