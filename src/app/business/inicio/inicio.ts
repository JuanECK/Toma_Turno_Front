import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../core/service/authService.service';

@Component({
  selector: 'app-inicio',
  imports: [RouterLink],
  templateUrl: './inicio.html',
  styleUrl: './inicio.css'
})
export class Inicio {

constructor(
  private authService:AuthService
){}

id:string='1'

logOut(){
  this.authService.logOut();
}

}
