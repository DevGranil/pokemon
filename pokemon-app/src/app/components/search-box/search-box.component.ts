import { Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PokeapiService, PokeStore } from '../../services/pokeapi.service';

@Component({
  selector: 'app-search-box',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './search-box.component.html',
  styleUrl: './search-box.component.scss'
})
export class SearchBoxComponent {
  suggestions = signal<PokeStore[]>([])

  constructor(private pokiService: PokeapiService){}

  select(val: any){
    if(!val){
      this.suggestions.set([])
      return;
    }
    this.suggestions.set(this.pokiService.nameSlice(val))
  }

}
