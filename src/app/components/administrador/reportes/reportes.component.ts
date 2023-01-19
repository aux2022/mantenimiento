import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { ServiceModel } from 'src/app/models/serviceModel';
import { DBConectionService } from 'src/app/Services/dataBaseConection';

@Component({
  selector: 'app-reportes',
  templateUrl: './reportes.component.html',
  styleUrls: ['./reportes.component.css']
})
export class ReportesComponent implements OnInit {
  datatable: any = []
  selectedProduct1!: ServiceModel;
  sidebarExpanded = true;
  items!: MenuItem[];
  loading: boolean = true;
  chartOptions: any;
    constructor(private dBConectionService: DBConectionService) { 
   
    }

  ngOnInit(): void {
  }

}
