import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardComponent } from './card.component';
import { PokeStore } from '../../../../models/pokemon';


const mockPokemon: Partial<PokeStore> = {
    species: {
        color: {
            name: 'white'
        },
        name: 'test',
        url: 'test'
    },
    sprites: {
        front_default:  '',
        back_default: '',
        back_shiny: '',
        front_female: null,
        front_shiny: '',
        front_shiny_female:  null,
        back_female: null,
        back_shiny_female: null
        
    }
    
}

describe('CardComponent', () => {
    let component: CardComponent;
    let fixture: ComponentFixture<CardComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [CardComponent]
        })
            .compileComponents();
    
        fixture = TestBed.createComponent(CardComponent);
        component = fixture.componentInstance;
        fixture.componentRef.setInput('pokemon', mockPokemon );
        fixture.detectChanges();
        
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
