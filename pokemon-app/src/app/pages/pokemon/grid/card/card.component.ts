import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PokeStore } from '../../../../models/pokemon';


type Pokemon = PokeStore

@Component({
    selector: 'app-card',
    standalone: true,
    imports: [
        CommonModule
    ],
    templateUrl: './card.component.html',
    styleUrl: './card.component.scss'
})

export class CardComponent {
    pokemon = input.required<Pokemon>()

    constructor(){
    }
    

}
