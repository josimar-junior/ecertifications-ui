import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { JwtModule } from '@auth0/angular-jwt';

import { LoginFormComponent } from './login-form/login-form.component';

import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { SharedModule } from '../shared/shared.module';

import { environment } from '../../environments/environment';
import { AuthGuard } from './auth.guard';
import { LogoutService } from './logout.service';

const ROUTES: Routes = [
  { path: 'login', component: LoginFormComponent }
]

export function tokenGetter() {
  return localStorage.getItem('token');
}

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(ROUTES),

    InputTextModule,
    ButtonModule,
    SharedModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        whitelistedDomains: environment.tokenWhitelistedDomains,
        blacklistedRoutes: environment.tokenBlacklistedRoutes
      }
    }),
  ],
  declarations: [LoginFormComponent],
  providers: [
    AuthGuard,
    LogoutService
  ]
})
export class SecurityModule { }
