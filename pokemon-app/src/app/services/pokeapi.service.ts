import { HttpClient } from '@angular/common/http';
import { computed, Injectable, signal } from '@angular/core';
import { lastValueFrom, map } from 'rxjs';
import { PokeStore } from '../models/pokemon';

interface PokemonResponse{
    count: number,
    next: string,
    results: {name: string, url: string}[]

}


export enum FilterTypes{
    TYPES = 'types',
    COLOR = 'color',
    NAME = 'name'
}

// interface FilterStruct<Type extends FilterTypes,T>{
//   Type:T 
// }

// interface FilterTypeName extends FilterStruct<FilterTypes.NAME, string>{}
// interface FilterTypeType extends FilterStruct<FilterTypes.TYPES, string>{}
// interface FilterTypeSpecies extends FilterStruct<FilterTypes.COLOR, string>{}

// export type Filters = FilterTypeName | FilterTypeType | FilterTypeSpecies
export type Filters = Record<FilterTypes, string>


export interface ThrottledData{
    data: PokeStore[],
    max: number
}

@Injectable({
    providedIn: 'root'
})
export class PokeapiService {

    private _api: string = 'https://pokeapi.co/api/v2/'
    private _store = signal<PokeStore[]>([])
    private _gridStore = signal<PokeStore[]>([])
    private _throttleStore = signal<PokeStore[]>([])

    addedSpecies = signal<boolean>(false);

    constructor(private http: HttpClient) { }

    throttledList = 
        (computed(() => {
            return {
                data: this._throttleStore(),
                max: this._gridStore().length
            }
        }))
  

    throttleList(throttle: number){
        this._throttleStore.set(this._gridStore().slice(0, throttle))
    }

    totalResults(){
        return computed(() => this._gridStore().length)
    }

    displayedResults(){
        return computed(() => this._throttleStore().length)
    }


    async buildOptions(type: Exclude<FilterTypes, FilterTypes.NAME>){
        switch(type){
            case FilterTypes.COLOR:{
                if(!this.addedSpecies()) await this.addSpecies()

                return computed(() => {
                    const allColours: string[] = [];
                    this._store().forEach(pokemon => {
                        pokemon.species[type] && allColours.push(pokemon.species[type]['name'])
                    })
                    return [...new Set(allColours)];
                })
            }
            case FilterTypes.TYPES:{
                return computed(() => {
                    const allTypes: string[] = [];
                    this._store().forEach(pokemon => {
                        pokemon.types.filter(type => allTypes.push(type.type.name))
                    })
                    return [...new Set(allTypes)];
                })

            }

            default: {
                const exhaustive: never = type;
                console.log('[Exhaustive]: ' + exhaustive)
            }
        }

        return undefined
    }



    buildStore(){
        this.http.get<PokemonResponse>(`${this._api}/pokemon?limit=151`)
            .pipe(map(({results}) => { 
                results.forEach(p => this.http.get<PokeStore>(p.url)
                    .subscribe(data => {
                        this._store.update(store => [...store, data])
                    })) 
            })).subscribe()
    }

    private async addSpecies(){
        for(const [index, element] of this._store().entries()){
            if(!element) break;
            const res = await lastValueFrom(this.http.get<PokeStore>(`${this._api}/pokemon-species/${element.species.name}`))
            const species = {...this._store()[index].species, ...res}
            this._store.update(store => {
                store[index].species = species;
                return store
            })
        }

        this.addedSpecies.set(true);
    }


    nameSlice(input: string){
        return this._store().filter(pokemon => pokemon && pokemon.name.includes(input))
    }


    async listPokemon(filters: Filters){
        let filteredStore : PokeStore[] = this._store()
        for(const key in filters){
     
            // const key = k as FilterTypes
            const val = filters[key as FilterTypes];
            switch(key){
                case FilterTypes.NAME: {
                    filteredStore = filteredStore.filter(pokemon => pokemon.name.includes(val))
                    break
                }
                case FilterTypes.COLOR:{
                    if(!this.addedSpecies()) await this.addSpecies()
                    filteredStore = filteredStore.filter(pokemon => pokemon.species[key] && pokemon.species[key]['name'] === val)
                    break;
                }
                case FilterTypes.TYPES:{
                    const filteredByType : PokeStore[] = [];

                    filteredStore.forEach((pokemon) => {
                        if(pokemon.types.find(type => type.type.name === val)) filteredByType.push(pokemon)
                    })
                    filteredStore = filteredByType
                    break
                }
            }
        }

        this._gridStore.set(filteredStore)
        this.throttleList(10)
    }


  
}
