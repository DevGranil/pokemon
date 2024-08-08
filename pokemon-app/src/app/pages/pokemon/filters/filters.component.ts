import { Component } from '@angular/core';
import { SearchBoxComponent } from '../../../components/search-box/search-box.component';
import { SpeciesComponent } from './species/species.component';

@Component({
  selector: 'app-filters',
  standalone: true,
  imports: [
    SearchBoxComponent,
    SpeciesComponent
  ],
  templateUrl: './filters.component.html',
  styleUrl: './filters.component.scss'
})
export class FiltersComponent {

}
