import { Component, ElementRef, OnInit, signal, ViewChild } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../core/service/authService.service';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login implements OnInit {

  constructor(
    private AuthService: AuthService,
    private router: Router,
  ) { }

  btnEnviar: boolean = true;
  errorPass: boolean = true;
  visualizarPass: boolean = true;
  private usuarioRetorno: boolean = false;

   @ViewChild('inputPassword') inputPassword!:ElementRef

  credenciales = signal<FormGroup>(
    new FormGroup({
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    })
  )

  ngOnInit(): void {
    // if (window.location.pathname === '' || window.location.pathname === '/' || window.location.pathname === '/login' && localStorage.getItem('sesion')) {
    //   this.router.navigate(['/dashboard'])
    // }
  }

  login(): Promise<boolean> | boolean {

    const usuario = this.credenciales().get('email')?.value;
    const contrasenia = this.credenciales().get('password')?.value;

    return this.AuthService.login(usuario, contrasenia).then(valor => {
      this.usuarioRetorno = valor.log
      if (this.usuarioRetorno) {
        // console.log("COMPROBAMOS-USUARIO: " + this.usuarioRetorno);
        // const { Clave_Usuario, Usuario, ...UsuarioData } = valor.data.user
        // const { Usuario, ...UsuarioData } = valor.data.user
        // localStorage.setItem('sesion', JSON.stringify(UsuarioData));
       console.log(valor.data)
        localStorage.setItem('sesion', JSON.stringify(valor.data));

        // const { Nombre_Completo, ...UsuarioD} = UsuarioData 
        // this.emitDataLogin.disparadorLogin.emit(UsuarioD)

        this.router.navigate(['']);
        return true;
      } else {
        // console.log("Redirigimosssss: ");
        this.errorPass = false;
        return false;
      }
    })
  }

  formImputComplete() {

    if (this.credenciales().valid) {
      this.btnEnviar = false;
    } else {
      this.btnEnviar = true;
    }

  }

  evaluaMssjError() {
    if (this.errorPass == false) {
      this.errorPass = true;
    }
  }

  visualizarPassword() {
    if (this.visualizarPass == true) {
      this.visualizarPass = false;
      this.inputPassword.nativeElement.type = "text"
    } else {
      this.visualizarPass = true
      this.inputPassword.nativeElement.type = "password"
    }
  }
}
