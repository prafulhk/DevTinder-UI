import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection, isDevMode } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { ConfigService } from './config/config.service';
import { provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { loginReducer } from './store/login.reducer';
import { provideEffects } from '@ngrx/effects';
import { LoginEffects } from './store/login.effects';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    importProvidersFrom(HttpClientModule),
    ConfigService,
    provideStore({ userDetails: loginReducer }),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }), 
    provideEffects(LoginEffects)]
};
