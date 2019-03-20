import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastModule } from 'primeng/toast';

@NgModule({
  imports: [
    CommonModule,
    FormsModule, 
    ReactiveFormsModule,

    ToastModule,
  ],
  exports: [
    CommonModule, FormsModule, ReactiveFormsModule, ToastModule
  ]
})
export class SharedModule { }
