import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ConfigService } from '../../config/config.service';
import { map, mergeMap } from 'rxjs';
import { FeedActions, FeedApiActions } from './feed.actions';



@Injectable()
export class FeedEffects {

  private ConfigService = inject(ConfigService);
  private actions$ = inject(Actions);
  constructor() { }

  feeds$ = createEffect(() =>
    this.actions$.pipe(
      ofType(FeedActions.addFeed),
      mergeMap((action: any) =>
        this.ConfigService.fetchFeed().pipe(
          map(data => FeedApiActions.addFeedSuccess(data))
        )
      )
    )
  );
}
