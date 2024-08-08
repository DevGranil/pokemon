import { Component } from '@angular/core';
import { PokeapiService } from '../../../services/pokeapi.service';

@Component({
  selector: 'app-grid',
  standalone: true,
  imports: [],
  templateUrl: './grid.component.html',
  styleUrl: './grid.component.scss'
})
export class GridComponent {

  constructor(private pokiApi: PokeapiService){}

}
