import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { ConfigService } from '../../config/config.service';
import { UserActions, UserApiActions } from './user.actions';
import { of } from 'rxjs';



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
          catchError(error => of(UserApiActions.addUserFailure(error)))
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
        )
      )
    )
  );

  updateUSer$ = createEffect(() =>
      this.actions$.pipe(
        ofType(UserActions.updateProfile),
        mergeMap((action: any) =>
          this.ConfigService.updateProfile(action).pipe(
            map(data => UserApiActions.updateProfileSuccess(data))
          )
        )
      )
    );
}
