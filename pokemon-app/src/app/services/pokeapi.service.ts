import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { BehaviorSubject, filter, map, tap } from 'rxjs';

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

interface FilterStruct<N extends FilterTypes,T>{
  N:T 
}

interface FilterTypeName extends FilterStruct<FilterTypes.NAME, string>{}
interface FilterTypeType extends FilterStruct<FilterTypes.TYPES, string>{}
interface FilterTypeSpecies extends FilterStruct<FilterTypes.COLOR, string>{}

export type Filters = FilterTypeName | FilterTypeType | FilterTypeSpecies
// export type Filters = {[key in FilterTypes]: string}

@Injectable({
  providedIn: 'root'
})
export class PokeapiService {

  private _api: string = 'https://pokeapi.co/api/v2/'
  private _store = signal<PokeStore[]>([])
  gridStore = signal<PokeStore[]>([])

  constructor(private http: HttpClient) { }

  buildStore(){
    this.http.get<PokemonResponse>(`${this._api}/pokemon?limit=150`)
    .pipe(map(({results}) => { 
      results.forEach(p => this.http.get<PokeStore>(p.url)
      .subscribe(data => {
        this._store.update(store => [...store, data])
      })) 
    })).subscribe()
  }

  addSpecies(){
    for(let [index, element] of this._store().entries()){
      if(!element) break;
      this.http.get(`${this._api}/pokemon-species/${element.species.name}`)
      .pipe(tap((res) => {
        let species = {...this._store()[index].species, ...res}
        this._store.update(store => {
          store[index].species = species;
          return store
        })
      })).subscribe()
    }
  }


  nameSlice(input: string){
    return this._store().filter(pokemon => pokemon && pokemon.name.includes(input))
  }


  listPokemon(...filters: Filters[]){
    let filteredStore : PokeStore[] = this._store()
    
    filters.forEach(f => {
      const key = Object.keys(f)[0];
      const val = Object.values(f)[0];
      switch(key){
        case FilterTypes.NAME: {
          filteredStore = filteredStore.filter(pokemon => pokemon.name.includes(val))
          break;
        }
        case FilterTypes.COLOR:{
          filteredStore = filteredStore.filter(pokemon => pokemon.species[key] === val)
          break;
        }
        case FilterTypes.TYPES:{
          const filteredByType : PokeStore[] = [];

          filteredStore.forEach((pokemon) => {
              if(pokemon.types.find(type => type.type.name === val)) filteredByType.push(pokemon)
          })

          filteredStore = filteredByType
        }
      }
    })
    this.gridStore.set(filteredStore)

   
  }
  
}
