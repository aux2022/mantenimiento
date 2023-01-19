import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { ServiceModel } from '../models/serviceModel';
import { ServiceModelArea } from '../models/serviceModelArea';
import { Observable } from 'rxjs';
import { ServiceModelMecanico } from '../models/serviceModelMecanico';
import { ServiceModelMaquina } from '../models/serviceModelMaquina';
import { ServiceModelDispositivo } from '../models/serviceModelDispositivo';

@Injectable({
  providedIn: 'root'
})
export class DBConectionService {
  constructor(private http: HttpClient) {}
  urlServices:string="http://172.16.10.239:8090/api/";
  //urlServices:string="http://172.16.10.239:8090/api/";


  //regresar todas las solicitudes
  getSolicitud(){
    return this.http.get(this.urlServices+'solicitud');

   }

   //regresar todos los usuarios
   getUsuarios(){
    return this.http.get(this.urlServices+'usuarios');

   }

   //resgresar todas las areas
   getSolicitudArea(){
    return this.http.get(this.urlServices+'solicitudarea');

   }

   //regresar todas las maquinas
   getSolicitudMaquina(){
    return this.http.get(this.urlServices+'solicitudmaquina');

   }

   //regresar todos los mecanicos
   getSolicitudMecanico(){
    return this.http.get(this.urlServices+'solicitudmecanicos');

   }

   //regresar todos los dispositivos
   getSolicitudDispositivo(){
    return this.http.get(this.urlServices+'solicituddispositivo');

   }

   //regresar todos los mecanicos
   getSolicitudMecanicos(){
    return this.http.get(this.urlServices+'Solicitudmecanicos');

   }
   /**filtrar nomina 1 */
   getSolicitudSM(id_Solicitud: string){
    return this.http.get(this.urlServices+'solicitud6'+ `/${id_Solicitud}`);

   }
   /**filtrar nomina cierre */
   getSolicitudSMCierre(id_Solicitud: string){
    return this.http.get(this.urlServices+'GetSolicitudesCerradas'+ `/${id_Solicitud}`);

   }

   /**filtrar nomina cierre temporal*/
   getSolicitudSMCierreTemp(id_Solicitud: string){
    return this.http.get(this.urlServices+'GetCierreTrabTemp'+ `/${id_Solicitud}`);

   }
   /**filtrar nomina 2 */
   getSolicitudSM2(id_Solicitud: string){
    return this.http.get(this.urlServices+'solicitud7'+ `/${id_Solicitud}`);

   }
   /**Filtrar historial de mecanicos que han tomado la solicitud */
   getSolicitudSMToma(id_Solicitud: string){
    return this.http.get(this.urlServices+'SolicitudHistorial'+ `/${id_Solicitud}`);

   }
   /**Filtrar por area de supervisor /Extrusión*/
   getSolicitudSuperArea(id_Solicitud: string){
    return this.http.get(this.urlServices+'GetSuperArea'+ `/${id_Solicitud}`);

   }
     /**Filtrar por area de supervisor tem /Extrusión*/
     getSolicitudSuperAreaTT(id_Solicitud: string){
      return this.http.get(this.urlServices+'SolicitudesTrabajoTemp'+ `/${id_Solicitud}`);

     }
       /**Filtrar por area de supervisor cerradas/Extrusión*/
   getSolicitudSuperAreaCerradas(id_Solicitud: string){
    return this.http.get(this.urlServices+'SolicitudesCerradas'+ `/${id_Solicitud}`);

   }
   /**obtener datos por id */
   getByIdSolicitud(id_Solicitud: string): Observable<ServiceModel> {
    return this.http.get<ServiceModel>(this.urlServices +'Solicitud'+ `/${id_Solicitud}`)
  }
   /**para crear los primeros campos de la solicitud etapa 1 */
   addSolicitud(serviceModel:ServiceModel): Observable <ServiceModel> {
    return this.http.post<ServiceModel>(this.urlServices +'Solicitud2', serviceModel)
  }

  //agregar areas
  addArea(serviceModelArea:ServiceModelArea): Observable <ServiceModelArea> {
    return this.http.post<ServiceModelArea>(this.urlServices +'Solicitudarea', serviceModelArea)
  }

  //agregar mecanicos
  addMecanico(serviceModelMecanico:ServiceModelMecanico): Observable <ServiceModelMecanico> {
    return this.http.post<ServiceModelMecanico>(this.urlServices +'Solicitudmecanicos', serviceModelMecanico)
  }

//agregar maquinas
  addMaquina(serviceModelMaquina:ServiceModelMaquina): Observable <ServiceModelMaquina> {
    return this.http.post<ServiceModelMaquina>(this.urlServices +'Solicitudmaquina', serviceModelMaquina)
  }

  //agregar dispositivos
  addDispositivo(serviceModelDispositivo:ServiceModelDispositivo): Observable <ServiceModelDispositivo> {
    return this.http.post<ServiceModelDispositivo>(this.urlServices +'Solicituddispositivo', serviceModelDispositivo)
  }
  /**campos diagnostico etapa 2 */
  addDiagnostico( id_Solicitud: number, serviceModel:ServiceModel): Observable<ServiceModel> {
    return this.http.put<ServiceModel>(this.urlServices +'Solicitud3'+`/${id_Solicitud}`, serviceModel)
  }
  /**campos tareas ejecutadas-tiempos etapa 3 */
  addTareas(id_Solicitud: number, serviceModel:ServiceModel): Observable <ServiceModel> {
    return this.http.put<ServiceModel>(this.urlServices +'Solicitud4'+`/${id_Solicitud}`, serviceModel)
  }
  /**campos revision etapa 4 */

  addRevision(id_Solicitud: number, serviceModel:ServiceModel): Observable <ServiceModel> {
    return this.http.put<ServiceModel>(this.urlServices +'Solicitud5'+`/${id_Solicitud}`, serviceModel)
  }

  updateSolicitud( idSolicitud: number, serviceModel:ServiceModel): Observable<ServiceModel> {
    return this.http.put<ServiceModel>(this.urlServices +'Solicitud'+ `/${idSolicitud}`, serviceModel)
  }
/**obtener datos por area */
getByIdSolicitudArea(MaqA: string): Observable<ServiceModel> {
  return this.http.get<ServiceModel>(this.urlServices +'FiltroMaqAre'+ `/${MaqA}`)
}
/**solicitudes tomadas */
getSolicitudTomada(){return this.http.get(this.urlServices+'Tomadas');}
/**solicitudes terminadas */
getSolicitudTerminada(){return this.http.get(this.urlServices+'Terminadas');}
/**solicitudes pendientes*/
getSolicituPendiente(){return this.http.get(this.urlServices+'Pendientes');}

/**estos son todos los metodos que se crearon para eliminar en la parte de catalogos para el Admin */
deleteMecanico(IdMecanico:number){return this.http.delete(this.urlServices+'Solicitudmecanicos'+`/${IdMecanico}`)}


deleteArea(idArea:number){return this.http.delete(this.urlServices+'Solicitudarea'+`/${idArea}`)}

deleteDispositivo(idDispositivo:number){return this.http.delete(this.urlServices+'Solicituddispositivo'+`/${idDispositivo}`)}

deleteMaquina(idMaquina:number){return this.http.delete(this.urlServices+'Solicitudmaquina'+`/${idMaquina}`)}

/**estos son todos los metodos que se crearon para actualizar en la parte de catalogos Admin */
updateMaquina(idMaquina:number, serviceModelMaquina:ServiceModelMaquina):Observable<ServiceModelMaquina>{return this.http.put<ServiceModelMaquina>(this.urlServices+'Solicitudmaquina'+`/${idMaquina}`, serviceModelMaquina);}

/**general cerradas,proceso,temporales */
getSolicituPendientes(){return this.http.get(this.urlServices+'Proceso');}
getSolicituCerradas(){return this.http.get(this.urlServices+'Cerradas');}
getSolicituTemporales(){return this.http.get(this.urlServices+'Temporales');}
/**general cerradas,proceso,temporales */
}

//deleteMecanico(IdMecanico:number){return this.http.delete(this.getUsuarios+`/${IdMecanico}`)}
