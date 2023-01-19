import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { OuthService } from 'src/app/Services/outh.service';

@Component({
  selector: 'app-login-admin',
  templateUrl: './login-admin.component.html',
  styleUrls: ['./login-admin.component.css']
})
export class LoginAdminComponent implements OnInit {
  validar:number=0
  constructor(private toastr: ToastrService,private authService: OuthService,
    public router: Router,) { }

  ngOnInit(): void {
  }

 





  login() {

      if((document.getElementById('username') as HTMLInputElement).value === 'Mantenimiento'&& (document.getElementById('password') as HTMLInputElement).value === 'Admin22#'){
        this.authService.loginAdmin();
        this.router.navigate(['/Administrador']);
        this.toastr.success('Bienvenid@')
      }
    else{
      this.toastr.error('Usuario o contraseña incorrectos')
    }
    }

  }



