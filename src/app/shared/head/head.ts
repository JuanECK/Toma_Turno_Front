import { Component } from '@angular/core';
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

logOut(){
  this.authService.logOut();
}

}
