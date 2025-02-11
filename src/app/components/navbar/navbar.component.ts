import { Component, inject, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Router, RouterLink } from '@angular/router';
import { LoginComponent } from '../lgoin/login.component';
import { loggedInUser } from '../../store/user/user.selectors';
import { ConnectionActions, UserActions } from '../../store/user/user.actions';

@Component({
  selector: 'app-navbar',
  imports: [LoginComponent,RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {
  store = inject(Store);
  user:Observable<any> = this.store.select(loggedInUser);
  loggedInuserDetails:any;
  private router = inject(Router);

  ngOnInit() {
    this.user.subscribe(store => {
      console.log("logged in user details:", store)
      this.loggedInuserDetails = store;
    });
  }

  connections(){
    this.store.dispatch(ConnectionActions.addConnections())
  }

  logout(){
    this.store.dispatch(UserActions.removeUser(this.loggedInuserDetails));
    this.router.navigateByUrl('login');
  }

}
