import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ConfirmationService, MenuItem } from 'primeng/api';
import { ServiceModel } from 'src/app/models/serviceModel';
import { DBConectionService } from 'src/app/Services/dataBaseConection';
import { OuthService } from 'src/app/Services/outh.service';

@Component({
  selector: 'app-perfil-usuario',
  templateUrl: './perfil-usuario.component.html',
  styleUrls: ['./perfil-usuario.component.css']
})
export class PerfilUsuarioComponent implements OnInit {
  datatable: any = []
  datatableCierre: any = []
  datatableCierreTemp: any = []
  searchText: any;
  searchTextMa: any;
  searchTextDo:any;
  personas!:any[]
  searchTextDisp:any;
  serviceModel: ServiceModel = new ServiceModel()
  totalparo: number = 0;
  nominaimp: string = ''
  displayMaximizable!: boolean;
  items!: MenuItem[];
  itemsMenu!: MenuItem[];
  visibleSidebar1: any
  maqunasAreas: any = []
  displayMaximizableTaEj: boolean = false
  displayMaximizableMaUt: boolean = false
  displayMaximizableEstatus: boolean = false
  displayMaximizableDiagnostico: boolean = false
  dispositivos: any=[]
  form: FormGroup;
  ordersData = [
    { id: 'Falla eléctrica', name: 'Falla eléctrica' },
    { id: 'Falla mecánica', name: 'Falla mecánica' },
    { id: 'Falla neumática', name: 'Falla neumática' },
    { id: 'Falla hidráulica', name: 'Falla hidráulica' },
    { id: 'Falla de energía eléctrica (Proveedor)', name: 'Falla de energía eléctrica (Proveedor)' }
  ];
  get ordersFormArray() {
    return this.form.controls['orders'] as FormArray;
  }
  // In cas
  //herramientas
  formtools: FormGroup;
  toolsData = [
    { id1: 'GRASA EP2(USO GENERAL)', name1: 'GRASA EP2(USO GENERAL)' },
    { id1: 'GRASA XHP 222(ALTA TEMPERATURA Y FRICCIÓN)', name1: 'GRASA XHP 222(ALTA TEMPERATURA Y FRICCIÓN)' },
    { id1: 'GRASA SHC 220(EXCLUSIVA DE BOBST)', name1: 'GRASA SHC 220(EXCLUSIVA DE BOBST)' },
    { id1: 'GRASA MOLYKOTE SEPARATOR SPRAY OIL', name1: 'GRASA MOLYKOTE SEPARATOR SPRAY OIL' },
    { id1: 'GRASA MOBIL SHC POLYREX 462', name1: 'GRASA MOBIL SHC POLYREX 462' },
    { id1: 'GRASA LIQUIDA WURTH HHS 2000', name1: 'GRASA LIQUIDA WURTH HHS 2000' },
    { id1: 'ACEITE MOBIL SHC CIBUS 68(EMBOBINADORES)', name1: 'ACEITE MOBIL SHC CIBUS 68(EMBOBINADORES)' }
  ];
  get toolsFormArray() {
    return this.formtools.controls['tools'] as FormArray;
  }
  //heramientas
  constructor(private confirmationService: ConfirmationService,private toastr: ToastrService, private formBuilder: FormBuilder, public route: ActivatedRoute, private router: Router, private dBConectionService: DBConectionService,private authService: OuthService) {
    this.form = this.formBuilder.group({
      orders: new FormArray([])
    });
    this.formtools = this.formBuilder.group({
      tools: new FormArray([])
    });

    this.addCheckboxes();

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
  /**submits */
  private addCheckboxes() {
    this.ordersData.forEach(() => this.ordersFormArray.push(new FormControl(false)));
    this.toolsData.forEach(() => this.toolsFormArray.push(new FormControl(false)));
  }


  onSetData(select: any) {
    this.serviceModel.idSolicitud = select.idSolicitud
    this.serviceModel.nombreSolicitante = select.nombreSolicitante
    this.serviceModel.correo = select.correo
    this.serviceModel.fechaSolicitud = select.fechaSolicitud
    this.serviceModel.horaSolicitud = select.horaSolicitud
    this.serviceModel.area = select.area
    this.serviceModel.maquina = select.maquina
    this.serviceModel.dispositivo = select.dispositivo
    this.serviceModel.descripcionProblema = select.descripcionProblema
    this.serviceModel.nomina = select.nomina
    this.serviceModel.nombre = select.nombre
    this.serviceModel.nomina2 = select.nomina2
    this.serviceModel.nombre2 = select.nombre2
    this.serviceModel.fechaInicio = select.fechaInicio
    this.serviceModel.horaInicio = select.horaInicio
    this.serviceModel.diagnostico = select.diagnostico
    this.serviceModel.tipoFalla = select.tipoFalla
    this.serviceModel.emailSent = 'true'
    this.serviceModel.generoParo = select.generoParo
    this.serviceModel.paroCorrectivo = select.paroCorrectivo
    this.serviceModel.paroOperativo = select.paroOperativo
    this.serviceModel.paroRefaccion = select.paroRefaccion
    this.serviceModel.tiempoTotal = select.tiempoTotal
    this.serviceModel.grasaUtilizada = select.grasaUtilizada
    this.serviceModel.refaMateHerra = select.refaMateHerra
    this.serviceModel.tareasEjecutadas = select.tareasEjecutadas
    this.serviceModel.fechaFinal = select.fechaFinal
    this.serviceModel.horaFinal = select.horaFinal
    this.serviceModel.trabajoSanitizado = select.trabajoSanitizado
    this.serviceModel.estatusActividad = select.estatusActividad
    this.serviceModel.firmaSolicitante = select.firmaSolicitante
    this.serviceModel.emailSent2 = select.emailSent2
  }
  clearFiltres(){
    this.searchTextMa=''
    this.searchTextDo=''
  }
  /**submits */
  ngOnInit(): void {
    this.serviceModel.estatusActividad = '';
   this.clearFiltres()
    this.route.paramMap.subscribe({
      next: (params) => {
        const id = params.get('id')

        if (id) {
          this.dBConectionService.getSolicitudSM(id)

            .subscribe({
              next: response => {
                this.datatable = response;

                this.nominaimp = id
                this.items = [
                  { icon: 'pi pi-home', routerLink: '/#' },
                  { label: 'Asignar Solicitud',routerLink:'/Asignar' },
                  { label: 'Mecánico-'+id }
                ];
              }
            });
        }
      }


    })
    this.menuItems()
    this.cargarCerradas()
    this.cargarCerradasTTemp()
    this.onDatatableAreas()
    this.Dispos()

  }
  
  menuItems() {
    this.itemsMenu = [
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
  Dispos(){
    this.dBConectionService.getSolicitudDispositivo().subscribe(res=>{
  this.dispositivos=res;
    });
  }
  onDatatableAreas(){
    this.dBConectionService.getSolicitudMaquina().subscribe(res=>{
  this.maqunasAreas=res;

    });
  }
  cargarEnProceso() {

    this.route.paramMap.subscribe({
      next: (params) => {
        const id = params.get('id')

        if (id) {
          this.dBConectionService.getSolicitudSM(id)

            .subscribe({
              next: response => {
                this.datatable = response;



              }
            });
        }
      }


    })

  }
  cargarCerradas() {

    this.route.paramMap.subscribe({
      next: (params) => {
        const id = params.get('id')

        if (id) {
          this.dBConectionService.getSolicitudSMCierre(id)

            .subscribe({
              next: response => {
                this.datatableCierre = response;



              }
            });
        }
      }


    })

  }

  cargarCerradasTTemp() {

    this.route.paramMap.subscribe({
      next: (params) => {
        const id = params.get('id')

        if (id) {
          this.dBConectionService.getSolicitudSMCierreTemp(id)

            .subscribe({
              next: res => {
                this.datatableCierreTemp = res;



              }
            });
        }
      }


    })

  }
  onSetDataDO(select: any) {

    this.displayMaximizableDiagnostico = true
    this.serviceModel.idSolicitud = select.idSolicitud
    this.serviceModel.nombreSolicitante = select.nombreSolicitante
    this.serviceModel.correo = select.correo
    this.serviceModel.fechaSolicitud = select.fechaSolicitud
    this.serviceModel.horaSolicitud = select.horaSolicitud
    this.serviceModel.area = select.area
    this.serviceModel.maquina = select.maquina
    this.serviceModel.dispositivo = select.dispositivo
    this.serviceModel.descripcionProblema = select.descripcionProblema
    this.serviceModel.nomina = select.nomina
    this.serviceModel.nombre = select.nombre
    this.serviceModel.nomina2 = select.nomina2
    this.serviceModel.nombre2 = select.nombre2
    this.serviceModel.fechaInicio = select.fechaInicio
    this.serviceModel.horaInicio = select.horaInicio
    this.serviceModel.diagnostico = select.diagnostico
    this.serviceModel.tipoFalla = select.tipoFalla
    this.serviceModel.emailSent = 'true'
    this.serviceModel.generoParo = select.generoParo
    this.serviceModel.paroCorrectivo = select.paroCorrectivo
    this.serviceModel.paroOperativo = select.paroOperativo
    this.serviceModel.paroRefaccion = select.paroRefaccion
    this.serviceModel.tiempoTotal = select.tiempoTotal
    this.serviceModel.grasaUtilizada = select.grasaUtilizada
    this.serviceModel.refaMateHerra = select.refaMateHerra
    this.serviceModel.tareasEjecutadas = select.tareasEjecutadas
    this.serviceModel.fechaFinal = select.fechaFinal
    this.serviceModel.horaFinal = select.horaFinal
    this.serviceModel.trabajoSanitizado = select.trabajoSanitizado
    this.serviceModel.estatusActividad = select.estatusActividad
    this.serviceModel.firmaSolicitante = select.firmaSolicitante
    this.serviceModel.emailSent2 = select.emailSent2
  }

  onSetDataTS(select: any) {
    this.displayMaximizableTaEj = true

    this.serviceModel.idSolicitud = select.idSolicitud
    this.serviceModel.nombreSolicitante = select.nombreSolicitante
    this.serviceModel.correo = select.correo
    this.serviceModel.fechaSolicitud = select.fechaSolicitud
    this.serviceModel.horaSolicitud = select.horaSolicitud
    this.serviceModel.area = select.area
    this.serviceModel.maquina = select.maquina
    this.serviceModel.dispositivo = select.dispositivo
    this.serviceModel.descripcionProblema = select.descripcionProblema
    this.serviceModel.nomina = select.nomina
    this.serviceModel.nombre = select.nombre
    this.serviceModel.nomina2 = select.nomina2
    this.serviceModel.nombre2 = select.nombre2
    this.serviceModel.fechaInicio = select.fechaInicio
    this.serviceModel.horaInicio = select.horaInicio
    this.serviceModel.diagnostico = select.diagnostico
    this.serviceModel.tipoFalla = select.tipoFalla
    this.serviceModel.emailSent = 'true'
    this.serviceModel.generoParo = select.generoParo
    this.serviceModel.paroCorrectivo = select.paroCorrectivo
    this.serviceModel.paroOperativo = select.paroOperativo
    this.serviceModel.paroRefaccion = select.paroRefaccion
    this.serviceModel.tiempoTotal = select.tiempoTotal
    this.serviceModel.grasaUtilizada = select.grasaUtilizada
    this.serviceModel.refaMateHerra = select.refaMateHerra
    this.serviceModel.tareasEjecutadas = select.tareasEjecutadas
    this.serviceModel.fechaFinal = select.fechaFinal
    this.serviceModel.horaFinal = select.horaFinal
    this.serviceModel.trabajoSanitizado = select.trabajoSanitizado
    this.serviceModel.estatusActividad = select.estatusActividad
    this.serviceModel.firmaSolicitante = select.firmaSolicitante
    this.serviceModel.emailSent2 = select.emailSent2
  }

  onSetDataMO(select: any) {
    this.displayMaximizableMaUt = true


    this.serviceModel.idSolicitud = select.idSolicitud
    this.serviceModel.nombreSolicitante = select.nombreSolicitante
    this.serviceModel.correo = select.correo
    this.serviceModel.fechaSolicitud = select.fechaSolicitud
    this.serviceModel.horaSolicitud = select.horaSolicitud
    this.serviceModel.area = select.area
    this.serviceModel.maquina = select.maquina
    this.serviceModel.dispositivo = select.dispositivo
    this.serviceModel.descripcionProblema = select.descripcionProblema
    this.serviceModel.nomina = select.nomina
    this.serviceModel.nombre = select.nombre
    this.serviceModel.nomina2 = select.nomina2
    this.serviceModel.nombre2 = select.nombre2
    this.serviceModel.fechaInicio = select.fechaInicio
    this.serviceModel.horaInicio = select.horaInicio
    this.serviceModel.diagnostico = select.diagnostico
    this.serviceModel.tipoFalla = select.tipoFalla
    this.serviceModel.emailSent = 'true'
    this.serviceModel.generoParo = select.generoParo
    this.serviceModel.paroCorrectivo = select.paroCorrectivo
    this.serviceModel.paroOperativo = select.paroOperativo
    this.serviceModel.paroRefaccion = select.paroRefaccion
    this.serviceModel.tiempoTotal = select.tiempoTotal
    this.serviceModel.grasaUtilizada = select.grasaUtilizada
    this.serviceModel.refaMateHerra = select.refaMateHerra
    this.serviceModel.tareasEjecutadas = select.tareasEjecutadas
    this.serviceModel.fechaFinal = select.fechaFinal
    this.serviceModel.horaFinal = select.horaFinal
    this.serviceModel.trabajoSanitizado = select.trabajoSanitizado
    this.serviceModel.estatusActividad = select.estatusActividad
    this.serviceModel.firmaSolicitante = select.firmaSolicitante
    this.serviceModel.emailSent2 = select.emailSent2
  }
  onSetDataEs(select: any) {
    this.displayMaximizableEstatus = true
    this.serviceModel.idSolicitud = select.idSolicitud
    this.serviceModel.nombreSolicitante = select.nombreSolicitante
    this.serviceModel.correo = select.correo
    this.serviceModel.fechaSolicitud = select.fechaSolicitud
    this.serviceModel.horaSolicitud = select.horaSolicitud
    this.serviceModel.area = select.area
    this.serviceModel.maquina = select.maquina
    this.serviceModel.dispositivo = select.dispositivo
    this.serviceModel.descripcionProblema = select.descripcionProblema
    this.serviceModel.nomina = select.nomina
    this.serviceModel.nombre = select.nombre
    this.serviceModel.nomina2 = select.nomina2
    this.serviceModel.nombre2 = select.nombre2
    this.serviceModel.fechaInicio = select.fechaInicio
    this.serviceModel.horaInicio = select.horaInicio
    this.serviceModel.diagnostico = select.diagnostico
    this.serviceModel.tipoFalla = select.tipoFalla
    this.serviceModel.emailSent = 'true'
    this.serviceModel.generoParo = select.generoParo
    this.serviceModel.paroCorrectivo = select.paroCorrectivo
    this.serviceModel.paroOperativo = select.paroOperativo
    this.serviceModel.paroRefaccion = select.paroRefaccion
    this.serviceModel.tiempoTotal = select.tiempoTotal
    this.serviceModel.grasaUtilizada = select.grasaUtilizada
    this.serviceModel.refaMateHerra = select.refaMateHerra
    this.serviceModel.tareasEjecutadas = select.tareasEjecutadas
    this.serviceModel.fechaFinal = select.fechaFinal
    this.serviceModel.horaFinal = select.horaFinal
    this.serviceModel.trabajoSanitizado = select.trabajoSanitizado
    this.serviceModel.estatusActividad = select.estatusActividad
    this.serviceModel.firmaSolicitante = select.firmaSolicitante
    this.serviceModel.emailSent2 = select.emailSent2
  }
  onUpdateRevision(serviceModel: ServiceModel): void {

    serviceModel.emailSent2 = 'true'

    if ((document.getElementById('flexRadioDefault1') as HTMLInputElement).checked === true) {
      serviceModel.trabajoSanitizado = 'Si'
    }
    else {
      if ((document.getElementById('flexRadioDefault2') as HTMLInputElement).checked === true) {
        serviceModel.trabajoSanitizado = 'No'
      }
    }

    this.dBConectionService.addRevision(serviceModel.idSolicitud, serviceModel)
      .subscribe((res) => {
        if (res) {
          this.displayMaximizableEstatus = false
          this.toastr.success('Información Guardada Exitosamente!!!')
          this.cargarEnProceso();
          this.cargarCerradas()
          this.cargarCerradasTTemp()
        } else {
          alert('Error! :(')
        }
      })



  }

  public getInputValue(inputValue: string) {

    this.router.navigate(['/Sesion_mecanico/' + inputValue])
      .then(() => {
        window.location.reload();
      });



  }
  logOut() {

  }

  onUpdateSalida(serviceModel: ServiceModel): void {
    const selectedOrderIds = this.form.value.orders
      .map((checked: any, i: | number) => checked ? this.ordersData[i].id : null)
      .filter((v: null) => v !== null);

    serviceModel.tipoFalla = '' + selectedOrderIds
    this.dBConectionService.addDiagnostico(serviceModel.idSolicitud, serviceModel)
      .subscribe((res) => {
        if (res) {
          this.displayMaximizableDiagnostico = false
          this.toastr.info('Solicitud Diagnosticada', 'Datos guardados')
          this.cargarEnProceso();


          this.cargarCerradas()
          this.cargarCerradasTTemp()
        } else {
          alert('Error! :(')
        }
      })
  }

  onUpdateSalida3(serviceModel: ServiceModel): void {
    if ((document.getElementById('flexRadioDefault12') as HTMLInputElement).checked === true) {
      serviceModel.generoParo = 'Si'
    }
    else {
      if ((document.getElementById('flexRadioDefault22') as HTMLInputElement).checked === true) {
        serviceModel.generoParo = 'No'
      }
    }
    let pC: number = parseInt(serviceModel.paroCorrectivo);
    let pO: number = parseInt(serviceModel.paroOperativo);
    let pR: number = parseInt(serviceModel.paroRefaccion);
    let total: Number = pC + pO + pR;
    this.serviceModel.tiempoTotal = total.toString()
    console.log(this.serviceModel.tareasEjecutadas)
    this.serviceModel.emailSent = 'true'
    console.log(this.serviceModel.tiempoTotal, 'tota', total)
    this.dBConectionService.addTareas(serviceModel.idSolicitud, serviceModel)
      .subscribe((res) => {
        if (res) {
          this.displayMaximizableTaEj = false
          this.toastr.info('Tareas Guardadas', 'Datos Guardados');


          this.cargarEnProceso()
          this.cargarCerradas()
          this.cargarCerradasTTemp()

        } else {
          alert('Error! :(')
        }
      })
  }

  onUpdateRegistroMaterial(serviceModel: ServiceModel): void {
    const selectedToolsIds = this.formtools.value.tools
      .map((checked: any, e: | number) => checked ? this.toolsData[e].id1 : null)
      .filter((v: null) => v !== null);
    serviceModel.grasaUtilizada = '' + selectedToolsIds

    this.dBConectionService.addTareas(serviceModel.idSolicitud, serviceModel)
      .subscribe((res) => {
        if (res) {
          this.displayMaximizableMaUt = false
          this.toastr.info('Herramienta y material registrado', 'Datos Guardados');


          this.cargarEnProceso()
          this.cargarCerradas()
          this.cargarCerradasTTemp()
        } else {
          alert('Error! :(')
        }
      })
  }

}
