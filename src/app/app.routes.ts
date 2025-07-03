import { Routes } from '@angular/router';
import { PantallaEscritorio } from './business/pantalla-escritorio/pantalla-escritorio';
import { Inicio } from './business/inicio/inicio';
import { PantallaPublica } from './business/pantalla-publica/pantalla-publica';
import { PantallaTickets } from './business/pantalla-tickets/pantalla-tickets';
import { Login } from './business/login/login';
import { LoginGuardianService } from './core/guardian/login-guardian.service';
import { SesionGuardianService } from './core/guardian/sesion-guardian.service';
import { Layout } from './shared/layout/layout';
import { PerfilSesionGuardianService } from './core/guardian/Perfil-Sesion-guardian.service';
import { genericGuard } from './core/guardian/Generic-guardian.guard';

export const routes: Routes = [
    

    { path:'login', component:Login, canActivate:[LoginGuardianService]},
    
    
    { path:'', component:Layout, canActivate:[SesionGuardianService],
        children:[
            { path:'', redirectTo: 'admin', pathMatch: 'full' },
            // { path:'admin', component:Inicio,},
            { path:'admin', component:Inicio, canActivate:[PerfilSesionGuardianService,genericGuard],data:{roles:[1]}},
            { path:'desk/:id', component:PantallaEscritorio},
            { path:'public', component:PantallaPublica, canActivate: [genericGuard], data:{roles:[3]}},
            { path:'tickets', component:PantallaTickets, canActivate: [genericGuard], data:{roles:[4]}},
        ]
    },
    // { path:'', redirectTo: 'login', pathMatch: 'full' },
    // { path:'login', component:Login, canActivate:[LoginGuardianService]},

    
    // { path:'dashboard', component:Layout, canActivate:[SesionGuardianService],
    //     children:[
    //         { path:'dashboard/admin', component:Inicio},
    //         { path:'dashboard/desk/:id', component:PantallaEscritorio },
    //         { path:'dashboard/public', component:PantallaPublica },
    //         { path:'dashboard/tickets', component:PantallaTickets },
    //     ]
    // },
];
