import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { ArticleService } from './service/articleService';
import { ArticleJsonServerService } from './service/articleJsonServerService';
import { UserService } from './service/userService';
import { UserServerService } from './service/utilisateurServerService';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(),
    {provide: ArticleService,
      useClass: ArticleJsonServerService
    },
    { provide: UserService, useClass: UserServerService }
  ]
};
