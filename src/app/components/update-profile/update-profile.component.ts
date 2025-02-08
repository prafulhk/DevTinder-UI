import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-update-profile',
  imports: [ReactiveFormsModule],
  templateUrl: './update-profile.component.html',
  styleUrl: './update-profile.component.css'
})
export class UpdateProfileComponent implements OnInit {
  updateProfileForm!: FormGroup;

  constructor(private formBuilder: FormBuilder) { }


  ngOnInit() {

    this.updateProfileForm = this.formBuilder.group({
      firstName: [''],
      lastName: [''],
      sex:[''],
      dob:['']
    });

  }

}
