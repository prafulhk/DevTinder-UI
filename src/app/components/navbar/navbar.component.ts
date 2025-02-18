import { Component, inject, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Router, RouterLink } from '@angular/router';
import { LoginComponent } from '../lgoin/login.component';
import { loggedInUser } from '../../store/user/user.selectors';
import { LogoutActions, UserActions } from '../../store/user/user.actions';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  imports: [LoginComponent, RouterLink,CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {
  store = inject(Store);
  user: Observable<any> = this.store.select(loggedInUser);
  loggedInuserDetails: any;
  userSubscription: any;
  private router = inject(Router);
  defaultPhoto = "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp";
  ngOnInit() {
    this.userSubscription = this.user.subscribe(store => {
      this.loggedInuserDetails = store;
    });
  }



  connections() {
  }

  logout() {
    this.store.dispatch(LogoutActions.logoutUser());
    this.router.navigateByUrl('/');
  }

  ngOnDestroy() {
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }
  }
}
