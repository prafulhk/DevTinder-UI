import { Component, inject, OnInit } from '@angular/core';
import { ConfigService } from '../../config/config.service';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.css'
})
export class ForgotPasswordComponent implements OnInit {
  private configService = inject(ConfigService);
  otpSent!: boolean;
  otpForm!: FormGroup;
  generatedOTP!: string;
  private router = inject(Router);

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.otpForm = this.formBuilder.group({
      firstDigit: [''],
      secondDigit: [''],
      thirdDigit: [''],
      fourthDigit: [''],
    });
  }

  generateOtp(): string {
    return Math.floor(1000 + Math.random() * 9000).toString();
  }

  sendEmail() {
    this.generatedOTP = this.generateOtp();
    this.configService.sendEmailWithOTP("prafulkusugal@gmail.com", this.generatedOTP).subscribe((response: any) => {
      this.otpSent = true;
    }, (error: any) => {
      console.error('Error sending email', error);
    });
  }

  verifyOtp() {
    const enteredOTP = this.otpForm.value.firstDigit + this.otpForm.value.secondDigit + this.otpForm.value.thirdDigit + this.otpForm.value.fourthDigit;
    console.log("otp form:", this.otpForm.value);
    if (enteredOTP === this.generatedOTP) {
      console.log('OTP verified successfully');
      this.router.navigate(['/resetPassword']);
    }
    else{
      console.log('Invalid OTP');
    }
  }
}
