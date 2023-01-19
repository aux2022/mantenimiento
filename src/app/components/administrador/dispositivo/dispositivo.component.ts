import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { MenuItem, PrimeNGConfig } from 'primeng/api';
import { ServiceModel } from 'src/app/models/serviceModel';
import { ServiceModelDispositivo } from 'src/app/models/serviceModelDispositivo';
import { DBConectionService } from 'src/app/Services/dataBaseConection';

@Component({
  selector: 'app-dispositivo',
  templateUrl: './dispositivo.component.html',
  styleUrls: ['./dispositivo.component.css']
})
export class DispositivoComponent implements OnInit {
  datatableAr: any = []//carga las areas
  datatable3: any = []//carga las maquinas
  datatableDispos: any = []//carga la tabla
  selectedProduct1!: ServiceModel;
  sidebarExpanded = true;
  items!: MenuItem[];
  loading: boolean = true;
  chartOptions: any;
  searchTextAr:any
  searchTextMaq:any
  serviceModel: ServiceModel = new ServiceModel()
  serviceModelDispositivo: ServiceModelDispositivo = new ServiceModelDispositivo()

    constructor(private config: PrimeNGConfig,private toastr: ToastrService,private dBConectionService: DBConectionService) { 
   
    }

  ngOnInit(): void {
    this.onDataTableDispositivos()
    this.ondatatableDispos()
    this.onDataTable3()
    this.traslate();
  }

  traslate() {
    this.config.setTranslation({
      accept: 'Accept',
      reject: 'Cancel',
      apply: 'Aplicar',
      clear: 'Limpiar',
      addRule: 'Agregar regla',
      matchAll: 'Coincidir con todos',
      matchAny: 'Coincidir con ninguno',
      startsWith: 'Inicia con',
      contains: 'Contiene',
      notContains: 'No contiene',
      endsWith: 'Termina con',
      equals: 'Es igual',
      notEquals: 'No es igual',

      //translations
    });
  }

  onDataTable3(){
    this.dBConectionService.getSolicitudMaquina().subscribe(res=>{
  this.datatable3=res;
    });
  }

  onDataTableDispositivos(){
    this.dBConectionService.getSolicitudArea().subscribe(res=>{
  this.datatableAr=res;
  this.loading = false;

    });
  }
  ondatatableDispos(){

    this.dBConectionService.getSolicitudDispositivo().subscribe(res=>{
  this.datatableDispos=res;
    });
  }
  
  onAddSolicitudDispositivo(serviceModelDispositivo: ServiceModelDispositivo ): void {
    let valor='i'
    let valor2
    for(let item of this.datatableDispos){
     valor2=item.nombre
       if( (document.getElementById('txtNombreDispositivo') as HTMLInputElement).value === valor2){
       valor='existe'
       }

    }
if(valor==='existe'){
   this.toastr.error('Este dispositivo ya se encuentra en el sistema!');
}else{

  this.dBConectionService.addDispositivo(serviceModelDispositivo).subscribe((res) => {
    if (res) {
console.log(res)

this.toastr.success('Se ha agregado un nuevo dispositivo');
          
          this.onDataTableDispositivos();
          this.clearCampos();
        
  


    } else {
      alert('Error! :(')

    }
  })
}

  }
  onDataTable5(){

    this.dBConectionService.getSolicitudArea().subscribe(res=>{
  this.datatableDispos=res;
    });
  }

  clearCampos(){
    
     this.serviceModelDispositivo.nombre='';
     this.serviceModelDispositivo.maquina='';
     this.serviceModelDispositivo.nombre='';
    // this.serviceModelArea.nombre='';
    // (document.getElementById('txtNombreMaquina') as HTMLInputElement).value=''
    // this.serviceModelMaquina.codigo='';
    // this.serviceModelMaquina.area='';
    // this.serviceModelMecanico.nombre='';
    // this.serviceModelMecanico.nomina='';
    // this.serviceModelMaquina.statusMaquina='';


  }


  deleteDispositivos(idDispositivo: number):void{
   
        this.dBConectionService.deleteDispositivo(idDispositivo).subscribe(res=>{
          if(res){
             this.toastr.info(`El dispositivo número ${idDispositivo} se ha eliminado con exito!`);
            this.onDataTableDispositivos();
          }
          else{
            alert('error')
          }
         })

      }


    }