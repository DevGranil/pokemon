import { Component, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { PokeapiService, PokeStore } from '../../services/pokeapi.service';
import { TextBoldPipe } from '../../pipes/text-bold.pipe';

@Component({
  selector: 'app-search-box',
  standalone: true,
  imports: [
    RouterLink,
    TextBoldPipe
  ],
  templateUrl: './search-box.component.html',
  styleUrl: './search-box.component.scss'
})
export class SearchBoxComponent {
  suggestions = signal<PokeStore[]>([])

  constructor(
    private pokiService: PokeapiService,
    private router: Router
  ){}

  select(val: any){
    if(!val){
      this.suggestions.set([])
      return;
    }
    this.suggestions.set(this.pokiService.nameSlice(val))
  }

  manualSelect(event: Event, val: string){
    const e = event as KeyboardEvent
    if(e.key !== 'Enter') return;
    this.router.navigate(['pokemon'], { queryParams: {name: val} })
  }

}
