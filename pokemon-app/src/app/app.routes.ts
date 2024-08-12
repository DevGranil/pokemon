import { Routes } from '@angular/router';
import { SearchComponent } from './pages/search/search.component';

export const routes: Routes = [
    { 
        path: '',
        component: SearchComponent
    },
    { 
        path: 'pokemon',
        loadComponent: () => import('./pages/pokemon/pokemon.component').then(c => c.PokemonComponent)
    },
];
