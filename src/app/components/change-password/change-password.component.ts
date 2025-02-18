import { catchError } from 'rxjs/operators';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ConfigService } from '../../config/config.service';
import { of } from 'rxjs';

@Component({
  selector: 'app-change-password',
  imports: [ReactiveFormsModule],
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.css'
})
export class ChangePasswordComponent implements OnInit {
  changePasswordForm!: FormGroup;
  private configService = inject(ConfigService);
  showToaster: boolean = false; 
  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {

    this.changePasswordForm = this.formBuilder.group({
      emailId: [''],
      newPassword: [''],
      confirmPassword: [''],
    });
  }

  changePassword() {
    this.configService.resetPassword(this.changePasswordForm.value.emailId, this.changePasswordForm.value.newPassword).pipe(
      catchError((error: any) => {
        console.error('Error changing password', error);
        this.showToaster = false;
        return of(null); // Return an observable to complete the stream
      })
    ).subscribe(
      res => {
        if (res) {
          this.showToaster = true;
          console.log('Password changed successfully');
        }
      }
    );
    setTimeout(() => {
      this.showToaster = false;
    }, 3000);
    this.changePasswordForm.reset();
  }

}
