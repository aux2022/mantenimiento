import { Component,  OnInit,  } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuItem, PrimeNGConfig } from 'primeng/api';
import { ServiceModel } from 'src/app/models/serviceModel';



@Component({
  selector: 'app-pagina-principal',
  templateUrl: './pagina-principal.component.html',
  styleUrls: ['./pagina-principal.component.css']
})
export class PaginaPrincipalComponent implements OnInit {
  visibleSidebar1: any;
  itemsMenu!: MenuItem[];
  public load: boolean;
  constructor(private primengConfig: PrimeNGConfig,public route: ActivatedRoute,private router: Router) { 
    this.load = false;
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.load = true;
    }, 1600);
    this.menuItems();
  }
  menuItems() {
    this.itemsMenu = [
    {
      label: 'Navegar',
      items: [{
        label: 'Dash de máquinas',
        icon: 'fas fa-th-list',
        url: '/sn'
      },
      {
        label: 'Resumen Solicitudes',
        icon: 'fas fa-columns',
        routerLink: '/Vista_Solicitudes_Principal'
      }
      ]
    }
    ];
  }

}
