import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { error } from 'console';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { matFormFieldAnimations } from '@angular/material/form-field';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
const   materialModuls=[MatInputModule,
  MatButtonModule,
  MatIconModule,
  MatCardModule,
  MatFormFieldModule,
  MatExpansionModule,
  MatProgressSpinnerModule
]

@NgModule({
  declarations: [],

  imports: [
    CommonModule,
    // MatInputModule
     materialModuls
  ],
  exports:[materialModuls]
})
export class MaterialModule { }
