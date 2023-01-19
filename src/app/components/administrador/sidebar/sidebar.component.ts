import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ConfirmationService, Message, PrimeNGConfig } from 'primeng/api';
import { OuthService } from 'src/app/Services/outh.service';
import Swal from 'sweetalert2'
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  @Input() isExpanded: boolean = false;
  sidebarExpanded = true;
  @Output() toggleSidebar: EventEmitter<boolean> = new EventEmitter<boolean>();
  handleSidebarToggle = () => this.toggleSidebar.emit(!this.isExpanded);
  msgs: Message[] = [];
  position!: string;
  constructor(private toastr: ToastrService,private authService: OuthService,private router: Router,private confirmationService: ConfirmationService, private config: PrimeNGConfig) { }

  ngOnInit(): void {
  }


  logout(){
    Swal.fire({
      title: 'Cerrar Sesión',
      showDenyButton: true,
      confirmButtonText: 'Aceptar',
      denyButtonText: `Cancelar`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.authService.logoutAdmin()
        this.router.navigateByUrl("#");
        this.toastr.info('Se ha cerrado la sesión :)✅')
      } else if (result.isDenied) {
        this.toastr.info('Se cancelo cerrar sesión.❌')
      }
    })
  
  }
}
