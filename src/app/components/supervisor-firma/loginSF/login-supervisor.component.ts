import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ServiceModelArea } from 'src/app/models/serviceModelArea';
import { DBConectionService } from 'src/app/Services/dataBaseConection';
import { OuthService } from 'src/app/Services/outh.service';

@Component({
  selector: 'app-login-supervisor',
  templateUrl: './login-supervisor.component.html',
  styleUrls: ['./login-supervisor.component.css']
})
export class LoginSupervisorComponent implements OnInit {
  validar:number=0
  serviceModelArea: ServiceModelArea = new ServiceModelArea()
  datatable2: any = []
  areas: any = []
  constructor(private dBConectionService: DBConectionService,private toastr: ToastrService,private authService: OuthService,
    public router: Router,) {

    }

  ngOnInit(): void {
    this.onDataTable2();
    console.log(this.onDataTable2())
  }

  routeRedirect = '';


  onDataTable2(){
    this.dBConectionService.getUsuarios().subscribe(res=>{
  this.datatable2=res;

    });
  }


  login() {

    let valor='i'
    let valor2
    for(let item of this.datatable2){
    
     console.log('user:',item.usuario,'pass:',item.contrasena,'rol:',item.rol)
      if((document.getElementById('username') as HTMLInputElement).value=== item.usuario && (document.getElementById('password') as HTMLInputElement).value===item.contrasena){
      valor='existe'
      valor2=item.rol
      }

    }
    

      if(valor==='existe'){
        this.authService.loginAdmin();
        this.router.navigate(['/supervisor_firma/'+valor2]);
        this.toastr.success('Bienvenid@')


      }
      else
      {
  this.toastr.error('Usuario o contraseña incorrectos')
      }
    }

}
