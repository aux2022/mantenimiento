import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { MenuItem, PrimeNGConfig } from 'primeng/api';
import { ServiceModel } from 'src/app/models/serviceModel';
import { ServiceModelMaquina } from 'src/app/models/serviceModelMaquina';
import { DBConectionService } from 'src/app/Services/dataBaseConection';

@Component({
  selector: 'app-maquina',
  templateUrl: './maquina.component.html',
  styleUrls: ['./maquina.component.css']
})
export class MaquinaComponent implements OnInit {
  datatable: any = []
  datatableMaquina: any = []
  selectedProduct1!: ServiceModel;
  sidebarExpanded = true;
  items!: MenuItem[];
  loading: boolean = true;
  chartOptions: any;
  datatableAreas: any = []
  serviceModel: ServiceModel = new ServiceModel()
  serviceModelMaquina: ServiceModelMaquina = new ServiceModelMaquina()

    constructor(private config: PrimeNGConfig,private toastr: ToastrService,private dBConectionService: DBConectionService) { 
   
    }

  ngOnInit(): void {
    this.ondatatableMaquina();
    this.onDataTableMaquinas()
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
  ondatatableMaquina(){
    this.dBConectionService.getSolicitudArea().subscribe(res=>{
  this.datatableMaquina=res;

    });
  }

  onDataTableMaquinas(){
    this.dBConectionService.getSolicitudMaquina().subscribe(res=>{
  this.datatable=res;
  this.loading = false;

    });
  }
  onAddSolicitudMaquina(serviceModelMaquina: ServiceModelMaquina): void {
    let valor='i'
    let valor2
    for(let item of this.datatable){
     valor2=item.nombre
       if( (document.getElementById('txtNombreMaquina') as HTMLInputElement).value === valor2){
       valor='existe'
       }

    }
if(valor==='existe'){
   this.toastr.error('Esta máquina ya se encuentra en el sistema!');
}else{

  this.dBConectionService.addMaquina(serviceModelMaquina).subscribe((res) => {
    if (res) {

      this.toastr.success('Se ha agregado una nueva máquina ');
          //window.location.reload()
          this. onDataTableMaquinas();
          this.clearCampos();
        
  


    } else {
      alert('Error! :(')

    }
  })
}

  }
  // onDataTable5(){

  //   this.dBConectionService.getSolicitudArea().subscribe(res=>{
  // this.datatable5=res;
  // console.log(this.areas)
  //   });
  // }

  clearCampos(){
    
    // this.serviceModelDispositivo.nombre='';
    // this.serviceModelDispositivo.maquina='';
    // this.serviceModelArea.nombre='';
    // (document.getElementById('txtNombreMaquina') as HTMLInputElement).value=''
     this.serviceModelMaquina.codigo='';
     this.serviceModelMaquina.area='';
     this.serviceModelMaquina.nombre='';
     this.serviceModelMaquina.statusMaquina='';
    // this.serviceModelMecanico.nombre='';
    // this.serviceModelMecanico.nomina='';
    // this.serviceModelMaquina.statusMaquina='';


  }


  deleteMaquina(idMaquina: number):void{
   
        this.dBConectionService.deleteMaquina(idMaquina).subscribe(res=>{
          if(res){
             this.toastr.info(`La máquina número ${idMaquina} se ha eliminado con exito!`);
            this.onDataTableMaquinas();
          }
          else{
            alert('error')
          }
         })

      }

}
