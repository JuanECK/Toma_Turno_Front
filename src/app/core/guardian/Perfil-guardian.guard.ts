import { inject } from '@angular/core';
import { CanActivateFn, GuardResult, MaybeAsync, Router } from '@angular/router';
import { AuthService } from '../service/authService.service';


export const perfilGuard: CanActivateFn = (route, state): MaybeAsync<GuardResult> => {
  
  const roles = route.data?.['roles'] as string[]
  let perfilRetorno: boolean =false;
  const router = inject(Router)

  return inject(AuthService).isAuthenticado(roles).then(valor =>{
    perfilRetorno = valor.dataCookie;
    console.log(valor.sesion)
    if(perfilRetorno) { 
      return true; 
    } 
      return router.createUrlTree([valor.sesion]);
    //   return router.createUrlTree(['desk/:id']); 
});

};