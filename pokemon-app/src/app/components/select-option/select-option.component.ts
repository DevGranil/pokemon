import { Component, effect, input, OnInit, Signal } from '@angular/core';
import { Filters, FilterTypes, PokeapiService } from '../../services/pokeapi.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormsModule } from '@angular/forms';

@Component({
  selector: 'app-select-option',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './select-option.component.html',
  styleUrl: './select-option.component.scss'
})
export class SelectOptionComponent implements OnInit {
  readonly filterType = input.required<Exclude<FilterTypes, FilterTypes.NAME>>()
  options$: Signal<string[]> | undefined = undefined;
  selectedItem: string = ''

  constructor(
    private pokiService: PokeapiService,
    private router: Router,
    private activeRoute: ActivatedRoute
  ){}

  ngOnInit(): void {
    this.buildOptions()
    this.activeRoute.queryParams.subscribe((data) => this.selectedItem = data[this.filterType()])

  }

  async buildOptions(){
    this.options$ = await this.pokiService.buildOptions(this.filterType())
  }

  selectedOption(el: HTMLSelectElement){
    this.router.navigate([], {
      relativeTo: this.activeRoute,
      queryParams: {[this.filterType()]: el.value},
      queryParamsHandling: 'merge'
    })
  }


}
