import { Component } from '@angular/core';
import { SearchBoxComponent } from '../../../components/search-box/search-box.component';
import { SpeciesComponent } from './species/species.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-filters',
  standalone: true,
  imports: [
    SearchBoxComponent,
    SpeciesComponent,
    CommonModule
  ],
  templateUrl: './filters.component.html',
  styleUrl: './filters.component.scss'
})
export class FiltersComponent {

  displayPanel: boolean = false;

  showPanel(){
    this.displayPanel = !this.displayPanel;
  }

}
