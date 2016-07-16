import { bootstrap } from '@angular/platform-browser-dynamic';
import { enableProdMode } from '@angular/core';
import { AppComponent, environment } from './app/';
import { APP_ROUTER_PROVIDERS, AUTH_PROVIDERS } from './app/app.routes';
import { HTTP_PROVIDERS } from '@angular/http';
import { disableDeprecatedForms, provideForms } from '@angular/forms';
import { CurrentUserService } from './app/shared/services/current-user.service';

if (environment.production) {
  enableProdMode();
}

bootstrap(AppComponent, [
  APP_ROUTER_PROVIDERS,
  HTTP_PROVIDERS,
  AUTH_PROVIDERS,
  disableDeprecatedForms(),
  provideForms(),
  CurrentUserService
])
.catch(console.log);
