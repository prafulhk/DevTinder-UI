import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection, isDevMode } from '@angular/core';
import { HTTP_INTERCEPTORS, HttpClientModule, provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { ConfigService } from './config/config.service';
import { provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { provideEffects } from '@ngrx/effects';
import { userReducer } from './store/user/user.reducer';
import { UserEffects } from './store/user/user.effects';
import { authInterceptor } from './services/auth.interceptor';

export const appConfig: ApplicationConfig = {
  providers:
    [
      provideHttpClient(
        withInterceptors([
          authInterceptor
        ])),
      provideZoneChangeDetection({ eventCoalescing: true }),
      provideRouter(routes),
      importProvidersFrom(HttpClientModule),
      ConfigService,
      provideStore({ userDetails: userReducer }),
      provideEffects(UserEffects),
      provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }),
    ]
};
