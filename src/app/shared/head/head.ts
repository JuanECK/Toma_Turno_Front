import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '../../core/service/authService.service';
import { PuenteDataService } from '../../core/service/puente-data.service';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-head',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './head.html',
  styleUrl: './head.css'
})
export class Head implements OnInit{
constructor(
  private authService:AuthService,
  private puenteData:PuenteDataService
){}

@ViewChild('drop') drop!:ElementRef
dataHead:string = ''
perfil:boolean = false
editar:boolean = false;

  ngOnInit(): void {
    this.getDataLogin()
  }

    getDataLogin(){

    const sesion = localStorage.getItem('sesion');
    if (sesion !== null) {
      let Data = JSON.parse(sesion)
      this.dataHead = Data.nombre
      if(Data.perfil == 1){
        this.editar = false;
      }else if(Data.perfil == 2){
        this.editar = true;
      }
    }

    // this.puenteData.disparadorData.subscribe(data =>{
    //   console.log(data)
    //       this.dataHead = data
    // })
   
  }

// opcion para desplegarlo con un clic
dropdown(){

//   this.drop.nativeElement.classList.toggle('mostrar')
//   console.log(this.drop.nativeElement)

}

logOut(){
  this.authService.logOut();
}

}
