import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ServiceModel } from 'src/app/models/serviceModel';
import { DBConectionService } from 'src/app/Services/dataBaseConection';
import { OuthService } from 'src/app/Services/outh.service';

@Component({
  selector: 'app-historial-mecanico',
  templateUrl: './historial-mecanico.component.html',
  styleUrls: ['./historial-mecanico.component.css']
})
export class HistorialMecanicoComponent implements OnInit {
  datatable: any = []
  selectedProduct1!: ServiceModel;
  sidebarExpanded = true;
  idSolicitudm:string=""
  serviceModel: ServiceModel = new ServiceModel()
  constructor(private Outh:OuthService,public route: ActivatedRoute,private router: Router, private dBConectionService: DBConectionService) { }


  ngOnInit(): void {
    this.serviceModel.estatusActividad='';
    this.route.paramMap.subscribe({
      next: (params) => {
        const id = params.get('id')

        if (id) {
          this.dBConectionService.getSolicitudSMToma(id)
          
            .subscribe({
              next: response => {
                this.datatable = response;
              
          this.idSolicitudm=id;

              }
            });
        }
      }


    })
  }

}
