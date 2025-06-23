import { Injectable } from '@angular/core';
import {  Subject, Observable } from 'rxjs';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';

@Injectable({
  providedIn: 'root'
})
export class WebSocketServiceTs{

private socket!: WebSocket;
  private messageSubject: Subject<any> = new Subject<any>();

  public messages$: Observable<any> = this.messageSubject.asObservable();

  constructor() { }

    public connect(url: string): void {
      this.socket = new WebSocket(url);

      this.socket.onopen = (event) => {
        console.log('Conexión Establecida:');
      };

      this.socket.onmessage = (event) => {
        // Parse the incoming message data if it's JSON
        // const data = JSON.parse(event.data);
        this.messageSubject.next(event.data); // Emit the message data
      };

      this.socket.onclose = (event) => {
        // console.log('WebSocket connection closed:', event);
         setTimeout( () => {
            console.log( 'Reintentando conexión' );
            this.connect('ws://localhost:3200/ws');
        }, 1500 );

      };

      this.socket.onerror = (error) => {
        console.error('WebSocket error:');
      };
  }

  public sendMessage(message: any): void {
    if (this.socket && this.socket.readyState === WebSocket.OPEN) {
      this.socket.send(JSON.stringify(message));
    } else {
      console.warn('WebSocket fuera de servicio.');
    }
  }

  public disconnect(): void {
    if (this.socket) {
      this.socket.close();
    }
  }



  // --------------------------------------------------------------

  //  private socket$!: WebSocketSubject<any>;

  //  constructor() {
  //   // this.socket$ = webSocket('ws://localhost:3200/ws');
  // }

    // Receive messages from the server
  // getMessages(): Observable<any> {
  //   return this.socket$.asObservable();
  // }
  
  // // Close the WebSocket connection
  // closeConnection() {
  //   this.socket$.complete();
  // }

}
