import { Component, inject, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { ReceivedRequestActions } from '../../store/requests/requests.actions';
import { selectAllFeeds } from '../../store/feed/feed.selectors';
import { selectConnections } from '../../store/requests/requests.selectors';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-connections',
  imports: [CommonModule],
  templateUrl: './connections.component.html',
  styleUrl: './connections.component.css'
})

export class ConnectionsComponent implements OnInit {
  private store = inject(Store)
  feedsFromStore: Observable<any> = this.store.select(selectAllFeeds);
  feeds: any;
  connections:any;

  ngOnInit(): void {
    this.store.dispatch(ReceivedRequestActions.addConnectionRequest());
    this.feedsFromStore.subscribe(store => {
      this.feeds = store;
    });

    this.store.select(selectConnections).subscribe(res => {
      let connections = res;
      if (connections.length>0) {
        this.connections = this.feeds?.data?.filter((item: { _id: any; })=>connections.includes(item._id))
      }
    });
  }


}
