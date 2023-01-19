import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { MenuItem, PrimeNGConfig } from 'primeng/api';
import { ServiceModel } from 'src/app/models/serviceModel';
import { ServiceModelArea } from 'src/app/models/serviceModelArea';
import { DBConectionService } from 'src/app/Services/dataBaseConection';

@Component({
  selector: 'app-area',
  templateUrl: './area.component.html',
  styleUrls: ['./area.component.css']
})
export class AreaComponent implements OnInit {
  datatable: any = []
  selectedProduct1!: ServiceModel;
  sidebarExpanded = true;
  items!: MenuItem[];
  loading: boolean = true;
  chartOptions: any;

  serviceModel: ServiceModel = new ServiceModel()
  serviceModelArea: ServiceModelArea = new ServiceModelArea()

    constructor(private config: PrimeNGConfig,private toastr: ToastrService,private dBConectionService: DBConectionService) { 
   
    }

  ngOnInit(): void {
    this.onDataTableAreas()
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

  onDataTableAreas(){
    this.dBConectionService.getSolicitudArea().subscribe(res=>{
  this.datatable=res;
  this.loading = false;

    });
  }
  onAddSolicitud(serviceModelArea: ServiceModelArea): void {
    let valor='i'
    let valor2
    for(let item of this.datatable){
     valor2=item.nombre
      if( (document.getElementById('txtNombreArea') as HTMLInputElement).value === valor2){
      valor='existe'
      }

    }
if(valor==='existe'){
   this.toastr.error('Esta área ya se encuentra en el sistema!');
}else{

  this.dBConectionService.addArea(serviceModelArea).subscribe((res) => {
    if (res) {
      this.toastr.success('Se ha agregado una nueva área ');
          //window.location.reload()
          this.onDataTableAreas();
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
     this.serviceModelArea.nombre='';
    // (document.getElementById('txtNombreMaquina') as HTMLInputElement).value=''
    // this.serviceModelMaquina.codigo='';
    // this.serviceModelMaquina.area='';
    // this.serviceModelMecanico.nombre='';
    // this.serviceModelMecanico.nomina='';
    // this.serviceModelMaquina.statusMaquina='';


  }


  deleteAreas(idArea: number):void{
   
        this.dBConectionService.deleteArea(idArea).subscribe(res=>{
          if(res){
             this.toastr.info(`El área número ${idArea} se ha eliminado con exito!`);
            this.onDataTableAreas();
          }
          else{
            alert('error')
          }
         })

      }



   
  }

