import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { routing, appRoutingProviders } from './app.routing';

import { ParseService } from './shared/services/parse.service';
import { LoginService } from './shared/services/login.service';
import { CurrentUserService } from './shared/services/current-user.service';
import { PoliciesService } from './shared/services/policies.service';
import { FeesService } from './shared/services/fees.service';
import { RegistrationsService } from './shared/services/registrations.service';
import { VehiclesService } from './shared/services/vehicles.service';
import { EmployeesService } from './shared/services/employees.service';
import { IntegralsService } from './shared/services/integrals.service';
import { LedgerAccountsService } from './shared/services/ledger-accounts.service';
import { AssetsService } from './shared/services/assets.service';
import { CashAccountsService } from './shared/services/cash-accounts.service';
import { ProducersService } from './shared/services/producers.service';
import { ClientsService } from './shared/services/clients.service';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { FeeClientLastNamePipe } from './shared/pipes/fee-client-last-name.pipe';
import { FeePolicyIconPipe } from './shared/pipes/fee-policy-icon.pipe';
import { PasRegisterComponent } from './pas-register/pas-register.component';
import { PoliciesDetailComponent } from './policies-detail/policies-detail.component';
import { FeeStatusNamePipe } from './shared/pipes/fee-status-name.pipe';
import { PoliciesCollectComponent } from './policies-collect/policies-collect.component';
import { ClientsDetailComponent } from './clients-detail/clients-detail.component';
import { ClientPoliciesComponent } from './client-policies/client-policies.component';
import { PolicyIconPipe } from './shared/pipes/policy-icon.pipe';
import { RegisterComponent } from './register/register.component';

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
    PoliciesCollectComponent,
    ClientsDetailComponent,
    ClientPoliciesComponent,
    PolicyIconPipe,
    RegisterComponent
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
    IntegralsService,
    LedgerAccountsService,
    AssetsService,
    CashAccountsService,
    ProducersService,
    ClientsService
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
