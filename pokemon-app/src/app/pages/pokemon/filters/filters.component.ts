import { Component } from '@angular/core';
import { SearchBoxComponent } from '../../../components/search-box/search-box.component';

@Component({
  selector: 'app-filters',
  standalone: true,
  imports: [
    SearchBoxComponent
  ],
  templateUrl: './filters.component.html',
  styleUrl: './filters.component.scss'
})
export class FiltersComponent {

}
