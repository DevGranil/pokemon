import { Component } from '@angular/core';
import { FiltersComponent } from './filters/filters.component';
import { GridComponent } from './grid/grid.component';

@Component({
    selector: 'app-pokemon',
    standalone: true,
    imports: [
        FiltersComponent,
        GridComponent
    ],
    templateUrl: './pokemon.component.html',
    styleUrl: './pokemon.component.scss'
})
export class PokemonComponent {

}
