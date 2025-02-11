import { createActionGroup, emptyProps, props } from '@ngrx/store';

export const UserActions = createActionGroup({
  source: 'User',
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
    'Remove User Success': props<{ data: [] }>(),
    'Update Profile Success': props<{ data: any[] }>(),
    'Add Connections Success': props<{ data: any[] }>(),
  },
});

export const ConnectionActions = createActionGroup({
  source: 'Connections',
  events: {
    'Add Connections':emptyProps,
  }
});

export const ConnectionApiActions = createActionGroup({
  source: 'Connections API',
  events: {
    'Add Connections Success': props<{ data: any[] }>(),
  },
});