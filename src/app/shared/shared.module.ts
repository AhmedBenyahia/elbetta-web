import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';
import {ComponentsModule} from '../components/components.module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ComponentsModule
  ],
  exports: [
    ReactiveFormsModule,
    ComponentsModule
  ]
})
export class SharedModule { }
