import { Component, signal } from '@angular/core';
import { PokeapiService, PokeStore } from '../../services/pokeapi.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss'
})
export class SearchComponent {
  suggestions = signal<PokeStore[]>([])
  
  constructor(private pokiService: PokeapiService){}

  select(val: string){
    if(!val){
      this.suggestions.set([])
      return;
    }
    this.suggestions.set(this.pokiService.nameSlice(val))
  }

}
