import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServiceModel } from 'src/app/models/serviceModel';
import { DBConectionService } from 'src/app/Services/dataBaseConection';
import { OuthService } from 'src/app/Services/outh.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {
datatableAbiertas:any=[]
datatableCerradas:any=[]
datatableTerminadas:any=[]
datatableProceso:any=[]
datatableCancel:any=[]
datatable:any=[]
loading: boolean = true;
first = 0;
selectedProduct1!: ServiceModel[];
value: number = 0;
  constructor(private dBConectionService: DBConectionService,private authService: OuthService,public router: Router) { }

  ngOnInit(): void {
    this.onDataTableProceso();
    this.onDataTableCerradas();//solo cerradas satisfac
    this.onDataTableTerminadasTemp();//trabajo temp
    this.onDataTableCanceladas();
    this.onDataTableTodas();
  }

  onDataTableProceso(){
    this.dBConectionService.getSolicituPendientes().subscribe(res => {
      this.datatableProceso = res;
     
  });
  }
  
logout(){
  this.authService.loginAdmin()
  this.router.navigateByUrl("#");
}
  onDataTableCerradas(){
    this.dBConectionService.getSolicituCerradas().subscribe(res => {
      this.datatableCerradas = res;
      return this.datatableCerradas
      
  });
  }
  onDataTableTerminadasTemp(){
    this.dBConectionService.getSolicituTemporales().subscribe(res => {
      this.datatableTerminadas = res;
  });
  }

  onDataTableCanceladas(){
    let valorCancels=0;
    this.dBConectionService.getSolicitudTerminada().subscribe(res => {
      this.datatableCancel = res;
     return this.datatableCancel
  });


  

  }

  onDataTableTodas(){
    this.dBConectionService.getSolicitud().subscribe(res => {
      this.datatable = res;
  });
  }
 

 
}
