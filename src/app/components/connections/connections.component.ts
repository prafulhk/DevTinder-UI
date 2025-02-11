import { Component, inject, OnInit } from '@angular/core';
import { ConfigService } from '../../config/config.service';
import { Observable } from 'rxjs';
import { loggedInUser } from '../../store/user/user.selectors';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-connections',
  imports: [],
  templateUrl: './connections.component.html',
  styleUrl: './connections.component.css'
})
export class ConnectionsComponent implements OnInit {
  private ConfigService = inject(ConfigService);
  private store = inject(Store)
  user: Observable<any> = this.store.select(loggedInUser);
  loggedInuserDetails: any;

  ngOnInit(): void {
    this.user.subscribe(store => {
      console.log("logged in user details login:", store)
      this.loggedInuserDetails = store;
    });
  }

  sendConnections(status: string) {
    // this.ConfigService.fetchConnections(status, this.loggedInuserDetails._id.toString()).subscribe(res => {
    //   if (res) {
    //     console.log(res)
    //   }
    // })
  }

}
