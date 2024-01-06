import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoaderComponent } from './components/loader/loader.component';
import { MaterialModule } from './material-module/material.module';



@NgModule({
  declarations: [LoaderComponent],
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports:[LoaderComponent,MaterialModule]
})
export class SharedModule { }
