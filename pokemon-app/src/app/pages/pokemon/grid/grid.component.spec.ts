import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GridComponent } from './grid.component';
import { PokeapiService } from '../../../services/pokeapi.service';
import { RouterModule } from '@angular/router';
import { signal } from '@angular/core';

describe('GridComponent', () => {
    let component: GridComponent;
    let fixture: ComponentFixture<GridComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [GridComponent, RouterModule.forRoot([])],
            providers: [
                {provide: PokeapiService, useValue: {
                    throttledList: signal<any>({
                        data: [],
                        max: 0
                    }),
                    throttleList: () => {},
                    addedSpecies: signal<boolean>(false)
                }}
            ]
        })
            .compileComponents();
    
        fixture = TestBed.createComponent(GridComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
