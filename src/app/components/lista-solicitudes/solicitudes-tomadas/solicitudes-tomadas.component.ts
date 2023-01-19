import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ConfirmationService, FilterService, MenuItem, PrimeNGConfig, SelectItem } from 'primeng/api';
import { Table } from 'primeng/table';
import { ServiceModel } from 'src/app/models/serviceModel';
import { DBConectionService } from 'src/app/Services/dataBaseConection';
import { OuthService } from 'src/app/Services/outh.service';
import Swal from 'sweetalert2'
@Component({
  selector: 'app-solicitudes-tomadas',
  templateUrl: './solicitudes-tomadas.component.html',
  styleUrls: ['./solicitudes-tomadas.component.css']
})
export class SolicitudesTomadasComponent implements OnInit {
  datatable: any = []
  frozenCols!: any[];
  sortOptions!: SelectItem[];
  filter1: any
  sortOrder!: number;
  value!: any
  sortField!: string;
  first = 0;
  filteredCountries!: any[];
  rows = 10;
  selectedCustomers!: ServiceModel[];
  datatableMecanico:any=[]
  balanceFrozen: boolean = false;
  filteredGroups!: any[];
  statuses!: any[];

  loading: boolean = true;
  visibleSidebar1: any;

  displayMaximizable!: boolean;
  items!: MenuItem[];
  itemsMenu!: MenuItem[];

  constructor(private toastr: ToastrService,private confirmationService: ConfirmationService,private authService: OuthService,private dBConectionService: DBConectionService, private config: PrimeNGConfig, public route: ActivatedRoute, private router: Router, private filterService: FilterService) { }

  ngOnInit(): void {

    (document.getElementById('txtNomina') as HTMLInputElement).value='03030303'
    this.Filtros_TableControls();
    this.menuItems();
    this.migajaPanMenu();
    this.traslate();
    this.onDataTableMecanicos()
  }
  onDataTableMecanicos(){
    this.dBConectionService.getSolicitudMecanico().subscribe(res=>{
  this.datatableMecanico=res;
    });
  }
  CerrarSesion(){


    this.confirmationService.confirm({
      message: '¿Deseas Continuar y Cerrar Sesión?',
      header: 'Confirmación',
      icon: 'pi pi-exclamation-triangle',

      accept: () => {

        this.authService.logoutSoli()
        this.router.navigateByUrl("#");

          this.toastr.info('La sesión ha sido cerrada')
      },
      reject: () => {
        this.toastr.warning('Operación cancelada')
      }
  });
  }
  Filtros_TableControls() {
    this.filter1 = ''
    this.dBConectionService.getSolicitudTomada().subscribe(res => {
      this.datatable = res;
      this.loading = false;
    });
    this.frozenCols = [
      { field: 'id', header: 'ID' }
    ];

    this.statuses = [
      { label: 'Extrusión', value: 'Extrusión' },
      { label: 'Impresión', value: 'Impresión' },
      { label: 'Pouch', value: 'Pouch' },
      { label: 'Laminado', value: 'Laminado' },
      { label: 'Refilado', value: 'Refilado' },
      { label: 'Bolseo', value: 'Bolseo' }
    ]


  }
  public getInputValue(inputValue:string){
    let valor='i'
    let valor2
    for(let item of this.datatableMecanico){
     valor2=item.nomina
      if( (document.getElementById('txtNomina') as HTMLInputElement).value === valor2){
      valor='existe'
      }

    }
    if(valor==='existe'){
      this.router.navigate(['/Perfil_usuario/'+inputValue])
      .then(() => {
        window.location.reload();
      });

    }else{
      this.toastr.error('Perfil no encontrado :(');

    }

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

  migajaPanMenu() {
    this.items = [
      { icon: 'pi pi-home', routerLink: '/#' },
      { label: 'Asignar Solicitud',routerLink:'/Asignar' },
      { label: 'Solicitudes Tomadas' }
    ];
  }

  menuItems() {
    this.itemsMenu = [{

      label: 'Mostrar Por..',
      items: [{
        label: 'Pendientes',
        icon: 'fas fa-receipt',
       routerLink:'/Asignar'
      },

      ]
    },
    {
      label: 'Navegar',
      items: [{
        label: 'Inicio',
        icon: 'pi pi-home',
        routerLink: '/#'
      },
      {
        label: 'Resumen Solicitudes',
        icon: 'fas fa-columns',
        routerLink: '/Vista_Solicitudes_Principal'
      },
      {
        label: 'Cerrar Sesión',
        icon: 'pi pi-power-off',
        command: () => this.CerrarSesion()
      }
      ]
    }
    ];
  }

  next() {
    this.first = this.first + this.rows;
  }

  prev() {
    this.first = this.first - this.rows;
  }

  reset() {
    this.first = 0;
  }

  isLastPage(): boolean {
    return this.datatable ? this.first === (this.datatable.length - this.rows) : true;
  }

  isFirstPage(): boolean {
    return this.datatable ? this.first === 0 : true;
  }

  onSortChange(event: any) {
    let value = event.value;

    if (value.indexOf('!') === 0) {
      this.sortOrder = -1;
      this.sortField = value.substring(1, value.length);
    }
    else {
      this.sortOrder = 1;
      this.sortField = value;
    }
  }

  clear(table: Table) {
    table.clear();
  }


  filterGroupedCity(event: any) {
    let query = event.query;
    let filteredGroups = [];

    for (let optgroup of this.statuses) {
      let filteredSubOptions = this.filterService.filter(
        optgroup.items,
        ["label"],
        query,
        "contains"
      );
      if (filteredSubOptions && filteredSubOptions.length) {
        filteredGroups.push({
          label: optgroup.label,
          value: optgroup.value,
          items: filteredSubOptions
        });
      }
    }

    this.filteredGroups = filteredGroups;
  }

  showMaximizableDialog() {
    this.displayMaximizable = true;
  }


}
