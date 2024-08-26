import { Component, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { PokeapiService } from '../../services/pokeapi.service';
import { TextBoldPipe } from '../../pipes/text-bold.pipe';
import { FormsModule} from '@angular/forms';
import { PokeStore } from '../../models/pokemon';

@Component({
    selector: 'app-search-box',
    standalone: true,
    imports: [
        RouterLink,
        TextBoldPipe,
        FormsModule
    ],
    templateUrl: './search-box.component.html',
    styleUrl: './search-box.component.scss'
})
export class SearchBoxComponent implements OnInit {
    suggestions = signal<PokeStore[]>([])
    selectItem: string = ''

    constructor(
        private pokiService: PokeapiService,
        private router: Router,
        private activeRoute: ActivatedRoute
    
    ){}

    ngOnInit(): void {
        this.activeRoute.queryParams.subscribe((data) => this.selectItem = data['name'])
    }

    select(val: any){
        if(!val){
            this.suggestions.set([])
            return;
        }
        this.suggestions.set(this.pokiService.nameSlice(val))
    }

    manualSelect(event: Event, val: string){
        const e = event as KeyboardEvent | FocusEvent
        if('key' in e && e.key !== 'Enter') return;
        this.router.navigate(['pokemon'], { queryParams: {name: val}, queryParamsHandling: 'merge' })
        this.suggestions.set([])
    }

    closeSuggestions(){
        this.suggestions.set([])
    }
}
