import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ConfigService } from '../../config/config.service';
import { ReceivedRequestActions, ReceivedRequestApiActions } from './requests.actions';
import { map, mergeMap } from 'rxjs';



@Injectable()
export class RequestsEffects {

  private ConfigService = inject(ConfigService);
  private actions$ = inject(Actions);
  constructor() { }

  recievedRequest$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ReceivedRequestActions.addRecievedRequest),
      mergeMap((action: any) =>
        this.ConfigService.fetchRecievedRequests().pipe(
          map(data => ReceivedRequestApiActions.addReceivedRequestSuccess({data,isFromAPI: true}))
        )
      )
    )
  );

  connectionRequest$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ReceivedRequestActions.addConnectionRequest),
      mergeMap((action: any) =>
        this.ConfigService.fetchConnections().pipe(
          map(data => ReceivedRequestApiActions.addConnectionRequestSuccess(data))
        )
      )
    )
  );
}
