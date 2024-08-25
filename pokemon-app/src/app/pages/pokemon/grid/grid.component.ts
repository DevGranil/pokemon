import { AfterContentChecked, AfterContentInit, AfterViewInit, Component, effect, ElementRef, OnInit, Signal, ViewChild } from '@angular/core';
import { Filters, PokeapiService, ThrottledData } from '../../../services/pokeapi.service';
import { ActivatedRoute } from '@angular/router';
import { PillsComponent } from '../../../components/pills/pills.component';
import { ScrollHintComponent } from './scroll-hint/scroll-hint.component';
import { CardComponent } from './card/card.component';

@Component({
  selector: 'app-grid',
  standalone: true,
  imports: [
    PillsComponent,
    ScrollHintComponent,
    CardComponent
  ],
  templateUrl: './grid.component.html',
  styleUrl: './grid.component.scss'
})
export class GridComponent implements OnInit{
  @ViewChild('grid')
  set gridWrapper(v: ElementRef) {
    setTimeout(() => {
      this.grid = v.nativeElement;
    }, 0);
  }

  grid: HTMLElement | null = null;
  list$: Signal<ThrottledData> = this.pokiApi.throttledList;
  showHelper: boolean = false;
  showHelperTimeout: any = null;
  speciesAdded = this.pokiApi.addedSpecies
  private throttle: number = 12;

  constructor(
    private pokiApi: PokeapiService,
    private activeRoute: ActivatedRoute
  ){
    effect(() => console.log(this.list$()))
  }

  ngOnInit(): void {
    this.activeRoute.queryParams.subscribe((data) => {
      this.pokiApi.listPokemon(data as Filters)
    })

    this.pokiApi.throttleList(this.throttle)
  
  }

  setShowHelper(){
    this.showHelperTimeout = window.setTimeout(() => {
      if(this.moreToShow(true)) this.showHelper = true;
    }, 3000)
  }

  onScroll(){
    if(!this.grid) return;

    this.showHelper = false;
    

    if(this.moreToShow()){
      this.setShowHelper()
      this.pokiApi.throttleList(this.list$().data.length + this.throttle)
    }
    
    
  }

  moreToShow(forhelper: boolean = false): boolean{
    if(!this.grid) return false;

    const currentlistLength = this.list$().data.length;

    if (this.grid.offsetHeight + this.grid.scrollTop >= this.grid.scrollHeight && currentlistLength < this.list$().max) return true

    if(forhelper) return currentlistLength < this.list$().max
    
    return false

  }

}
