import { TestBed } from '@angular/core/testing';

import { PokeapiService } from './pokeapi.service';
import { HttpClientModule } from '@angular/common/http';

describe('PokeapiService', () => {
    let service: PokeapiService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [],
            imports: [HttpClientModule]
        });
        service = TestBed.inject(PokeapiService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
