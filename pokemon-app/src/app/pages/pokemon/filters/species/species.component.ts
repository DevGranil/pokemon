import { Component, OnInit } from '@angular/core';
import { PokeapiService } from '../../../../services/pokeapi.service';
import { ColorComponent } from './color/color.component';

@Component({
  selector: 'app-species',
  standalone: true,
  imports: [
    ColorComponent
  ],
  templateUrl: './species.component.html',
  styleUrl: './species.component.scss'
})
export class SpeciesComponent implements OnInit {

  constructor(private pokeApiService: PokeapiService){}

  ngOnInit(): void {
    this.pokeApiService.addSpecies()
  }

}
