import { Component, effect, OnInit, Signal } from '@angular/core';
import { Filters, PokeapiService, ThrottledData } from '../../../services/pokeapi.service';
import { ActivatedRoute } from '@angular/router';
import { PillsComponent } from '../../../components/pills/pills.component';

@Component({
  selector: 'app-grid',
  standalone: true,
  imports: [
    PillsComponent
  ],
  templateUrl: './grid.component.html',
  styleUrl: './grid.component.scss'
})
export class GridComponent implements OnInit{

  list$: Signal<ThrottledData> = this.pokiApi.throttledList;
  private throttle: number = 14;

  constructor(
    private pokiApi: PokeapiService,
    private activeRoute: ActivatedRoute
  ){
    effect(() => console.log(this.list$()))
  }
  ngOnInit(): void {
    this.activeRoute.queryParams.subscribe((data) => {
      this.pokiApi.listPokemon(data as Filters)
      // this.pokiApi.listPokemon({name: 'm'} as any)
    })

    this.pokiApi.throttleList(this.throttle)

  }

  onScroll(event: Event){
    const target = event.target as HTMLDivElement
    if(!this.list$) return;
    if (target.offsetHeight + target.scrollTop >= target.scrollHeight) {
      const currentlistLength = this.list$().data.length;
      const max = this.list$().max
      if( currentlistLength < max){
        this.pokiApi.throttleList(currentlistLength + this.throttle)
      }
    }
  }

}
