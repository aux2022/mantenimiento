import { Component, OnInit } from '@angular/core';
import {MenuItem} from 'primeng/api';
@Component({
  selector: 'app-navegacion-bar-inicio',
  templateUrl: './navegacion-bar-inicio.component.html',
  styleUrls: ['./navegacion-bar-inicio.component.css']
})
export class NavegacionBarInicioComponent implements OnInit {
  items!: MenuItem[];
  constructor() { }

  ngOnInit(): void {
    this.items = [
        {
            label:'Archivo',
            icon:'pi pi-fw pi-file',
            items:[
                {
                  label:'Export',
                  icon:'pi pi-fw pi-external-link',
                    items:[
                    {
                        label:'Excel',
                        icon:'pi pi-fw pi-file-excel'
                    },
                    {
                        label:'PDF',
                        icon:'pi pi-fw pi-file-pdf'
                    },

                    ]
                },
                {
                    separator:true
                }
            ]
        },
        {
            label:'Catalogos',
            icon:'pi pi-fw pi-file-edit',
            items:[
                {
                    label:'Áreas',
                    icon:'pi pi-fw pi-align-left'
                },
                {
                    label:'Máquinas',
                    icon:'pi pi-fw pi-align-right'
                },
                {
                    label:'Dispositivos',
                    icon:'pi pi-fw pi-align-center'
                }

            ]
        },
        {
            label:'Usuarios',
            icon:'pi pi-fw pi-user',
            items:[
                {
                    label:'Nuevo',
                    icon:'pi pi-fw pi-user-plus',

                },
               
                
            ]
        },
        
        {
            label:'Cerrar sesión',
            icon:'pi pi-fw pi-sign-out'
        }
    ];
}
}