import { Component } from '@angular/core';
import { Head } from "../head/head";
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-layout',
  imports: [Head, RouterOutlet],
  templateUrl: './layout.html',
  styleUrl: './layout.css'
})
export class Layout {

}
