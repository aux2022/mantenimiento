import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ListaSolicitudesComponent } from './lista-solicitudesPrincipal/lista-solicitudes.component';
import { SolicitudesTomadasComponent } from './solicitudes-tomadas/solicitudes-tomadas.component';
import { PrimeNgModule } from '../primeNGModule/primeNG.module';
import { RevisarAceptarComponent } from './revisar-aceptar/revisar-aceptar.component';






@NgModule({
  declarations: [
    ListaSolicitudesComponent,
    SolicitudesTomadasComponent,
    RevisarAceptarComponent
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
export class solicitudesAsignarModule { }

