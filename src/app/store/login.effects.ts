import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY, of } from 'rxjs';
import { catchError, distinctUntilChanged, map, mergeMap, switchMap } from 'rxjs/operators';
import { ConfigService } from '../config/config.service';
import { LoginLogoutActions, LoginApiActions, LogoutApiActions } from './login.actions';



@Injectable()
export class LoginEffects {

  private ConfigService = inject(ConfigService);
  private actions$ = inject(Actions);
  constructor() { }

  addUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(LoginLogoutActions.addUser),
      mergeMap((action: any) =>
        this.ConfigService.login(action.emailId, action.password).pipe(
          map(data => LoginApiActions.addUserSuccess(data)),
          // catchError(error => of(LoginApiActions.addUserFailure( error)))
        )
      )
    )
  );

  removeUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(LoginLogoutActions.removeUser),
      mergeMap((action: any) =>
        this.ConfigService.logout(action.emailId).pipe(
          map(data => LogoutApiActions.removeUserSuccess(data)),
          // catchError(error => of(LogoutApiActions.removeUSerFailure({ error })))
        )
      )
    )
  );
}
