import { map, takeUntil } from 'rxjs/operators';
import { Component, inject, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { ConfigService } from '../../config/config.service';
import { selectAllFeeds } from '../../store/feed/feed.selectors';
import { FeedActions } from '../../store/feed/feed.actions';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-card',
  imports: [CommonModule],
  templateUrl: './user-card.component.html',
  styleUrl: './user-card.component.css'
})
export class UserCardComponent implements OnInit {
  store = inject(Store);
  private ConfigService = inject(ConfigService);
  @Input() feedData: any;
  feeds: Observable<any> = this.store.select(selectAllFeeds);
  private destroy$ = new Subject<void>();

  ngOnInit() {
    this.feeds.pipe(takeUntil(this.destroy$)).subscribe(store => {
      this.feedData = store;
    });
  }

  sendRequest(status: string, id: string) {
    this.ConfigService.sendRequest(status, id).subscribe();
    this.store.dispatch(FeedActions.removeFeed({ id: id }));

  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

}



