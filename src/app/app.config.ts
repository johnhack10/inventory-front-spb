import { ApplicationConfig } from '@angular/core';
import { PreloadAllModules, provideRouter, withComponentInputBinding, withHashLocation, withPreloading } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes,
    withComponentInputBinding(),
    withHashLocation(),
    withPreloading(PreloadAllModules)),
    provideClientHydration(),
    provideHttpClient()
  ]
};
