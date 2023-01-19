import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuItem, PrimeNGConfig } from 'primeng/api';
import { Table } from 'primeng/table';
import { ServiceModel } from 'src/app/models/serviceModel';
import { DBConectionService } from 'src/app/Services/dataBaseConection';
import { OuthService } from 'src/app/Services/outh.service';
import * as XLSX from 'xlsx';
@Component({
  selector: 'app-solicitudes-view',
  templateUrl: './solicitudes-view.component.html',
  styleUrls: ['./solicitudes-view.component.css']
})
export class SolicitudesViewComponent implements OnInit {
  datatable: any = []
  frozenCols!: any[];



  sidebarExpanded = true;
  balanceFrozen: boolean = false;
  selectedProduct1!: ServiceModel;
  statuses!: any[];

  loading: boolean = true;
  visibleSidebar1: any;
  @ViewChild('dt1') table?: Table;
  items!: MenuItem[];


  constructor(private dBConectionService: DBConectionService, private config: PrimeNGConfig, public route: ActivatedRoute, private router: Router) { }


  ngOnInit(): void {
    this.items = [
      { icon: 'pi pi-home', url: '/#' },
      { label: 'Vista de Solicitudes' },
    ];

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

    this.dBConectionService.getSolicitud().subscribe(res => {
      this.datatable = res;
      this.loading = false;
    });
    this.frozenCols = [
      { field: 'id', header: 'ID' }
    ];

    this.statuses = [
      { label: 'Cancelado', value: 'Cancelado' },
      { label: 'Sin estatus', value: '' },
      { label: 'Trabajo temporal', value: 'Falta de refacción(Trabajo Temporal)' },
      { label: 'Terminado', value: 'Terminado' }
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