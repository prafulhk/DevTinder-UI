import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { UserActions } from '../../store/user/user.actions';
import { Observable, Subject, takeUntil } from 'rxjs';
import { loggedInUser } from '../../store/user/user.selectors';

@Component({
  selector: 'app-update-profile',
  imports: [ReactiveFormsModule],
  templateUrl: './update-profile.component.html',
  styleUrl: './update-profile.component.css',
})
export class UpdateProfileComponent implements OnInit {
  updateProfileForm!: FormGroup;
  private store = inject(Store);
  user:Observable<any> = this.store.select(loggedInUser);
  loggedInuserDetails:any;
  showToaster!: boolean;
  private destroy$ = new Subject<void>();
  constructor(private formBuilder: FormBuilder) { }


  ngOnInit() {

    this.updateProfileForm = this.formBuilder.group({
      firstName: [''],
      lastName: [''],
      sex: [''],
      dob: [''],
      photoURL:[''],
      about: [''],
      skills:[]
    });

    this.user.pipe(takeUntil(this.destroy$)).subscribe(store => {
      this.loggedInuserDetails = store;
      this.updateProfileForm.patchValue({
        firstName: store?.data?.firstName,
        lastName: store?.data?.lastName,
        sex: store?.data?.gender,
        dob: store?.data?.dob,
        photoURL:store?.data?.photoURL,
        about: store?.data?.about,
        skills:store?.data?.skills
      });
    });
  }

  onSubmit() {
    const userId = this.loggedInuserDetails.data._id.toString();
    this.store.dispatch(UserActions.updateProfile({ userId:userId, ...this.updateProfileForm.value }));
    this.showToaster = true;
    setTimeout(() => {
      this.showToaster = false;
    }, 3000);
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
