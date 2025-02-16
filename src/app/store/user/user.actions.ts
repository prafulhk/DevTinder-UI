import { createActionGroup, emptyProps, props } from '@ngrx/store';

export const UserActions = createActionGroup({
  source: 'Login',
  events: {
    'Add User': props<{ emailId: string, password: string }>(),
    'Remove User': props<{ user: {} }>(),
    'UpdateProfile': props<{ userId:string,firstName: string, lastName: string, sex: string, dob: string }>(),
  }
});

export const UserApiActions = createActionGroup({
  source: 'Login API',
  events: {
    'Add User Success': props<{ data: any[] }>(),
    'Add User Failure': props<{ error: any }>(),
    'Remove User Success': props<{ data: [] }>(),
    'Update Profile Success': props<{ data: any[] }>(),
  },
});

export const LogoutActions = createActionGroup({
  source: 'Logout',
  events: {
    'Logout User': emptyProps
  }
});