import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-usuarios',
  imports: [],
  templateUrl: './usuarios.html',
  styleUrl: './usuarios.css'
})
export class Usuarios implements OnInit {


  // variavles Generales
  
  ArrayListaUsuarios:Array<any>[] = [];

  // Procedimientos

  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }



}
