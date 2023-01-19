import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {MenuItem, MessageService, PrimeNGConfig} from 'primeng/api';
import { ServiceModel } from 'src/app/models/serviceModel';
import { ServiceModelArea } from 'src/app/models/serviceModelArea';
import { ServiceModelDispositivo } from 'src/app/models/serviceModelDispositivo';
import { ServiceModelMaquina } from 'src/app/models/serviceModelMaquina';
import { DBConectionService } from 'src/app/Services/dataBaseConection';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-formulario-solicitud',
  templateUrl: './formulario-solicitud.component.html',
  styleUrls: ['./formulario-solicitud.component.css'],
  providers: [MessageService]
})
export class FormularioSolicitudComponent implements OnInit {

  serviceModel: ServiceModel = new ServiceModel()
  serviceModelArea: ServiceModelArea = new ServiceModelArea()
  serviceModelMaquina: ServiceModelMaquina = new ServiceModelMaquina()
  serviceModelDispositivo: ServiceModelDispositivo = new ServiceModelDispositivo()
  searchText:any
  searchTextDisp:any
  datatable: any = []
  maqunasAreas: any = []
  areas: any = []
  dispositivos: any=[]
  visibleSidebar1: any;
   items!: MenuItem[];
   home!: MenuItem;
  constructor(public route: ActivatedRoute,private dBConectionService: DBConectionService, private primengConfig: PrimeNGConfig,private toastr: ToastrService) { }

  ngOnInit() {
    this.items = [
      {icon: 'pi pi-home',routerLink: '/#'},
      {label:'Solicitar'},
  ];
  // this.home = {icon: 'pi pi-home',url: '#'};
    this.serviceModel.maquina = '';
    this.serviceModel.area = '';
    this.serviceModel.dispositivo='';
    this.primengConfig.ripple = true;
    this.onDataTable2();
    this.onDataTable3();
    this.onDataTable4();
  }

  





  onDataTable3(){
    this.dBConectionService.getSolicitudArea().subscribe(res=>{
  this.areas=res;
    });
  }
  
  onDataTable4(){
    this.dBConectionService.getSolicitudDispositivo().subscribe(res=>{
  this.dispositivos=res;
    });
  }
  onDataTable2(){
    this.dBConectionService.getSolicitudMaquina().subscribe(res=>{
  this.maqunasAreas=res;

    });
  }

  clear_campos(){
    this.serviceModel.nombreSolicitante=''
    this.serviceModel.maquina = '';
    this.serviceModel.area = '';
    this.serviceModel.dispositivo='';
    this.serviceModel.descripcionProblema=''
  }

  onAddSolicitud(serviceModel: ServiceModel): void {
   
      this.dBConectionService.addSolicitud(serviceModel).subscribe((res) => {
        if (res) {
          this.clear_campos()
          this.toastr.success('Operacion exitosa!', 'Solicitud enviada!');

        } else {
          alert('Error! :(')

        }
      })
    }
GetMaquinaArea(){
  this.dBConectionService.getSolicitudMaquina().subscribe(res=>{
    this.maqunasAreas=res;
    for(let i = 0 ; i < this.maqunasAreas.lenght ; i++){
     if(this.maqunasAreas.area==='Extrusión'){

     }
  }
      });

}

}
