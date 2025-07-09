import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { WebSocketServiceTs } from '../../core/service/web-socket.service.ts';
import { Subscription } from 'rxjs';
import { AuthService } from '../../core/service/authService.service.js';

@Component({
    selector: 'app-pantalla-escritorio',
    standalone: true,
    imports: [],
    templateUrl: './pantalla-escritorio.html',
    styleUrl: './pantalla-escritorio.css'
})
export class PantallaEscritorio implements OnInit {

    constructor(
        private webSocketService: WebSocketServiceTs,
          private authService:AuthService,
    ) { }
    private messageSubscription!: Subscription;

    lblPending = document.getElementById('lbl-pending')
    deskLbl = document.getElementById('deskLbl')
    // noMoreAlert = document.getElementById('alert')

    small: string = 'CTN-1'
    pending: string = ''

    // @ViewChild('currentTicketLbl') currentTicketLbl!: ElementRef;
    // @ViewChild('noMoreAlert') noMoreAlert!: ElementRef;

    deskNumber = 'Sin uso';
    workingTicket: any = null;

    btnSiguienteTurno:boolean = false;

    receivedMessages: any[] = [];
    

    ngOnInit(): void {
        const sesion = localStorage.getItem('sesion');
        if (sesion !== null) {
            let Data = JSON.parse(sesion)
            this.deskNumber = 'Caja '+Data.caja
        }
        //    this.connectToWebSockets()
        this.loadInitialCount()

        this.webSocketService.connect('ws://localhost:3200/ws');

        this.messageSubscription = this.webSocketService.messages$.subscribe(
            (message) => {
                // this.receivedMessages.push(message);
                // console.log('Message received in component:', message);
                const { type, payload } = JSON.parse(message)
                if (type !== 'on-ticket-count-changed') return
                this.checkTicketCount(payload)
            },
            (error) => {
                console.error('Error receiving message:', error);
            }
        );
    }

    checkTicketCount(currentCount = 0) {
        console.log({ count: currentCount })
        if (currentCount === 0) {
            console.log(1)
            document.getElementById('alert')?.classList.remove('d-none');
            this.pending = ''
        } else {
            console.log(2)
            document.getElementById('alert')?.classList.add('d-none');
            this.pending = currentCount.toString()
        }
    }

    async loadInitialCount() {
        const pendingTickets = await fetch('http://localhost:3200/api/ticket/pending', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        }).then(resp => resp.json());
        console.log(pendingTickets)
        this.pending = pendingTickets.length || 0;
        this.checkTicketCount(pendingTickets.length)
    }

    async getTicket() {
        await this.finishTicked();

        const { status, Ticket, message } = await fetch(`http://localhost:3200/api/ticket/draw/${this.deskNumber}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        }).then(resp => resp.json());
        if (status === 'error') {
            console.log(message)
            this.small = message
            return
        }
        this.workingTicket = Ticket;
        this.small = Ticket.number
        this.btnSiguienteTurno = true
    }

    async finishTicked() {
        if (!this.workingTicket) return;
        const { status, message } = await fetch(`http://localhost:3200/api/ticket/done/${this.workingTicket.id}`, {
            method: 'PUT',
            // credentials:"include",
            // mode:"cors",
            headers: {
                'Content-Type': 'application/json'
            },
        }).then(resp => resp.json());
        console.log({ status, message })
        if (status === 'ok') {
            this.workingTicket = null;
            this.small = ''
            this.btnSiguienteTurno = false
        }
    }

    logOut(){
        this.authService.logOut();
    }


    // connectToWebSockets() {

    //     const socket = new WebSocket( 'ws://localhost:3200/ws' );

    //     socket.onmessage = ( event ) => {
    //         console.log('aqui', event)
    //         // console.log(event.data); // on-ticket-count-change
    //         const {type, payload} = JSON.parse( event.data )
    //         if( type !== 'on-ticket-count-changed' ) return
    //         this.checkTicketCount(payload)
    //     };

    //     socket.onclose = ( event ) => {
    //         console.log( 'Connection closed' );
    //         setTimeout( () => {
    //             console.log( 'retrying to connect' );
    //             this.connectToWebSockets();
    //         }, 1500 );

    //     };

    //     socket.onopen = ( event ) => {
    //         console.log( 'Connected' );
    //     };

    // }

}
