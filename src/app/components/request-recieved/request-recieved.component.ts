import { Component, inject, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { ReceivedRequestActions } from '../../store/requests/requests.actions';
import {  Observable } from 'rxjs';
import { selectAllFeeds } from '../../store/feed/feed.selectors';
import { selectAllRequests } from '../../store/requests/requests.selectors';
import { ConfigService } from '../../config/config.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-request-recieved',
  imports: [CommonModule],
  templateUrl: './request-recieved.component.html',
  styleUrl: './request-recieved.component.css'
})
export class RequestRecievedComponent implements OnInit {
  store = inject(Store);
  requestsFromStore: Observable<any> = this.store.select(selectAllRequests);
  feedsFromStore: Observable<any> = this.store.select(selectAllFeeds);
  requests: any;
  feeds: any;
  requestRecieved:any;
  private ConfigService = inject(ConfigService);
  constructor() { }

  ngOnInit(): void {
    this.store.dispatch(ReceivedRequestActions.addRecievedRequest());
    this.feedsFromStore.subscribe(store => {
      this.feeds = store;
    });
    this.store.select(selectAllRequests).subscribe(requests => {
      this.requests = requests;
      if (this.requests?.data) {
       this.requestRecieved = this.feeds?.data?.filter((feeds: { _id: any; })=>this.requests?.data?.some((item: { fromUserId: any; })=>item.fromUserId==feeds._id))
      }
    });
  }

  reviewRequest(status: string,id: string){
    let req = this.requests.data.filter((item: { fromUserId: any; })=>this.requestRecieved.some((req: { _id: any; })=>req._id==item.fromUserId))
    let reqId = req.filter((item: { fromUserId: string; })=>item.fromUserId==id).map((item: { _id: any; })=>item._id)
    this.ConfigService.reviewRequest(status,reqId.toString()).subscribe();
    this.store.dispatch(ReceivedRequestActions.removeRecievedRequest({id:reqId.toString()}));
  }

}
