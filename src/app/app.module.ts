import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { routing, appRoutingProviders } from './app.routing';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';

import { ParseService } from './shared/services/parse.service';
import { LoginService } from './shared/services/login.service';
import { CurrentUserService } from './shared/services/current-user.service';
import { PoliciesService } from './shared/services/policies.service';
import { FeesService } from './shared/services/fees.service';
import { RegistrationsService } from './shared/services/registrations.service';
import { VehiclesService } from './shared/services/vehicles.service';
import { EmployeesService } from './shared/services/employees.service';
import { IntegralsService } from './shared/services/integrals.service';
import { FeeClientLastNamePipe } from './shared/pipes/fee-client-last-name.pipe';
import { FeePolicyIconPipe } from './shared/pipes/fee-policy-icon.pipe';
import { PasRegisterComponent } from './pas-register/pas-register.component';
import { PoliciesDetailComponent } from './policies-detail/policies-detail.component';
import { FeeStatusNamePipe } from './shared/pipes/fee-status-name.pipe';
import { PoliciesCollectComponent } from './policies-collect/policies-collect.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    FeeClientLastNamePipe,
    FeePolicyIconPipe,
    PasRegisterComponent,
    PoliciesDetailComponent,
    FeeStatusNamePipe,
    PoliciesCollectComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    routing
  ],
  providers: [
    appRoutingProviders,
    ParseService,
    LoginService,
    CurrentUserService,
    PoliciesService,
    FeesService,
    RegistrationsService,
    VehiclesService,
    EmployeesService,
    IntegralsService
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
