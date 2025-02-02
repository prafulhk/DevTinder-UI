import { ConfigService } from './../../config/config.service';
import { Component, inject } from '@angular/core';
import {FormBuilder, ReactiveFormsModule} from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  private formBuilder = inject(FormBuilder);
  private ConfigService = inject(ConfigService);
  loginForm = this.formBuilder.group({
    firstName: [''],
    lastName: [''],
    emailId: [''],
    password: [''],
  });

  login(){
    this.ConfigService.login("praful").subscribe(res=>{
      console.log("response:",res)
    })
  }
}
