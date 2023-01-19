import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { MenuItem, PrimeNGConfig } from 'primeng/api';
import { ServiceModel } from 'src/app/models/serviceModel';
import { ServiceModelMecanico } from 'src/app/models/serviceModelMecanico';
import { DBConectionService } from 'src/app/Services/dataBaseConection';

@Component({
  selector: 'app-mecanico',
  templateUrl: './mecanico.component.html',
  styleUrls: ['./mecanico.component.css']
})
export class MecanicoComponent implements OnInit {
  datatable: any = []
  selectedProduct1!: ServiceModel;
  sidebarExpanded = true;
  items!: MenuItem[];
  loading: boolean = true;
  chartOptions: any;

  serviceModel: ServiceModel = new ServiceModel()
  serviceModelMecanico: ServiceModelMecanico = new ServiceModelMecanico()
    constructor(private config: PrimeNGConfig,private dBConectionService: DBConectionService,private toastr: ToastrService) { 
   
    }

  ngOnInit(): void {
    this.onDataTableMecanicos()
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
  onDataTableMecanicos(){
    this.dBConectionService.getSolicitudMecanico().subscribe(res=>{
  this.datatable=res;
  this.loading = false;
    });
  }
  

  onAddSolicitudMecanico(serviceModelMecanico: ServiceModelMecanico): void {
    let valor='i'
    let valor2
    for(let item of this.datatable){
     valor2=item.nomina
      if( (document.getElementById('txtNomina') as HTMLInputElement).value === valor2){
      valor='existe'
      }

    }
    if(valor==='existe'){
      this.toastr.error('Esta persona ya se encuentra en el sistema!');
    }else{
      this.dBConectionService.addMecanico(serviceModelMecanico).subscribe((res) => {
        if (res) {
  
this.toastr.success('El mecánico se ha agregado al sistema')
        this.onDataTableMecanicos();
        this.clearCampos();


        } else {
          alert('Error! :(')

        }
      })
    }

  }

  deleteMecanicos(idMecanico:number):void{ 
       this.dBConectionService.deleteMecanico(idMecanico).subscribe(res=>{
        if(res){
          this.toastr.info(`El mecánico número ${idMecanico} se ha eliminado con exito!`);
          this.onDataTableMecanicos();
        }
        else{
          alert('error')
        }
       })

      }

      clearCampos(){
    
        // this.serviceModelDispositivo.nombre='';
        // this.serviceModelDispositivo.maquina='';
        // this.serviceModelArea.nombre='';
        // (document.getElementById('txtNombreMaquina') as HTMLInputElement).value=''
        
       this.serviceModelMecanico.nombre='';
         this.serviceModelMecanico.nomina='';
        // this.serviceModelMaquina.statusMaquina='';
    
    
      }
    }
