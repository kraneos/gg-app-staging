import { provideRouter, RouterConfig } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ClientsComponent } from './clients/clients.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './auth.guard';
import { LoginService } from './shared/services/login.service';
import { ParseService } from './shared/services/parse.service';
import { ClientsDetailComponent } from './clients-detail/clients-detail.component';
import { PoliciesDetailComponent } from './policies-detail/policies-detail.component';

export const routes: RouterConfig = [
    { path: '', component: HomeComponent, canActivate: [AuthGuard] },
    { path: 'clients', component: ClientsComponent, canActivate: [AuthGuard] },
    { path: 'clients/:id', component: ClientsDetailComponent, canActivate: [AuthGuard] },
    { path: 'policies/:id', component: PoliciesDetailComponent, canActivate: [AuthGuard] },
    { path: 'login', component: LoginComponent }
];

export const APP_ROUTER_PROVIDERS = [
    provideRouter(routes)
];

export const AUTH_PROVIDERS = [
    AuthGuard,
    LoginService,
    ParseService
];