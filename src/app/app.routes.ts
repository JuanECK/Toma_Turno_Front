import { Routes } from '@angular/router';
import { PantallaEscritorio } from './business/pantalla-escritorio/pantalla-escritorio';
import { Inicio } from './business/inicio/inicio';
import { PantallaPublica } from './business/pantalla-publica/pantalla-publica';
import { PantallaTickets } from './business/pantalla-tickets/pantalla-tickets';
import { Login } from './business/login/login';

export const routes: Routes = [
    
    { path:'login', component:Login },
    { path:'', component:Inicio },
    { path:'desk/:id', component:PantallaEscritorio },
    { path:'public', component:PantallaPublica },
    { path:'tickets', component:PantallaTickets },
];
