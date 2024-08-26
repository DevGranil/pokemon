import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchComponent } from './search.component';
import { PokeapiService } from '../../services/pokeapi.service';
import { RouterModule } from '@angular/router';

describe('SearchComponent', () => {
    let component: SearchComponent;
    let fixture: ComponentFixture<SearchComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                SearchComponent,
                RouterModule.forRoot([]),
            
            ],
            providers: [
                {provide: PokeapiService, useValue: () => {}},
              
            ]
        })
            .compileComponents();
    
        fixture = TestBed.createComponent(SearchComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
