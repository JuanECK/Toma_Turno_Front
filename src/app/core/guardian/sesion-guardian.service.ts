import { Injectable } from "@angular/core";
import { AuthService } from "../service/authService.service";
import { CanActivate, Router } from "@angular/router";


@Injectable({
    providedIn: 'root'
})

export class SesionGuardianService implements CanActivate {
    constructor(
        private authService: AuthService,
        private router: Router,
    ){}
     private valorRetorno: boolean =false;

    canActivate(): Promise<boolean> | boolean {
        return this.authService.isSesionActive().then(response => {
            this.valorRetorno = response.dataCookie;
            console.log(response.dataCookie)
            if(this.valorRetorno){
                // console.log('logueado')
                // switch (response.sesion) {
                //     case: 1
                // }
                // this.router.navigateByUrl('/admin');
                // this.router.navigateByUrl('/dashboard');
                return true;
                //redimensionar al login si no existe logueo
            }
            else{
                // console.log('No logueado')
                //redimencionar a las distintas pantallas dependiendo del perfil logeado
                this.router.navigateByUrl('/login');
                ///
                return false
            }
        })
    }

    // canActivate(): Promise<boolean> | boolean {
    //     return this.authService.isSesionActive().then(response => {
    //         this.valorRetorno = response.dataCookie;
    //         console.log(response.dataCookie)
    //         if(this.valorRetorno){
    //             console.log('logueado')
    //             // switch (response.sesion) {
    //             //     case: 1
    //             // }
    //             // this.router.navigateByUrl('dashboard');
    //             // this.router.navigateByUrl('/dashboard');
    //             return true;
    //             //redimensionar al login si no existe logueo
    //         }
    //         else{
    //             console.log('No logueado')
    //             //redimencionar a las distintas pantallas dependiendo del perfil logeado
    //             this.router.navigateByUrl('/login');
    //             ///
    //             return false
    //         }
    //     })
    // }
}