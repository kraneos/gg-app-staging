import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';

import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuardService } from './shared/guards/auth-guard.service';
import { ProducersGuardService } from './shared/guards/producers-guard.service';

const appRoutes: Routes = [
  { path: '', component: HomeComponent, canActivate: [AuthGuardService, ProducersGuardService] },
  { path: 'login', component: LoginComponent }
];

export const appRoutingProviders: any[] = [
  AuthGuardService,
  ProducersGuardService
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);

