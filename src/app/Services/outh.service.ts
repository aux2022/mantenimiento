import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OuthService {

  constructor() { }

  readonly ISLOGGEDKEY = 'islogged';
  public urlUsuarioIntentaAcceder = '';

  public changeLoginStatusSubject = new Subject<boolean>();
  public changeLoginStatus$ = this.changeLoginStatusSubject.asObservable();




  login() {
    localStorage.setItem(this.ISLOGGEDKEY, 'true');
    this.changeLoginStatusSubject.next(true);
  }

  logout() {
    localStorage.removeItem(this.ISLOGGEDKEY);
    this.changeLoginStatusSubject.next(false);
  }

  isLoggedIn(url: string) {
    const isLogged = localStorage.getItem(this.ISLOGGEDKEY);
    if (!isLogged) {
      this.urlUsuarioIntentaAcceder = url;
      return false;
    }
    return true;
  }

/**administrador */
  readonly ISLOGGEDKEYcom = 'isloggedAdmin';
  public urlUsuarioIntentaAccederAdmin = '';
  public changeLoginStatusSubjectAdmin = new Subject<boolean>();
  public changeLoginStatusAdmin$ = this.changeLoginStatusSubjectAdmin.asObservable();
    loginAdmin() {
      localStorage.setItem(this.ISLOGGEDKEYcom, 'true');
      this.changeLoginStatusSubjectAdmin.next(true);
    }
    logoutAdmin() {
      localStorage.removeItem(this.ISLOGGEDKEYcom);
      this.changeLoginStatusSubjectAdmin.next(false);
    }
    isLoggedAdmin(url: string) {
      const isloggedAdmin = localStorage.getItem(this.ISLOGGEDKEYcom);
      if (!isloggedAdmin) {
        this.urlUsuarioIntentaAccederAdmin = url;
        return false;
      }
      return true;
    }
    /**Administrador */

  readonly ISLOGGEDKEYsoli = 'isloggedSoli';
  public urlUsuarioIntentaAccederSoli = '';
  public changeLoginStatusSubjectSoli = new Subject<boolean>();
  public changeLoginStatusSoli$ = this.changeLoginStatusSubjectSoli.asObservable();
    loginSoli() {
      localStorage.setItem(this.ISLOGGEDKEYsoli, 'true');
      this.changeLoginStatusSubjectSoli.next(true);
    }
    logoutSoli() {
      localStorage.removeItem(this.ISLOGGEDKEYsoli);
      this.changeLoginStatusSubjectSoli.next(false);
    }
    isLoggedSoli(url: string) {
      const isloggedcom = localStorage.getItem(this.ISLOGGEDKEYsoli);
      if (!isloggedcom) {
        this.urlUsuarioIntentaAccederSoli = url;
        return false;
      }
      return true;
    }

}
