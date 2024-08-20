import { Component, input, Input, OnInit } from '@angular/core';
import { SearchBoxComponent } from '../../../components/search-box/search-box.component';
import { CommonModule } from '@angular/common';
import { SelectOptionComponent } from '../../../components/select-option/select-option.component';
import { FilterTypes, PokeapiService } from '../../../services/pokeapi.service';

@Component({
  selector: 'app-filters',
  standalone: true,
  imports: [
    SearchBoxComponent,
    CommonModule,
    SelectOptionComponent
  ],
  templateUrl: './filters.component.html',
  styleUrl: './filters.component.scss'
})
export class FiltersComponent implements OnInit{
  filterTypes = FilterTypes
  displayPanel: boolean = false;

  constructor(private pokeApiService: PokeapiService){}

  ngOnInit(): void {
  }

  showPanel(){
    this.displayPanel = !this.displayPanel;
  }

}
