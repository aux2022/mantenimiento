import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FilterService, MenuItem, PrimeNGConfig, SelectItem } from 'primeng/api';
import { Table } from 'primeng/table';
import { ServiceModel } from 'src/app/models/serviceModel';
import { DBConectionService } from 'src/app/Services/dataBaseConection';
import { OuthService } from 'src/app/Services/outh.service';

@Component({
  selector: 'app-cerradas-tt',
  templateUrl: './cerradas-tt.component.html',
  styleUrls: ['./cerradas-tt.component.css']
})
export class CerradasTTComponent implements OnInit {
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
  selectedProduct1!: ServiceModel[];
  balanceFrozen: boolean = false;
  filteredGroups!: any[];
  statuses!: any[];

  loading: boolean = true;
  visibleSidebar1: any;
  serviceModel: ServiceModel = new ServiceModel()
  displayMaximizable!: boolean;
  items!: MenuItem[];
  itemsMenu!: MenuItem[];
  VerId:any
  datatableTT: any = []
  datatableCerradas: any = []
  datatableUsuarios: any = []
  constructor(private toastr: ToastrService,private dBConectionService: DBConectionService, private config: PrimeNGConfig, public route: ActivatedRoute, private router: Router, private filterService: FilterService,private authService: OuthService) { }

  ngOnInit(): void {
    this.serviceModel.estatusActividad='';
    
    this.route.paramMap.subscribe({
      next: (params) => {
        const id = params.get('id')
        this.VerId=id
        if (id) {
          this.dBConectionService.getSolicitudSuperAreaTT(id)
          
            .subscribe({
              next: response => {
                this.datatable = response;
                this.loading = false;


              }
            });
        }
      }


    })


        
  
    // this.Filtros_TableControls();
    this.menuItems();
    this.migajaPanMenu();
    this.traslate();
  }


  

  OndatatableCerradas(){
    
    this.dBConectionService.getSolicituCerradas().subscribe(res=>{
      this.datatable=res;
      this.loading = false;
        });
      
  }


 

 

  Filtros_TableControls() {
    this.filter1 = ''

    this.route.paramMap.subscribe({
      next: (params) => {
        const id = params.get('id')

        if (id) {
          this.dBConectionService.getSolicitudSuperArea(id)
          
            .subscribe({
              next: response => {
                this.datatable = response;
                this.loading = false;


              }
            });
        }
      }


    })

    this.frozenCols = [
      { field: 'id', header: 'ID' }
    ];

    this.statuses = [
      { label: 'Extrusión', value: 'Extrusión' },
      { label: 'Impresión', value: 'Impresión' },
      { label: 'Bolseo', value: 'Bolseo' }
    ]


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
      { label: 'Pendientes Por Firmar', routerLink:'/supervisor_firma/'+this.VerId },
      { label: 'Cerradas (Trabajos Temporales)' }
    ];
  }

  menuItems() {
    this.itemsMenu = [{
    
      label: 'Mostrar Por..',
      items: [{
        label: 'Pendientes',
        icon: 'fas fa-receipt',
        routerLink:(['/supervisor_firma/'+this.VerId]),
        command: () => {

        }
      },
      {
        label: 'Terminadas-Canceladas',
        icon: 'pi pi-check-circle',
        routerLink:(['/cerradas/'+this.VerId]),
        command: () => {

        }
      }
      ]
    },
    {
      label: 'Navegar',
      items: [  
        
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
  CerrarSesion(){
    this.authService.logoutAdmin()
    this.router.navigateByUrl("#");
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

 

}
