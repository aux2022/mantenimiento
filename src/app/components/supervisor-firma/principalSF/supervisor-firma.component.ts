import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ConfirmationService, FilterService, MenuItem, Message, PrimeNGConfig, SelectItem } from 'primeng/api';
import { Table } from 'primeng/table';
import { ServiceModel } from 'src/app/models/serviceModel';
import { DBConectionService } from 'src/app/Services/dataBaseConection';
import { OuthService } from 'src/app/Services/outh.service';

@Component({
  selector: 'app-supervisor-firma',
  templateUrl: './supervisor-firma.component.html',
  styleUrls: ['./supervisor-firma.component.css']
})
export class SupervisorFirmaComponent implements OnInit {
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
  VerId:any;
  datatableTT: any = []
  datatableCerradas: any = []
  datatableUsuarios: any = []
  msgs: Message[] = [];

  position!: string;
  constructor(private confirmationService: ConfirmationService,private toastr: ToastrService,private dBConectionService: DBConectionService, private config: PrimeNGConfig, public route: ActivatedRoute, private router: Router, private filterService: FilterService,private authService: OuthService,) { }

  ngOnInit(): void {
    this.serviceModel.estatusActividad='';
    this.route.paramMap.subscribe({
      next: (params) => {
        const id = params.get('id')
        this.VerId=id
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
  this.onDataTableUsuarios()
  this.OndatatableTemporal()
  this.OndatatableCerradas()
               
              


        
  
    // this.Filtros_TableControls();
    this.menuItems();
    this.migajaPanMenu();
    this.traslate();
  }
  Ondatatable(){
    
    this.serviceModel.estatusActividad='';
    this.route.paramMap.subscribe({
      next: (params) => {
        const id = params.get('id')

        if (id) {
          this.dBConectionService.getSolicitudSuperArea(id)
          
            .subscribe({
              next: response => {
                this.datatable = response;


              }
            });
        }
      }


    })
  }
  OndatatableTemporal(){
    
 
  }

  OndatatableCerradas(){
    
    this.dBConectionService.getSolicituCerradas().subscribe(res=>{
      this.datatableCerradas=res;
    
        });
      
  }


 

  onDataTableUsuarios(){
    this.dBConectionService.getUsuarios().subscribe(res=>{
  this.datatableUsuarios=res;

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
  public getInputValue(inputValue:string){
    
    this.router.navigate(['/Perfil_usuario/'+inputValue])
    .then(() => {
      window.location.reload();
    });
  
    
  
  }
  onSetData(select: any) {
    this.displayMaximizable=true
    this.serviceModel.idSolicitud =select.idSolicitud
    this.serviceModel.nombreSolicitante =select.nombreSolicitante
    this.serviceModel.correo =select.correo
    this.serviceModel.fechaSolicitud=select.fechaSolicitud
    this.serviceModel.horaSolicitud =select.horaSolicitud
    this.serviceModel.area =select.area
    this.serviceModel.maquina =select.maquina
    this.serviceModel.dispositivo=select.dispositivo
    this.serviceModel.descripcionProblema =select.descripcionProblema
    this.serviceModel.nomina =select.nomina
    this.serviceModel.nombre =select.nombre
    this.serviceModel.fechaInicio=select.fechaInicio
    this.serviceModel.horaInicio =select.horaInicio
    this.serviceModel.diagnostico=select.diagnostico
    this.serviceModel.tipoFalla=select.tipoFalla
    this.serviceModel.emailSent =select.emailSent
    this.serviceModel.nombre2=select.nombre2
    this.serviceModel.nomina2=select.nomina2
    this.serviceModel.asignacion=select.asignacion
    this.serviceModel.generoParo =select.generoParo
    this.serviceModel.paroCorrectivo=select.paroCorrectivo
    this.serviceModel.paroOperativo =select.paroOperativo
    this.serviceModel.paroRefaccion =select.paroRefaccion
    this.serviceModel.tiempoTotal =select.tiempoTotal
    this.serviceModel.grasaUtilizada=select.grasaUtilizada
    this.serviceModel.refaMateHerra =select.refaMateHerra
    this.serviceModel.fechaFinal =select.fechaFinal
    this.serviceModel.horaFinal =select.horaFinal
    this.serviceModel.trabajoSanitizado=select.trabajoSanitizado
    this.serviceModel.estatusActividad =select.estatusActividad
    this.serviceModel.firmaSolicitante =select.firmaSolicitante
    this.serviceModel.emailSent2='true2'
    }
  onUpdateSalida(serviceModel: ServiceModel): void {
    let valor='i'
    let valor2
    for(let item of this.datatableUsuarios){
     valor2=item.nombre3
      if( (document.getElementById('txtfirma') as HTMLInputElement).value === valor2){
      valor='existe'
      }

    }
    if(valor==='existe'){
      //  serviceModel.nomina2= parseInt((document.getElementById('txtNomina2') as HTMLInputElement).value)
    this.dBConectionService.addRevision(serviceModel.idSolicitud, serviceModel)
    .subscribe((res) => {
      if (res) {
        this.displayMaximizable=false
        this.toastr.info('Solicitud firmada con exito!!');
        this.Ondatatable()
        this.onDataTableUsuarios()
        this.OndatatableTemporal()
        this.OndatatableCerradas()

      } else {
        alert('Error! :(')
      }
    })


    }else{
      this.toastr.error('Número de nomina no encontrado!');


    }

  }

  CerrarSesion(){
   

    this.confirmationService.confirm({
      message: '¿Deseas Continuar y Cerrar Sesión?',
      header: 'Confirmación',
      icon: 'pi pi-exclamation-triangle',
    
      accept: () => {
        
          this.authService.logoutAdmin()
          this.router.navigateByUrl("#");
          
          this.toastr.info('La sesión ha sido cerrada')
      },
      reject: () => {
        this.toastr.warning('Operación cancelada')
      }
  });
  }
  traslate() {
    this.config.setTranslation({
      accept: 'Aceptar',
      reject: 'Cancelar',
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
      { icon: 'pi pi-home', url: '/#' },
      { label: 'Pendientes Por Firmar' },
    ];
  }

  menuItems() {
    this.itemsMenu = [{
    
      label: 'Mostrar Por..',
      items: [{
        label: 'Pendientes',
        icon: 'fas fa-receipt',
        command: () => {

        }
      },
      {
        label: 'Terminadas con trabajo temporal',
        icon: 'fas fa-check',
        routerLink:(['/cerradas_Trabajo-temporal/'+this.VerId]),
        command: () => {

        }
      },
      // {
      //   label: 'Terminadas-Canceladas',
      //   icon: 'pi pi-check-circle',
      //   routerLink:(['/cerradas/'+this.VerId]),
      //   command: () => {

      //   }
      // }
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
  confirm1() {
    this.confirmationService.confirm({
        message: 'Are you sure that you want to proceed?',
        header: 'Confirmation',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
            this.msgs = [{severity:'info', summary:'Confirmed', detail:'You have accepted'}];
        },
        reject: () => {
            this.msgs = [{severity:'info', summary:'Rejected', detail:'You have rejected'}];
        }
    });
}

confirm2() {
    this.confirmationService.confirm({
        message: 'Do you want to delete this record?',
        header: 'Delete Confirmation',
        icon: 'pi pi-info-circle',
        accept: () => {
            this.msgs = [{severity:'info', summary:'Confirmed', detail:'Record deleted'}];
        },
        reject: () => {
            this.msgs = [{severity:'info', summary:'Rejected', detail:'You have rejected'}];
        }
    });
}
}
