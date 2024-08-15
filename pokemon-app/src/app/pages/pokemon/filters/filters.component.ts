import { Component, input, Input } from '@angular/core';
import { SearchBoxComponent } from '../../../components/search-box/search-box.component';
import { SpeciesComponent } from './species/species.component';
import { CommonModule } from '@angular/common';
import { SelectOptionComponent } from '../../../components/select-option/select-option.component';
import { FilterTypes } from '../../../services/pokeapi.service';

@Component({
  selector: 'app-filters',
  standalone: true,
  imports: [
    SearchBoxComponent,
    SpeciesComponent,
    CommonModule,
    SelectOptionComponent
  ],
  templateUrl: './filters.component.html',
  styleUrl: './filters.component.scss'
})
export class FiltersComponent {
  filterTypes = FilterTypes

  displayPanel: boolean = false;

  showPanel(){
    this.displayPanel = !this.displayPanel;
  }

}
