import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormularioSolicitudComponent } from './components/formulario-solicitud/formulario-solicitud.component';
import { GlobalLoginComponent } from './components/lista-solicitudes/global-login/global-login.component';
import { ListaMostrarSolicitudesComponent } from './components/lista-mostrar-solicitudes/lista-mostrar-solicitudes.component';
import { LoginSupervisorComponent } from './components/supervisor-firma/loginSF/login-supervisor.component';
import { PaginaPrincipalComponent } from './components/pagina-principal/pagina-principal.component';
import { PerfilUsuarioComponent } from './components/perfil-usuario/perfil-usuario.component';
import { RevisarAceptarComponent } from './components/lista-solicitudes/revisar-aceptar/revisar-aceptar.component';
import { SupervisorFirmaComponent } from './components/supervisor-firma/principalSF/supervisor-firma.component';
import { SupervisorLogGuard } from './guards/supervisor-log.guard';
import { CerradasComponent } from './components/supervisor-firma/cerradas/cerradas.component';
import { CerradasTTComponent } from './components/supervisor-firma/cerradas-tt/cerradas-tt.component';
import { SolicitudesTomadasComponent } from './components/lista-solicitudes/solicitudes-tomadas/solicitudes-tomadas.component';
import { ListaSolicitudesComponent } from './components/lista-solicitudes/lista-solicitudesPrincipal/lista-solicitudes.component';
import { AdministradorComponent } from './components/administrador/Principal/administrador.component';
import { ListaGeneralComponent } from './components/administrador/lista-general/lista-general.component';
import { MecanicoComponent } from './components/administrador/mecanico/mecanico.component';
import { DispositivoComponent } from './components/administrador/dispositivo/dispositivo.component';
import { MaquinaComponent } from './components/administrador/maquina/maquina.component';
import { AreaComponent } from './components/administrador/area/area.component';
import { ReportesComponent } from './components/administrador/reportes/reportes.component';
import { SolicitdsLogGuard } from './guards/solicitds-log.guard';
import { HistorialMecanicoComponent } from './components/administrador/historial-mecanico/historial-mecanico.component';
import { LoginAdminComponent } from './components/administrador/login-admin/login-admin.component';
import { InicioComponent } from './components/administrador/inicio/inicio.component';
import { AdminLogGuard } from './guards/admin-log.guard';
import { SolicitudesViewComponent } from './components/administrador/solicitudes-view/solicitudes-view.component';

const routes: Routes = [
  {path:'',
component:PaginaPrincipalComponent,
pathMatch:'full'
}
,
  {path:'Asignar',
component:ListaSolicitudesComponent,canActivate:[SolicitdsLogGuard]

},
{path:'tomadas_Asignar',
component:SolicitudesTomadasComponent,canActivate:[SolicitdsLogGuard]

},
{path:'Solicitar',
component:FormularioSolicitudComponent,

},
{path:'Vista_Solicitudes_Principal',
component:ListaMostrarSolicitudesComponent,

},
{path:'Formulario_solicitar',
component:FormularioSolicitudComponent,

},
{path:'Login_global',
component:GlobalLoginComponent,

},
{
  path:'login_Supervisor',component:LoginSupervisorComponent
},
{path:'loginAdmin',
component:LoginAdminComponent

},
{path:'Revisar_aceptar/:id',
component:RevisarAceptarComponent,

},
{path:'Perfil_usuario/:id',
component:PerfilUsuarioComponent,

},
{path:'supervisor_firma/:id',
component:SupervisorFirmaComponent,canActivate:[SupervisorLogGuard]

},
{path:'cerradas/:id',
component:CerradasComponent,canActivate:[SupervisorLogGuard]

},
{path:'cerradas_Trabajo-temporal/:id',
component:CerradasTTComponent,canActivate:[SupervisorLogGuard]

},


/**admins */

{path:'Administrador',
component:AdministradorComponent,canActivate:[AdminLogGuard]

},


{path:'inicio',
component:InicioComponent,canActivate:[AdminLogGuard]

},
{path:'Areas',
component:AreaComponent,canActivate:[AdminLogGuard]

},
{path:'listaGeneral',
component:ListaGeneralComponent,canActivate:[AdminLogGuard]

},
{path:'Maquinas',
component:MaquinaComponent,canActivate:[AdminLogGuard]

},
{path:'Dispositivos',
component:DispositivoComponent,canActivate:[AdminLogGuard]

},
{path:'Mecanicos',
component:MecanicoComponent,canActivate:[AdminLogGuard]

},
{path:'HistorialMC/:id',
component:HistorialMecanicoComponent,canActivate:[AdminLogGuard]

},

{path:'reportes',
component:ReportesComponent,canActivate:[AdminLogGuard]

},
{path:'solicitudesView',
component:SolicitudesViewComponent,canActivate:[AdminLogGuard]

},

 {path:'**',
 redirectTo:''
 }



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
