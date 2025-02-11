import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap } from 'rxjs/operators';
import { ConfigService } from '../../config/config.service';
import { ConnectionActions, ConnectionApiActions, UserActions, UserApiActions } from './user.actions';



@Injectable()
export class UserEffects {

  private ConfigService = inject(ConfigService);
  private actions$ = inject(Actions);
  constructor() { }

  addUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.addUser),
      mergeMap((action: any) =>
        this.ConfigService.login(action.emailId, action.password).pipe(
          map(data => UserApiActions.addUserSuccess(data)),
          // catchError(error => of(LoginApiActions.addUserFailure( error)))
        )
      )
    )
  );

  removeUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.removeUser),
      mergeMap((action: any) =>
        this.ConfigService.logout(action.emailId).pipe(
          map(data => UserApiActions.removeUserSuccess(data)),
          // catchError(error => of(LogoutApiActions.removeUSerFailure({ error })))
        )
      )
    )
  );

  updateUSer$ = createEffect(() =>
      this.actions$.pipe(
        ofType(UserActions.updateProfile),
        mergeMap((action: any) =>
          this.ConfigService.updateProfile(action.userId,action.firstName, action.lastName, action.sex, action.dob).pipe(
            map(data => UserApiActions.updateProfileSuccess(data))
          )
        )
      )
    );

    connection$ = createEffect(() =>
      this.actions$.pipe(
        ofType(ConnectionActions.addConnections),
        mergeMap((action: any) =>
          this.ConfigService.fetchConnections().pipe(
            map(data => ConnectionApiActions.addConnectionsSuccess(data))
          )
        )
      )
    );
}
