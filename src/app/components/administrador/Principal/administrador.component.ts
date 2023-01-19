import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ConfirmationService, MenuItem, Message } from 'primeng/api';
import { ServiceModel } from 'src/app/models/serviceModel';
import { DBConectionService } from 'src/app/Services/dataBaseConection';
import { OuthService } from 'src/app/Services/outh.service';



@Component({
  selector: 'app-administrador',
  templateUrl: './administrador.component.html',
  styleUrls: ['./administrador.component.css']
})
export class AdministradorComponent implements OnInit {
  datatable: any = []
  selectedProduct1!: ServiceModel;
  sidebarExpanded = true;
  items!: MenuItem[];
  loading: boolean = true;
  chartOptions: any;


  msgs: Message[] = [];
  position!: string;
    constructor(private toastr: ToastrService,private router: Router,private dBConectionService: DBConectionService,private authService: OuthService,private confirmationService: ConfirmationService) { 
   
    }
  
    ngOnInit(): void {



      
      this.sidebarExpanded = true;

      this.dBConectionService.getSolicitud().subscribe(res => {
        this.datatable = res;
        this.loading = false;
    });
      this.items = [
        {
            label: 'File',
            items: [{
                    label: 'New', 
                    icon: 'pi pi-fw pi-plus',
                    items: [
                        {label: 'Project'},
                        {label: 'Other'},
                    ]
                },
                {label: 'Open'},
                {label: 'Quit'}
            ]
        },
        {
            label: 'Edit',
            icon: 'pi pi-fw pi-pencil',
            items: [
                {label: 'Delete', icon: 'pi pi-fw pi-trash'},
                {label: 'Refresh', icon: 'pi pi-fw pi-refresh'}
            ]
        }
    ];
}



    }
  
  
  