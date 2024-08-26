import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SearchBoxComponent } from '../../components/search-box/search-box.component';

@Component({
    selector: 'app-search',
    standalone: true,
    imports: [
        RouterLink,
        SearchBoxComponent
    ],
    templateUrl: './search.component.html',
    styleUrl: './search.component.scss'
})
export class SearchComponent {


}
