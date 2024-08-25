import { Component, input } from '@angular/core';
import { PokeStore } from '../../../../services/pokeapi.service';
import { CommonModule } from '@angular/common';


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

}
