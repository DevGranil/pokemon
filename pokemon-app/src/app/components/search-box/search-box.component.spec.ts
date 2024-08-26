import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchBoxComponent } from './search-box.component';
import { PokeapiService } from '../../services/pokeapi.service';
import { RouterModule } from '@angular/router';

describe('SearchBoxComponent', () => {
    let component: SearchBoxComponent;
    let fixture: ComponentFixture<SearchBoxComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [SearchBoxComponent, RouterModule.forRoot([])],
            providers: [{provide: PokeapiService, useValue: () =>  {}}]
        })
            .compileComponents();
    
        fixture = TestBed.createComponent(SearchBoxComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
