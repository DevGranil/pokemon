import { Component, input, OnInit } from '@angular/core';
import { Filters, FilterTypes, PokeapiService } from '../../services/pokeapi.service';

@Component({
  selector: 'app-select-option',
  standalone: true,
  imports: [],
  templateUrl: './select-option.component.html',
  styleUrl: './select-option.component.scss'
})
export class SelectOptionComponent implements OnInit {
  readonly filterType = input.required<Exclude<FilterTypes, FilterTypes.NAME>>()

  constructor(private pokiService: PokeapiService){
  }

  ngOnInit(): void {
    this.pokiService.buildOptions(this.filterType())
  }


}
