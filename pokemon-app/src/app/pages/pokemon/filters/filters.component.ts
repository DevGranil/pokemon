import { Component } from '@angular/core';
import { SearchBoxComponent } from '../../../components/search-box/search-box.component';
import { CommonModule } from '@angular/common';
import { SelectOptionComponent } from '../../../components/select-option/select-option.component';
import { FilterTypes, PokeapiService } from '../../../services/pokeapi.service';
import { PillsComponent } from '../../../components/pills/pills.component';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-filters',
    standalone: true,
    imports: [
        SearchBoxComponent,
        CommonModule,
        SelectOptionComponent,
        PillsComponent,
        RouterLink
    ],
    templateUrl: './filters.component.html',
    styleUrl: './filters.component.scss'
})
export class FiltersComponent{
    filterTypes = FilterTypes
    displayPanel: boolean = false;
    total = this.pokeApiService.totalResults()
    displayed = this.pokeApiService.displayedResults()

    constructor(
        private pokeApiService: PokeapiService
    ){}

    showPanel(){
        this.displayPanel = !this.displayPanel;
    }

}
