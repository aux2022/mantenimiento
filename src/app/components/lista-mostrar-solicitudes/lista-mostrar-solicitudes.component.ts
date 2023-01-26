import { Component, OnInit, ViewChild } from '@angular/core';
import { MenuItem, SortEvent } from 'primeng/api';
import { Table } from 'primeng/table';
import { PrimeNGConfig } from 'primeng/api';
import { ServiceModel } from 'src/app/models/serviceModel';
import { DBConectionService } from 'src/app/Services/dataBaseConection';
import { ActivatedRoute, Router } from '@angular/router';

import * as XLSX from 'xlsx';
@Component({
  selector: 'app-lista-mostrar-solicitudes',
  templateUrl: './lista-mostrar-solicitudes.component.html',
  styleUrls: ['./lista-mostrar-solicitudes.component.css']
})
export class ListaMostrarSolicitudesComponent implements OnInit {
  datatable: any = []
  frozenCols!: any[];


    selectedCustomers!: ServiceModel[];

    balanceFrozen: boolean = false;
    selectedProduct1!: ServiceModel;
    statuses!: any[];
    areas!: any[];

    loading: boolean = true;
    visibleSidebar1: any;
    @ViewChild('dt1') table?: Table;
     items!: MenuItem[];


  constructor(private dBConectionService: DBConectionService,private config: PrimeNGConfig,public route: ActivatedRoute,private router: Router) { }


  ngOnInit(): void {
    this.items = [
      {icon: 'pi pi-home',routerLink: '/#'},
      {label:'Vista de Solicitudes'},
  ];

  this.config.setTranslation({
    accept: 'Accept',
    reject: 'Cancel',
    apply:'Aplicar',
    clear:'Limpiar',
    addRule:'Agregar regla',
    matchAll:'Coincidir con todos',
    matchAny:'Coincidir con ninguno',
    startsWith:'Inicia con',
    contains:'Contiene',
    notContains:'No contiene',
    endsWith:'Termina con',
    equals:'Es igual',
    notEquals:'No es igual',

    //calendar
    dateIs: 'La fecha es..',
    dateIsNot:'La fecha es diferente..',
    dateBefore:'Anterior a..',
    dateAfter:'Superior a..',
monthNames:['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'],
dayNamesShort:['Lu','Ma','Mi','Ju','Vi','Sa','Do'],
dayNames:['Lu','Ma','Mi','Ju','Vi','Sa','Do'],
monthNamesShort:['Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Sept','Oct','Nov','Dic'],
dayNamesMin:['Lu','Ma','Mi','Ju','Vi','Sa','Do'],


    //translations
});
    this.dBConectionService.getSolicitud().subscribe(res => {
      this.datatable = res;
      this.loading = false;
      this.datatable.forEach((res: { fechaSolicitud: any; fechaInicio:any; fechaFinal:any; fechaFirma:any}) =>
      (
     res.fechaSolicitud = new Date(res.fechaSolicitud),
      res.fechaInicio = new Date(res.fechaInicio),
      res.fechaFinal=new Date(res.fechaFinal),
      res.fechaFirma= new Date(res.fechaFirma)
      )



      );
  });
  this.frozenCols = [
    { field: 'id', header: 'ID' }
];

this.statuses = [
  {label: 'Cancelado', value: 'Cancelado'},
  {label: 'Sin estatus', value: ''},
  {label: 'Trabajo temporal', value: 'Falta de refacción(Trabajo Temporal)'},
  {label: 'Terminado', value: 'Terminado'}
]



this.areas = [
  { label: 'Extrusión', value: 'Extrusión' },
  { label: 'Impresión', value: 'Impresión' },
  { label: 'Pouch', value: 'Pouch' },
  { label: 'Laminado', value: 'Laminado' },
  { label: 'Refilado', value: 'Refilado' },
  { label: 'Bolseo', value: 'Bolseo' }
]
}
name = 'ExcelSheet.xlsx';
exportToExcel(): void {
  let element = document.getElementById('dt1');
  const worksheet: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);

  const book: XLSX.WorkBook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(book, worksheet, 'Sheet1');

  XLSX.writeFile(book, this.name);
}

}
