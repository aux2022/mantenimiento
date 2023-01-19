import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PrimeNgModule } from '../primeNGModule/primeNG.module';
import { ListaGeneralComponent } from './lista-general/lista-general.component';
import { AdministradorComponent } from './Principal/administrador.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { InicioComponent } from './inicio/inicio.component';
import { AreaComponent } from './area/area.component';
import { MaquinaComponent } from './maquina/maquina.component';
import { DispositivoComponent } from './dispositivo/dispositivo.component';
import { MecanicoComponent } from './mecanico/mecanico.component';
import { ReportesComponent } from './reportes/reportes.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { SolicitudesViewComponent } from './solicitudes-view/solicitudes-view.component';
import { HistorialMecanicoComponent } from './historial-mecanico/historial-mecanico.component';




@NgModule({
  declarations: [
    ListaGeneralComponent,
    AdministradorComponent,
    SidebarComponent,
    InicioComponent,
    AreaComponent,
    MaquinaComponent,
    DispositivoComponent,
    MecanicoComponent,
    ReportesComponent,
    SolicitudesViewComponent,
    HistorialMecanicoComponent,
    

    
  
  ],
  exports: [


  ],
  imports: [
    CommonModule,
    PrimeNgModule,
    FormsModule,
    FormsModule,
    ReactiveFormsModule,
    Ng2SearchPipeModule
  ]
})
export class AdminModule { }

