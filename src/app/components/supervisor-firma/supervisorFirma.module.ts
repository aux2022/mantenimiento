import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { SupervisorFirmaComponent } from './principalSF/supervisor-firma.component';
import { PrimeNgModule } from '../primeNGModule/primeNG.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CerradasComponent } from './cerradas/cerradas.component';
import { CerradasTTComponent } from './cerradas-tt/cerradas-tt.component';





@NgModule({
  declarations: [
    SupervisorFirmaComponent,
    CerradasComponent,
    CerradasTTComponent
  ],
  exports: [

   
  ],
  imports: [
    CommonModule,
    PrimeNgModule,
    FormsModule,
    FormsModule,
    ReactiveFormsModule,
   
  ]
})
export class supervisorFirmaMmodule { }
