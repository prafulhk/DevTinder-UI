import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { UserActions } from '../../store/user/user.actions';
import { Observable } from 'rxjs';
import { loggedInUser } from '../../store/user/user.selectors';

@Component({
  selector: 'app-update-profile',
  imports: [ReactiveFormsModule],
  templateUrl: './update-profile.component.html',
  styleUrl: './update-profile.component.css',
  // providers: [
  //     provideStore({ UpdateProfile: updateProfilereducer }),
  //     provideEffects(UpdateProfileEffects)]
})
export class UpdateProfileComponent implements OnInit {
  updateProfileForm!: FormGroup;
  private store = inject(Store);
  user:Observable<any> = this.store.select(loggedInUser);
  loggedInuserDetails:any;
  constructor(private formBuilder: FormBuilder) { }


  ngOnInit() {

    this.updateProfileForm = this.formBuilder.group({
      firstName: [''],
      lastName: [''],
      sex: [''],
      dob: ['']
    });

    this.user.subscribe(store => {
      console.log("logged in user details in update profile:", store)
      this.loggedInuserDetails = store;
    });
  }

  onSubmit() {
    let userId = this.loggedInuserDetails._id.toString();
    let firstName = this.updateProfileForm.controls['firstName'].value;
    let lastName = this.updateProfileForm.controls['lastName'].value;
    let sex = this.updateProfileForm.controls['sex'].value;
    let dob = this.updateProfileForm.controls['dob'].value;
    this.store.dispatch(UserActions.updateProfile({ userId:userId,firstName: firstName, lastName: lastName, sex: sex, dob: dob }));
  }

}
