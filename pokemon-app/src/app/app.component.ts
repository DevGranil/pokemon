import { Component, OnInit, signal } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { PokeapiService, PokeStore } from './services/pokeapi.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit{

  constructor(private pokiService: PokeapiService, private router: Router){}

  ngOnInit(): void {
    this.router.navigate([''])
    this.pokiService.buildStore()
  }

}
