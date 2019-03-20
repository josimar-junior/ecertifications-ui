import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PanelModule } from 'primeng/panel';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { SelectButtonModule } from 'primeng/selectbutton';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DropdownModule } from 'primeng/dropdown';
import { FieldsetModule } from 'primeng/fieldset';
import { DialogModule } from 'primeng/dialog';
import { EditorModule } from 'primeng/editor';
import { RadioButtonModule } from 'primeng/radiobutton';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextareaModule } from 'primeng/inputtextarea';

import { OrganizationComponent } from './organization/organization.component';
import { CertificationRegisterComponent } from './certification/certification-register/certification-register.component';
import { CertificationListingComponent } from './certification/certification-listing/certification-listing.component';
import { SharedModule } from '../shared/shared.module';
import { AuthGuard } from '../security/auth.guard';
import { QuestionsRegisterComponent } from './questions/questions-register/questions-register.component';

const ROUTES: Routes = [
  { path: 'org', component: OrganizationComponent, canActivate: [AuthGuard] },
  { path: 'register', component: CertificationRegisterComponent, canActivate: [AuthGuard] },
  { path: 'register/:id', component: CertificationRegisterComponent, canActivate: [AuthGuard] },
  { path: 'listing', component: CertificationListingComponent, canActivate: [AuthGuard] },
  { path: 'question-register', component: QuestionsRegisterComponent, canActivate: [AuthGuard] }
]

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(ROUTES),

    SharedModule,

    PanelModule,
    InputTextModule,
    ButtonModule,
    TableModule,
    SelectButtonModule,
    ConfirmDialogModule,
    DropdownModule,
    FieldsetModule,
    DialogModule,
    EditorModule,
    RadioButtonModule,
    AutoCompleteModule,
    CheckboxModule,
    InputTextareaModule
  ],
  declarations: [OrganizationComponent, CertificationRegisterComponent, CertificationListingComponent, QuestionsRegisterComponent]
})
export class AdministratorModule { }
