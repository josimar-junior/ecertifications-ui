import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessageService, ConfirmationService } from 'primeng/api';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ErrorHandlerService } from './error-handler.service';
import { CertificationHttp } from '../security/certification-http';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    RouterModule
  ],
  declarations: [
    NavbarComponent,
    FooterComponent
  ],
  exports: [
    NavbarComponent,
    FooterComponent
  ],
  providers: [
    ErrorHandlerService,
    CertificationHttp,

    MessageService, 
    ConfirmationService, 
    JwtHelperService
  ]
})
export class CoreModule { }
