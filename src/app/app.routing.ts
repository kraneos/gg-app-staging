import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { PasRegisterComponent } from './pas-register/pas-register.component';
import { PoliciesDetailComponent } from './policies-detail/policies-detail.component';
import { PoliciesCollectComponent } from './policies-collect/policies-collect.component';
import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuardService } from './shared/guards/auth-guard.service';
import { ProducersGuardService } from './shared/guards/producers-guard.service';

const appRoutes: Routes = [
  { path: '', component: HomeComponent, canActivate: [AuthGuardService, ProducersGuardService] },
  { path: 'login', component: LoginComponent },
  { path: 'pas-register', component: PasRegisterComponent },
  { path: 'policies/:id', component: PoliciesDetailComponent, canActivate: [AuthGuardService] },
  { path: 'policies/:id/fees/:feeId/collect', component: PoliciesCollectComponent, canActivate: [AuthGuardService, ProducersGuardService] }
];

export const appRoutingProviders: any[] = [
  AuthGuardService,
  ProducersGuardService
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);

