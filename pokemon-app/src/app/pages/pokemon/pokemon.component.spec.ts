import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PokemonComponent } from './pokemon.component';
import { PokeapiService } from '../../services/pokeapi.service';
import { signal } from '@angular/core';
import { RouterModule } from '@angular/router';

describe('PokemonComponent', () => {
    let component: PokemonComponent;
    let fixture: ComponentFixture<PokemonComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                PokemonComponent,
                RouterModule.forRoot([])
            ],
            providers: [{provide: PokeapiService, useValue: {
                totalResults: () => signal<number>(0),
                displayedResults: ()  => signal<number>(0),
                throttleList: () => {},
                throttledList: signal<any>({
                    data: [],
                    max: 0
                }),
                addedSpecies: signal<boolean>(false)
            }}]
        })
            .compileComponents();
    
        fixture = TestBed.createComponent(PokemonComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
