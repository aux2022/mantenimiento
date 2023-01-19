import { PaginaPrincipalComponent } from './components/pagina-principal/pagina-principal.component';
import { FormularioSolicitudComponent } from './components/formulario-solicitud/formulario-solicitud.component';
import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { AppComponent }   from './app.component';
import { DBConectionService } from './Services/dataBaseConection';;
import { ConfirmationService, MessageService } from "primeng/api";
import { NavegacionBarInicioComponent } from './components/navegacion-bar-inicio/navegacion-bar-inicio.component';
import { AppRoutingModule } from './app-routing.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ListaMostrarSolicitudesComponent } from './components/lista-mostrar-solicitudes/lista-mostrar-solicitudes.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { GlobalLoginComponent } from './components/lista-solicitudes/global-login/global-login.component';
import { PerfilUsuarioComponent } from './components/perfil-usuario/perfil-usuario.component';
import { LoginSupervisorComponent } from './components/supervisor-firma/loginSF/login-supervisor.component';
import { supervisorFirmaMmodule } from './components/supervisor-firma/supervisorFirma.module';
import { PrimeNgModule } from './components/primeNGModule/primeNG.module';
import { solicitudesAsignarModule } from './components/lista-solicitudes/solicitudes-Asignar.module';
import { FileSaverModule } from 'ngx-filesaver';
import { AdminModule } from './components/administrador/admin.module';
import { LoginAdminComponent } from './components/administrador/login-admin/login-admin.component';
@NgModule({
  declarations: [
    AppComponent,
    PaginaPrincipalComponent,
    FormularioSolicitudComponent,
    NavegacionBarInicioComponent,
    ListaMostrarSolicitudesComponent,
    
    PerfilUsuarioComponent,
    LoginSupervisorComponent,
    LoginAdminComponent,
    GlobalLoginComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    HttpClientModule,
    FormsModule,
    FontAwesomeModule,
    Ng2SearchPipeModule,
    FormsModule,
    ReactiveFormsModule,
    supervisorFirmaMmodule,
    solicitudesAsignarModule,
    AdminModule,
    PrimeNgModule,
    FileSaverModule
  ],

  bootstrap:    [ AppComponent ],
  providers: [DBConectionService,ConfirmationService, MessageService]
})
export class AppModule { }
