import { Component, effect, OnInit } from '@angular/core';
import { Filters, PokeapiService } from '../../../services/pokeapi.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-grid',
  standalone: true,
  imports: [],
  templateUrl: './grid.component.html',
  styleUrl: './grid.component.scss'
})
export class GridComponent implements OnInit{

  list$ = this.pokiApi['gridStore']

  constructor(
    private pokiApi: PokeapiService,
    private activeRoute: ActivatedRoute
  ){

    effect(() => console.log(this.list$()))
  }
  ngOnInit(): void {
    this.activeRoute.queryParams.subscribe((data) => {
      this.pokiApi.listPokemon({name: 'c'} as any, {types: 'ground'} as any)
    })
  }

}
