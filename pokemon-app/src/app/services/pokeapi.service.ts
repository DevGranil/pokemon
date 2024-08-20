import { HttpClient } from '@angular/common/http';
import { computed, Injectable, Signal, signal } from '@angular/core';
import { BehaviorSubject, filter, lastValueFrom, map, tap } from 'rxjs';

interface PokemonResponse{
  count: number,
  next: string,
  results: {name: string, url: string}[]

}

export interface PokeStore {
  abilities:                Ability[];
  base_experience:          number;
  cries:                    Cries;
  forms:                    Species[];
  game_indices:             GameIndex[];
  height:                   number;
  held_items:               HeldItem[];
  id:                       number;
  is_default:               boolean;
  location_area_encounters: string;
  moves:                    Move[];
  name:                     string;
  order:                    number;
  past_abilities:           any[];
  past_types:               any[];
  species:                  Species;
  sprites:                  Sprites;
  stats:                    Stat[];
  types:                    Type[];
  weight:                   number;
}

export interface Ability {
  ability:   Species;
  is_hidden: boolean;
  slot:      number;
}

export interface Species {
  name: string;
  url:  string;
  [key: string]: any
}

export interface Cries {
  latest: string;
  legacy: string;
}

export interface GameIndex {
  game_index: number;
  version:    Species;
}

export interface HeldItem {
  item:            Species;
  version_details: VersionDetail[];
}

export interface VersionDetail {
  rarity:  number;
  version: Species;
}

export interface Move {
  move:                  Species;
  version_group_details: VersionGroupDetail[];
}

export interface VersionGroupDetail {
  level_learned_at:  number;
  move_learn_method: Species;
  version_group:     Species;
}

export interface GenerationV {
  "black-white": Sprites;
}

export interface GenerationIv {
  "diamond-pearl":        Sprites;
  "heartgold-soulsilver": Sprites;
  platinum:               Sprites;
}

export interface Versions {
  "generation-i":    GenerationI;
  "generation-ii":   GenerationIi;
  "generation-iii":  GenerationIii;
  "generation-iv":   GenerationIv;
  "generation-v":    GenerationV;
  "generation-vi":   { [key: string]: Home };
  "generation-vii":  GenerationVii;
  "generation-viii": GenerationViii;
}

export interface Other {
  dream_world:        DreamWorld;
  home:               Home;
  "official-artwork": OfficialArtwork;
  showdown:           Sprites;
}

export interface Sprites {
  back_default:       string;
  back_female:        null;
  back_shiny:         string;
  back_shiny_female:  null;
  front_default:      string;
  front_female:       null;
  front_shiny:        string;
  front_shiny_female: null;
  other?:             Other;
  versions?:          Versions;
  animated?:          Sprites;
}

export interface GenerationI {
  "red-blue": RedBlue;
  yellow:     RedBlue;
}

export interface RedBlue {
  back_default:      string;
  back_gray:         string;
  back_transparent:  string;
  front_default:     string;
  front_gray:        string;
  front_transparent: string;
}

export interface GenerationIi {
  crystal: Crystal;
  gold:    Gold;
  silver:  Gold;
}

export interface Crystal {
  back_default:            string;
  back_shiny:              string;
  back_shiny_transparent:  string;
  back_transparent:        string;
  front_default:           string;
  front_shiny:             string;
  front_shiny_transparent: string;
  front_transparent:       string;
}

export interface Gold {
  back_default:       string;
  back_shiny:         string;
  front_default:      string;
  front_shiny:        string;
  front_transparent?: string;
}

export interface GenerationIii {
  emerald:             OfficialArtwork;
  "firered-leafgreen": Gold;
  "ruby-sapphire":     Gold;
}

export interface OfficialArtwork {
  front_default: string;
  front_shiny:   string;
}

export interface Home {
  front_default:      string;
  front_female:       null;
  front_shiny:        string;
  front_shiny_female: null;
}

export interface GenerationVii {
  icons:                  DreamWorld;
  "ultra-sun-ultra-moon": Home;
}

export interface DreamWorld {
  front_default: string;
  front_female:  null;
}

export interface GenerationViii {
  icons: DreamWorld;
}

export interface Stat {
  base_stat: number;
  effort:    number;
  stat:      Species;
}

export interface Type {
  slot: number;
  type: Species;
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



  async buildOptions(type: Exclude<FilterTypes, FilterTypes.NAME>){
    switch(type){
      case FilterTypes.COLOR:{
        await this.addSpecies()

        return computed(() => {
          const allColours: string[] = [];
          this._store().forEach(pokemon => {
            allColours.push(pokemon.species[type]['name'])
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
    this.http.get<PokemonResponse>(`${this._api}/pokemon?limit=150`)
    .pipe(map(({results}) => { 
      results.forEach(p => this.http.get<PokeStore>(p.url)
      .subscribe(data => {
        this._store.update(store => [...store, data])
      })) 
    })).subscribe()
  }

  private async addSpecies(){
      for(let [index, element] of this._store().entries()){
        if(!element) break;
          const res = await lastValueFrom(this.http.get<PokeStore>(`${this._api}/pokemon-species/${element.species.name}`))
          let species = {...this._store()[index].species, ...res}
          this._store.update(store => {
            store[index].species = species;
            return store
          })
      }
  }


  nameSlice(input: string){
    return this._store().filter(pokemon => pokemon && pokemon.name.includes(input))
  }


  listPokemon(filters: Filters){
    let filteredStore : PokeStore[] = this._store()
    for(let key in filters){
     
      // const key = k as FilterTypes
      const val = filters[key as FilterTypes];
      switch(key){
        case FilterTypes.NAME: {
          filteredStore = filteredStore.filter(pokemon => pokemon.name.includes(val))
          break
        }
        case FilterTypes.COLOR:{
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
