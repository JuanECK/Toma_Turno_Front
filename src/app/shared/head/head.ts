import { Component, ElementRef, ViewChild } from '@angular/core';
import { AuthService } from '../../core/service/authService.service';

@Component({
  selector: 'app-head',
  imports: [],
  templateUrl: './head.html',
  styleUrl: './head.css'
})
export class Head {
constructor(
  private authService:AuthService
){}

@ViewChild('drop') drop!:ElementRef

// opcion para desplegarlo con un clic
dropdown(){

//   this.drop.nativeElement.classList.toggle('mostrar')
//   console.log(this.drop.nativeElement)

}

logOut(){
  this.authService.logOut();
}

}
