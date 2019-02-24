import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { PanelModule } from 'primeng/panel';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { SelectButtonModule } from 'primeng/selectbutton';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DropdownModule } from 'primeng/dropdown';
import { FieldsetModule } from 'primeng/fieldset';
import { DialogModule } from 'primeng/dialog';

import { OrganizationComponent } from './organization/organization.component';
import { CertificationRegisterComponent } from './certification/certification-register/certification-register.component';
import { CertificationListingComponent } from './certification/certification-listing/certification-listing.component';

const ROUTES: Routes = [
  // { path: '', component: OrganizationComponent },
  { path: 'register', component: CertificationRegisterComponent },
  { path: 'register/:id', component: CertificationRegisterComponent },
  { path: 'listing', component: CertificationListingComponent }
]

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(ROUTES),
    FormsModule,
    ReactiveFormsModule,

    PanelModule,
    InputTextModule,
    ButtonModule,
    TableModule,
    SelectButtonModule,
    ToastModule,
    ConfirmDialogModule,
    DropdownModule,
    FieldsetModule,
    DialogModule
  ],
  declarations: [OrganizationComponent, CertificationRegisterComponent, CertificationListingComponent]
})
export class AdministratorModule { }
