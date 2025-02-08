import { Component, inject, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { loggedInUser } from '../../store/login.selectors';
import { Observable } from 'rxjs';
import { ConfigService } from '../../config/config.service';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
// import { LoginActions } from '../../store/login.actions';
import { LoginComponent } from '../login/login.component';
import { LoginLogoutActions } from '../../store/login.actions';

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
  private ConfigService = inject(ConfigService);
  private router = inject(Router);

  ngOnInit() {
    this.user.subscribe(store => {
      console.log("logged in user details:", store)
      this.loggedInuserDetails = store;
    });
  }


  logout(){
    this.store.dispatch(LoginLogoutActions.removeUser(this.loggedInuserDetails));
    this.router.navigateByUrl('login');
  }

}
