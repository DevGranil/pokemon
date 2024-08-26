import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectOptionComponent } from './select-option.component';
import { PokeapiService } from '../../services/pokeapi.service';
import { RouterModule } from '@angular/router';

describe('SelectOptionComponent', () => {
    let component: SelectOptionComponent;
    let fixture: ComponentFixture<SelectOptionComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                SelectOptionComponent,
                RouterModule.forRoot([])
            ],
            providers: [{provide: PokeapiService, useValue: () => {}}]
        })
            .compileComponents();
    
        fixture = TestBed.createComponent(SelectOptionComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
