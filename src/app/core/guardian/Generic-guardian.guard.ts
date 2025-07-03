import { inject } from '@angular/core';
import { CanActivateFn, GuardResult, MaybeAsync, Router } from '@angular/router';
import { AuthService } from '../service/authService.service';


export const genericGuard: CanActivateFn = (route, state): MaybeAsync<GuardResult> => {
  
  const roles = route.data?.['roles'] as string[]
  let perfilRetorno: boolean =false;
  const router = inject(Router)

  return inject(AuthService).showModul(roles).then(valor =>{
    perfilRetorno = valor;
    if(perfilRetorno) { 
      return true; 
    } 
      return router.createUrlTree(['']);; 
    //   return router.createUrlTree(['desk/:id']); 
});

};