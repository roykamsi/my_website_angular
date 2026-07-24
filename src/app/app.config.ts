import {
  ApplicationConfig,
  provideZoneChangeDetection,
  importProvidersFrom,
  inject,
  LOCALE_ID,
} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration, withNoIncrementalHydration } from '@angular/platform-browser';
import { icons } from './icons-provider';
import { provideNzIcons } from 'ng-zorro-antd/icon';
import { en_GB, it_IT, NZ_I18N, provideNzI18n } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import it from '@angular/common/locales/it';
import en from '@angular/common/locales/it';
import { FormsModule } from '@angular/forms';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient, withXhr } from '@angular/common/http';

registerLocaleData(it);
registerLocaleData(en);

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideClientHydration(withNoIncrementalHydration()),
    provideNzIcons(icons),
    {
      provide: LOCALE_ID,
      useValue: 'en-GB',
    },
    {
      provide: NZ_I18N,
      useFactory: () => {
        const localId = inject(LOCALE_ID);
        switch (localId) {
          case 'it':
            return it_IT;
          case 'en-GB':
          default:
            return en_GB;
        }
      },
    },
    importProvidersFrom(FormsModule),
    provideAnimationsAsync(),
    provideHttpClient(withXhr()),
  ],
};
