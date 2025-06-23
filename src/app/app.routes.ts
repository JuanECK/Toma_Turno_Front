import { Routes } from '@angular/router';
import { PantallaEscritorio } from './business/pantalla-escritorio/pantalla-escritorio';
import { Inicio } from './business/inicio/inicio';
import { PantallaPublica } from './business/pantalla-publica/pantalla-publica';
import { PantallaTickets } from './business/pantalla-tickets/pantalla-tickets';

export const routes: Routes = [
    { path:'', component:Inicio },
    { path:'desk/:id', component:PantallaEscritorio },
    { path:'public', component:PantallaPublica },
    { path:'tickets', component:PantallaTickets },
];
