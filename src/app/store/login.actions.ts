import { HttpErrorResponse } from '@angular/common/http';
import { createAction, createActionGroup, emptyProps, props } from '@ngrx/store';

export const LoginLogoutActions = createActionGroup({
  source: 'LoginLogout',
  events: {
    'Add User': props<{ emailId: string, password: string }>(),
    'Remove User': props<{ user: {} }>(),
  }
});

export const LoginApiActions = createActionGroup({
  source: 'Login API',
  events: {
    'Add User Success': props<{ data: any[] }>(),
    // 'Add User Failure': props<{ error: HttpErrorResponse }>(),
  },
});


export const LogoutApiActions = createActionGroup({
  source: 'Logout API',
  events: {
    'Remove User Success': props<{ data: [] }>(),
    // 'Remove USer Failure': props<{ error: HttpErrorResponse }>(),
  },
});