import {
  ApplicationConfig,
  ErrorHandler,
  importProvidersFrom,
} from '@angular/core';
import { provideRouter } from '@angular/router';

import { HttpClientModule } from '@angular/common/http';
import { routes } from './app.routes';
import { AuthenticationErrorHandler } from './error-handler/authentication.error-handler';
import { interceptorProvider } from './interceptors/provider.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    importProvidersFrom(HttpClientModule),
    interceptorProvider,
    { provide: ErrorHandler, useClass: AuthenticationErrorHandler },
  ],
};
