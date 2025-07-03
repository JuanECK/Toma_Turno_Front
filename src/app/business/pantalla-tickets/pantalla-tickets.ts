import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../core/service/authService.service';

@Component({
  selector: 'app-pantalla-tickets',
  imports: [],
  templateUrl: './pantalla-tickets.html',
  styleUrl: './pantalla-tickets.css'
})
export class PantallaTickets implements OnInit{

      constructor(
            private authService:AuthService,
      ) { }

currentTicket:string = 'Cargando...'

  ngOnInit(): void {

    this.getLastTicket();

  }


async getLastTicket() {
    const lasTicket = await fetch('http://localhost:3200/api/ticket/last',{
      method: 'GET',
      headers: {
          'Content-Type': 'application/json'
      },
    }).then( resp => resp.json() );
    // console.log(lasTicket)
    this.currentTicket = lasTicket
}

async createTicket() {

    const newTicket = await fetch('http://localhost:3200/api/ticket',{
        method:'POST',
    }).then( resp => resp.json());
    // console.log(newTicket)

    this.currentTicket = newTicket.number;
}

    logOut(){
        this.authService.logOut();
    }


}
