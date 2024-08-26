import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { PokeapiService } from './services/pokeapi.service';

describe('AppComponent', () => {
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [AppComponent],
            providers: [{provide: PokeapiService, useValue: () => {}}]
        }).compileComponents();
    });

    it('should create the app', () => {
        const fixture = TestBed.createComponent(AppComponent);
        const app = fixture.componentInstance;
        expect(app).toBeTruthy();
    });
});
