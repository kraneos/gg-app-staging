import { provideRouter, RouterConfig } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ClientsComponent } from './clients/clients.component';
import { PoliciesComponent } from './policies/policies.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AuthGuard } from './auth.guard';
import { ProducersGuard } from './producers.guard';
import { LoginService } from './shared/services/login.service';
import { ParseService } from './shared/services/parse.service';
import { ClientsDetailComponent } from './clients-detail/clients-detail.component';
import { PoliciesDetailComponent } from './policies-detail/policies-detail.component';
import { PoliciesCollectComponent } from './policies-collect/policies-collect.component';

export const routes: RouterConfig = [
    { path: '', component: HomeComponent, canActivate: [AuthGuard, ProducersGuard] },
    { path: 'clients', component: ClientsComponent, canActivate: [AuthGuard, ProducersGuard] },
    { path: 'clients/:id', component: ClientsDetailComponent, canActivate: [AuthGuard] },
    { path: 'policies/:id', component: PoliciesDetailComponent, canActivate: [AuthGuard] },
    { path: 'login', component: LoginComponent },
    { path: 'seggu-clients/:segguClientId/register', component: RegisterComponent },
    { path: 'policies', component: PoliciesComponent, canActivate: [AuthGuard] },
    { path: 'policies/:id/fees/:feeId/collect', component: PoliciesCollectComponent, canActivate: [AuthGuard, ProducersGuard] }
];

export const APP_ROUTER_PROVIDERS = [
    provideRouter(routes)
];

export const AUTH_PROVIDERS = [
    AuthGuard,
    ProducersGuard,
    LoginService,
    ParseService
];
