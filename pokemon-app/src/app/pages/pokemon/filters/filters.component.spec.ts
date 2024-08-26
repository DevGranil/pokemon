import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FiltersComponent } from './filters.component';
import { PokeapiService } from '../../../services/pokeapi.service';
import { RouterModule } from '@angular/router';
import { signal } from '@angular/core';

describe('FiltersComponent', () => {
    let component: FiltersComponent;
    let fixture: ComponentFixture<FiltersComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                FiltersComponent,
                RouterModule.forRoot([])
            ],
            providers: [{provide: PokeapiService, useValue: {
                totalResults: () => signal<number>(0),
                displayedResults: ()  => signal<number>(0)
            }}]
        })
            .compileComponents();
    
        fixture = TestBed.createComponent(FiltersComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
