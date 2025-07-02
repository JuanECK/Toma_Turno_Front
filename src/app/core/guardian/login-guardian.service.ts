import { Injectable } from "@angular/core";
import { AuthService } from "../service/authService.service";
import { CanActivate, Router } from "@angular/router";


@Injectable({
    providedIn: 'root'
})

export class LoginGuardianService implements CanActivate {
    constructor(
        private authService: AuthService,
        private router: Router,
    ){}
     private valorRetorno: boolean =false;

    canActivate(): Promise<boolean> | boolean {
        return this.authService.isAuthenticado().then(response => {
            this.valorRetorno = response;
            console.log(response)
            if(this.valorRetorno){
                // this.router.navigateByUrl('/dashboard');
                console.log('No logueado')
                return true;
                //redimensionar al login si no existe logueo
            }
            else{
                console.log('logueado')
                //redimencionar a las distintas pantallas dependiendo del perfil logeado
                this.router.navigate(['']);
                ///
                return false
            }
        })
    }
    // canActivate(): Promise<boolean> | boolean {
    //     return this.authService.isAuthenticado().then(response => {
    //         this.valorRetorno = response;
    //         console.log(response)
    //         if(this.valorRetorno){
    //             // this.router.navigateByUrl('/dashboard');
    //             console.log('No logueado')
    //             return true;
    //             //redimensionar al login si no existe logueo
    //         }
    //         else{
    //             console.log('logueado')
    //             //redimencionar a las distintas pantallas dependiendo del perfil logeado
    //             this.router.navigateByUrl('/dashboard');
    //             ///
    //             return false
    //         }
    //     })
    // }
}