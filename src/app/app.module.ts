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
import { FeeClientLastNamePipe } from './shared/pipes/fee-client-last-name.pipe';
import { FeePolicyIconPipe } from './shared/pipes/fee-policy-icon.pipe';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    FeeClientLastNamePipe,
    FeePolicyIconPipe
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
    FeesService
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
