import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MenuItem, PrimeNGConfig } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ServiceModel } from 'src/app/models/serviceModel';
import { DBConectionService } from 'src/app/Services/dataBaseConection';

@Component({
  selector: 'app-lista-general',
  templateUrl: './lista-general.component.html',
  styleUrls: ['./lista-general.component.css'],
  providers: [DialogService]
})
export class ListaGeneralComponent implements OnInit {
  datatable: any = []
  datatableMaquina: any = []
  selectedProduct1!: ServiceModel;
  sidebarExpanded = true;
  items!: MenuItem[];
  loading: boolean = true;
  chartOptions: any;
  datatableHist: any={}
  datatableAreas: any = []
  statuses!: any[];
  idSolicitudm:string=""
  serviceModel: ServiceModel = new ServiceModel()
  constructor(private config: PrimeNGConfig,private dBConectionService: DBConectionService,public route: ActivatedRoute,public dialogService: DialogService) { }

  ngOnInit(): void {
    this.dBConectionService.getSolicitud().subscribe(res => {
      this.datatable = res;
      this.loading = false;
  });
  this.HistorialMecani();
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

  HistorialMecani(){
    this.serviceModel.estatusActividad='';
    this.route.paramMap.subscribe({
      next: (params) => {
        const id = params.get('id')

        if (id) {
          this.dBConectionService.getSolicitudSMToma(id)
          
            .subscribe({
              next: response => {
                this.datatableHist = response;
              
          this.idSolicitudm=id;

              }
            });
        }
      }


    })
  }


}
