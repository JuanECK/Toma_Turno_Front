import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pantalla-publica',
  imports: [],
  templateUrl: './pantalla-publica.html',
  styleUrl: './pantalla-publica.css'
})
export class PantallaPublica implements OnInit {


  ngOnInit(): void {
    this.loadCurrentTickets();
    this.connectToWebSockets();
  }

  lblTicket:string = '' 
  lblDesk:string = ''

  arr:any = [{},{},{},{}]

  renderTickets( tickets:any = [] ){
    this.arr = []
    for( let i = 0; i < tickets.length; i++ ){
        if( i >= 4 ) break;
        const ticket = tickets[i];
        if( !ticket ) continue;

        this.arr[i] = {tiket:ticket.number, handleDesk:ticket.handleAtDesk}

        // const lblTicket = document.getElementById(`lbl-ticket-0${ i + 1 }`)
        // const lblDesk = document.getElementById(`lbl-desk-0${ i + 1 }`)

        // this.lblTicket = `Ticket ${ ticket.number }`
        // this.lblDesk = ticket.handleAtDesk
        // lblTicket.innerHTML = `Ticket ${ ticket.number }`
        // lblDesk.innerHTML = ticket.handleAtDesk

    }
    console.log(this.arr)
}

async loadCurrentTickets() {
    const tickets = await fetch('http://localhost:3200/api/ticket/working-on',{
      method: 'GET',
      headers: {
          'Content-Type': 'application/json'
      },
    }).then( resp => resp.json() );
    // console.log(tickets)
    this.renderTickets( tickets );
}


connectToWebSockets() {
    
    const socket = new WebSocket( 'ws://localhost:3200/ws' );
    
    socket.onmessage = ( event ) => {
        const {type, payload} = JSON.parse( event.data )
        if( type !== 'on-working-changed' ) return
        this.renderTickets(payload)
    };
    
    socket.onclose = ( event ) => {
        setTimeout( () => {
            this.connectToWebSockets();
        }, 1500 );
        
    };
    
    socket.onopen = ( event ) => {
        console.log( 'Connected' );
    };
    
}

}
