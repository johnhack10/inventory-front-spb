import { ApplicationConfig } from '@angular/core';
import { PreloadAllModules, provideRouter, withComponentInputBinding, withHashLocation, withPreloading } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes,
    withComponentInputBinding(),
    withHashLocation(),
    withPreloading(PreloadAllModules)),
    provideHttpClient(),
    provideAnimationsAsync()
  ]
};
