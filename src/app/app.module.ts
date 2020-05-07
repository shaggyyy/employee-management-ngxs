import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule, MatTableModule, MatSortModule } from '@angular/material';
import { MatInputModule } from '@angular/material/input';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin'
import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxsModule } from '@ngxs/store'
import { NgxsStoragePluginModule } from '@ngxs/storage-plugin'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './core/component/dashboard/dashboard.component';
import { EmplyeeProfileComponent } from './emplyee-profile/component/emplyee-profile.component';

import { CoreState } from './core/state/core.state'
import { ProfileState } from './emplyee-profile/state/profile.state';
import { LoginComponent } from './onboarding/components/login/login.component';
import { RegisterComponent } from './onboarding/components/register/register.component';
import { LoginRegisterGridComponent } from './core/component/login-register-grid/login-register-grid.component';
import { AuthGuard } from './auth.guard';
import { HasUserGuard } from './has-user.guard';
import { HeaderComponent } from './core/component/header/header.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    EmplyeeProfileComponent,
    LoginComponent,
    RegisterComponent,
    LoginRegisterGridComponent,
    HeaderComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    FormsModule,
    HttpClientModule,
    NgxsLoggerPluginModule.forRoot(),
    NgxsModule.forRoot([
      CoreState,
      ProfileState
    ]),
    NgxsStoragePluginModule.forRoot(),
    NgxsReduxDevtoolsPluginModule.forRoot(),
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatSortModule,
    MatTableModule,
    ReactiveFormsModule,
  ],
  providers: [AuthGuard, HasUserGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
