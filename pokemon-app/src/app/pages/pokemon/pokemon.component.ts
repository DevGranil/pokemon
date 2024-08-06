import { Component } from '@angular/core';
import { FiltersComponent } from './filters/filters.component';

@Component({
  selector: 'app-pokemon',
  standalone: true,
  imports: [FiltersComponent],
  templateUrl: './pokemon.component.html',
  styleUrl: './pokemon.component.scss'
})
export class PokemonComponent {

}
