import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ConfirmationService, MenuItem, MessageService, PrimeNGConfig } from 'primeng/api';
import { ServiceModel } from 'src/app/models/serviceModel';
import { DBConectionService } from 'src/app/Services/dataBaseConection';
import { OuthService } from 'src/app/Services/outh.service';

@Component({
  selector: 'app-revisar-aceptar',
  templateUrl: './revisar-aceptar.component.html',
  styleUrls: ['./revisar-aceptar.component.css']
})
export class RevisarAceptarComponent implements OnInit {
  
  datatable: any = []
  serviceModel: ServiceModel = new ServiceModel()
  datatableHist: any = []
  datatableUsuarios: any = []
  datatableMecanico:any=[]
  visibleSidebar1:any
  displayMaximizableR:boolean=false
  displayMaximizable:boolean=false
  target:any;
  items!: MenuItem[];
  itemsMenu!: MenuItem[];
  constructor(private authService: OuthService, private confirmationService: ConfirmationService,private messageService: MessageService, private primengConfig: PrimeNGConfig,private toastr: ToastrService, public route: ActivatedRoute, private router: Router, private dBConectionService: DBConectionService) {
    
  }

  ngOnInit(): void {
   
  
    this.primengConfig.ripple = true;
    this.route.paramMap.subscribe({
      next: (params) => {
        const id = params.get('id')

        if (id) {
          this.dBConectionService.getByIdSolicitud(id)
            .subscribe({
              next: response => {
                this.datatable = response;

                this.items = [
                  { icon: 'pi pi-home', url: '/#' },
                  { label: 'Lista Solicitudes', url: '/Asignar' },
                  { label: 'Revisar Aceptar-'+id },
                ];
              }
            });
        }
      }

    })
this.menuItems()
this.onDataTableUsuarios()
this.onDataTableMecanicos()

  }
  onDataTableMecanicos(){
    this.dBConectionService.getSolicitudMecanico().subscribe(res=>{
  this.datatableMecanico=res;
    });
  }
  public getInputValue(inputValue:string){
   
    let valor='i'
    let valor2
    for(let item of this.datatableMecanico){
     valor2=item.nomina
      if( (document.getElementById('txtNomina') as HTMLInputElement).value === valor2){
      valor='existe'
      }

    }
    if(valor==='existe'){
      this.router.navigate(['/Perfil_usuario/'+inputValue])
      .then(() => {
        window.location.reload();
      });
      
    }else{
      this.toastr.error('Perfil no encontrado :(');

    }

  }
  cargaAsigna(select: any) {
    this.displayMaximizable=true
    this.serviceModel.idSolicitud =select.idSolicitud 
    this.serviceModel.nombreSolicitante =select.nombreSolicitante 
    this.serviceModel.correo =select.correo 
    this.serviceModel.fechaSolicitud=select.fechaSolicitud
    this.serviceModel.horaSolicitud =select.horaSolicitud 
    this.serviceModel.area =select.area 
    this.serviceModel.maquina =select.maquina 
    this.serviceModel.dispositivo=select.dispositivo
    this.serviceModel.descripcionProblema =select.descripcionProblema 
    this.serviceModel.nomina =select.nomina 
    this.serviceModel.nombre =select.nombre 
    this.serviceModel.fechaInicio=select.fechaInicio
    this.serviceModel.horaInicio =select.horaInicio 
    this.serviceModel.diagnostico=select.diagnostico
    this.serviceModel.tipoFalla=select.tipoFalla
    this.serviceModel.emailSent =select.emailSent
    this.serviceModel.nombre2=select.nombre2 
    this.serviceModel.nomina2=select.nomina2
    this.serviceModel.asignacion=select.asignacion 
    this.serviceModel.generoParo =select.generoParo 
    this.serviceModel.paroCorrectivo=select.paroCorrectivo
    this.serviceModel.paroOperativo =select.paroOperativo 
    this.serviceModel.paroRefaccion =select.paroRefaccion 
    this.serviceModel.tiempoTotal =select.tiempoTotal 
    this.serviceModel.grasaUtilizada=select.grasaUtilizada
    this.serviceModel.refaMateHerra =select.refaMateHerra 
    this.serviceModel.fechaFinal =select.fechaFinal 
    this.serviceModel.horaFinal =select.horaFinal 
    this.serviceModel.trabajoSanitizado=select.trabajoSanitizado
    this.serviceModel.estatusActividad =select.estatusActividad 
    this.serviceModel.firmaSolicitante =select.firmaSolicitante 
    this.serviceModel.emailSent2=select.emailSent2
    this.serviceModel.nombre3=select.nombre3
    }
    cargaReAsigna(select: any) {
      this.displayMaximizableR=true
      this.serviceModel.idSolicitud =select.idSolicitud 
      this.serviceModel.nombreSolicitante =select.nombreSolicitante 
      this.serviceModel.correo =select.correo 
      this.serviceModel.fechaSolicitud=select.fechaSolicitud
      this.serviceModel.horaSolicitud =select.horaSolicitud 
      this.serviceModel.area =select.area 
      this.serviceModel.maquina =select.maquina 
      this.serviceModel.dispositivo=select.dispositivo
      this.serviceModel.descripcionProblema =select.descripcionProblema 
      this.serviceModel.nomina =select.nomina 
      this.serviceModel.nombre =select.nombre 
      this.serviceModel.fechaInicio=select.fechaInicio
      this.serviceModel.horaInicio =select.horaInicio 
      this.serviceModel.diagnostico=select.diagnostico
      this.serviceModel.tipoFalla=select.tipoFalla
      this.serviceModel.emailSent =select.emailSent
      this.serviceModel.nombre2=select.nombre2 
      this.serviceModel.nomina2=select.nomina2
      this.serviceModel.asignacion=select.asignacion 
      this.serviceModel.generoParo =select.generoParo 
      this.serviceModel.paroCorrectivo=select.paroCorrectivo
      this.serviceModel.paroOperativo =select.paroOperativo 
      this.serviceModel.paroRefaccion =select.paroRefaccion 
      this.serviceModel.tiempoTotal =select.tiempoTotal 
      this.serviceModel.grasaUtilizada=select.grasaUtilizada
      this.serviceModel.refaMateHerra =select.refaMateHerra 
      this.serviceModel.fechaFinal =select.fechaFinal 
      this.serviceModel.horaFinal =select.horaFinal 
      this.serviceModel.trabajoSanitizado=select.trabajoSanitizado
      this.serviceModel.estatusActividad =select.estatusActividad 
      this.serviceModel.firmaSolicitante =select.firmaSolicitante 
      this.serviceModel.emailSent2=select.emailSent2
      this.serviceModel.nombre3=select.nombre3
      }

  


  onDataTable() {
    this.dBConectionService.getSolicitud().subscribe(res => {
      this.datatable = res;

    });
  }
  onDataTableUsuarios(){
    this.dBConectionService.getSolicitudMecanicos().subscribe(res=>{
  this.datatableUsuarios=res;
  console.log(this.datatableUsuarios)
    });
  }
  onTablehistorialM(){
    this.serviceModel.estatusActividad='';
    this.route.paramMap.subscribe({
      next: (params) => {
        const id = params.get('id')

        if (id) {
          this.dBConectionService.getSolicitudSMToma(id)
          
            .subscribe({
              next: response => {
                this.datatableHist = response;
              
        

              }
            });
        }
      }
    })
  }
  onUpdateSalida(serviceModel: ServiceModel): void {

    serviceModel.emailSent='true2'
    
    let valor3=(document.getElementById('txtNomina1') as HTMLInputElement).value
    let valor0='a'
    let valor4

  let valor='i'
  let valor2
  for(let item of this.datatable){
    valor4=item.nomina
  
     if((document.getElementById('txtNomina1') as HTMLInputElement).value === valor4 ){
     valor='tiene'
     console.log('ya esta', this.datatable)
     }
     else{
       console.log('true',valor3,'valores',valor4)
     }
         
   }

  for(let item of this.datatableUsuarios){
   valor2=item.nomina
 
    if((document.getElementById('txtNomina1') as HTMLInputElement).value === valor2 ){
    valor='existe'
    console.log('nohi')
    }
    else{
      console.log('hi',valor3,'valor',valor2)
    }
        
  }
  if(valor3==='0'){
    this.toastr.error('Número de nomina no encontrado!');
  }
  else{
    if(valor==='existe'){
      this.dBConectionService.addDiagnostico(serviceModel.idSolicitud, serviceModel)
      .subscribe((res) => {
        if (res) {
          this.displayMaximizableR=false
          location.reload();
        } else {
          alert('Error! :(')
        }
      })
    
    }else{
      this.toastr.error('Número de nomina no encontrado!');
  
   
    }
  }
 
  
}


migajaPanMenu() {
  this.items = [
    { icon: 'pi pi-home', routerLink: '/#' },
    { label: 'Lista Solicitudes', routerLink: '/Asignar' },
    { label: 'Revisar Aceptar'+'num.' },
  ];
}

menuItems() {
  this.itemsMenu = [{
  
    label: 'Navegar',
    items: [{
      label: 'Solicitudes',
      icon: 'fas fa-receipt',
      command: () => {

      }
    },
    {
      label: 'Tomadas',
      icon: 'fas fa-check',
      command: () => {

      }
    }
    ]
  },
  {
    label: 'Navegar',
    items: [{
      label: 'Inicio',
      icon: 'pi pi-home',
      routerLink: '/#'
    },
    {
      label: 'Resumen Solicitudes',
      icon: 'fas fa-columns',
      routerLink: '/Vista_Solicitudes_Principal'
    },
    {
      label: 'Cerrar Sesión',
      icon: 'pi pi-power-off',
      command: () => this.CerrarSesion()
    }
    ]
  }
  ];
}


CerrarSesion(){
   

  this.confirmationService.confirm({
    message: '¿Deseas Continuar y Cerrar Sesión?',
    header: 'Confirmación',
    icon: 'pi pi-exclamation-triangle',
  
    accept: () => {
      
      this.authService.logoutSoli()
      this.router.navigateByUrl("#");
        
        this.toastr.info('La sesión ha sido cerrada')
    },
    reject: () => {
      this.toastr.warning('Operación cancelada')
    }
});
}

onUpdateSalida0(serviceModel: ServiceModel): void {
  
    
  serviceModel.emailSent='true'
    let valor='i'
    let valor2
    let valor3=(document.getElementById('txtNomina1') as HTMLInputElement).value
  
    for(let item of this.datatableUsuarios){
     valor2=item.nomina
   
      if((document.getElementById('txtNomina1') as HTMLInputElement).value === valor2 ){
      valor='existe'
      console.log('nohi')
      }
      else{
        console.log('hi',valor3,'valor',valor2)
      }
          
    }

    

    if(valor3==='0'){
      this.toastr.error('Número de nomina no encontrado!');
    }
    else{
      if(valor==='existe'){
        this.dBConectionService.addDiagnostico(serviceModel.idSolicitud, serviceModel)
        .subscribe((res) => {
          if (res) {
          this.displayMaximizableR=false
          location.reload();
          } else {
            alert('Error! :(')
          }
        })
      
      }else{
        this.toastr.error('Número de nomina no encontrado!');
    
     
      }
    }
   
    
  }
onTerm(){
  this.toastr.error('Esta solicitud ya ha sido cerrada!');
}
}
