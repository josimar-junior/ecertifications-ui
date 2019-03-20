import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { QuizComponent } from './quiz/quiz.component';
import { SharedModule } from '../shared/shared.module';
import { PanelModule } from 'primeng/panel';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { AuthGuard } from '../security/auth.guard';
import { RadioButtonModule } from 'primeng/radiobutton';
import { HistoricComponent } from './historic/historic.component';
import { TableModule } from 'primeng/table';
import { CheckboxModule } from 'primeng/checkbox';

const ROUTES: Routes = [
  { path: 'quiz/:id', component: QuizComponent, canActivate: [AuthGuard] },
  { path: 'historic', component: HistoricComponent, canActivate: [AuthGuard] },
]

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(ROUTES),

    PanelModule,
    InputTextModule,
    ButtonModule,
    RadioButtonModule,
    TableModule,
    CheckboxModule
  ],
  declarations: [QuizComponent, HistoricComponent]
})
export class UserModule { }
