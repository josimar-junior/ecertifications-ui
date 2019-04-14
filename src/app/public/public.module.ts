import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserRegisterComponent } from './user-register/user-register.component';
import { SharedModule } from '../shared/shared.module';
import { PanelModule } from 'primeng/panel';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { PasswordModule } from 'primeng/password';

const ROUTES: Routes = [
  { path: '', component: UserRegisterComponent },
]

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(ROUTES),

    PanelModule,
    InputTextModule,
    ButtonModule,
    PasswordModule
  ],
  declarations: [UserRegisterComponent]
})
export class PublicModule { }
