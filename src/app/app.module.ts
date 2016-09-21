import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { routing, appRoutingProviders } from './app.routing';

import 'style!@angular2-material/core/style/core.css';
import 'style!@angular2-material/core/overlay/overlay.css';

import 'hammerjs';

import {MdButtonToggleModule} from '@angular2-material/button-toggle/button-toggle';
import {MdButtonModule} from '@angular2-material/button/button';
import {MdCheckboxModule} from '@angular2-material/checkbox/checkbox';
import {MdRadioModule} from '@angular2-material/radio/radio';
import {MdSlideToggleModule} from '@angular2-material/slide-toggle/slide-toggle';
import {MdSliderModule} from '@angular2-material/slider/slider';
import {MdSidenavModule} from '@angular2-material/sidenav/sidenav';
import {MdListModule} from '@angular2-material/list/list';
import {MdGridListModule} from '@angular2-material/grid-list/grid-list';
import {MdCardModule} from '@angular2-material/card/card';
import {MdIconModule} from '@angular2-material/icon/icon';
import {MdProgressCircleModule} from '@angular2-material/progress-circle/progress-circle';
import {MdProgressBarModule} from '@angular2-material/progress-bar/progress-bar';
import {MdInputModule} from '@angular2-material/input/input';
import {MdTabsModule} from '@angular2-material/tabs/tabs';
import {MdToolbarModule} from '@angular2-material/toolbar/toolbar';
import {MdTooltipModule} from '@angular2-material/tooltip/tooltip';
import {MdRippleModule} from '@angular2-material/core/ripple/ripple';
import {MdMenuModule} from '@angular2-material/menu/menu';

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
    routing,
    MdButtonModule.forRoot(),
    MdButtonToggleModule.forRoot(),
    MdCardModule.forRoot(),
    MdCheckboxModule.forRoot(),
    MdGridListModule.forRoot(),
    MdIconModule.forRoot(),
    MdInputModule.forRoot(),
    MdListModule.forRoot(),
    MdMenuModule.forRoot(),
    MdProgressBarModule.forRoot(),
    MdProgressCircleModule.forRoot(),
    MdRadioModule.forRoot(),
    MdRippleModule.forRoot(),
    MdSidenavModule.forRoot(),
    MdSliderModule.forRoot(),
    MdSlideToggleModule.forRoot(),
    MdTabsModule.forRoot(),
    MdToolbarModule.forRoot(),
    MdTooltipModule.forRoot()
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
