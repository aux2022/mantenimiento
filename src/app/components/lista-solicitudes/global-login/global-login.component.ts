import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { OuthService } from 'src/app/Services/outh.service';

@Component({
  selector: 'app-global-login',
  templateUrl: './global-login.component.html',
  styleUrls: ['./global-login.component.css']
})
export class GlobalLoginComponent implements OnInit {
  validar:number=0
  visibleSidebar1:boolean=false
  constructor(private toastr: ToastrService,private authService: OuthService,public router: Router,) { }

  ngOnInit(): void {
  }

  routeRedirect = '';





  login() {

      if((document.getElementById('username') as HTMLInputElement).value === 'Mecanicos'&& (document.getElementById('password') as HTMLInputElement).value === 'user22#'){
        this.authService.loginSoli();
        this.router.navigate(['/Asignar']);
        this.toastr.success('Bienvenid@')
      }
    else{
      console.log('user: ',(document.getElementById('username') as HTMLInputElement).value)
      console.log('contraseña: ',(document.getElementById('password') as HTMLInputElement).value)
      this.toastr.error('Usuario o contraseña incorrectos')
    }
    }


}
