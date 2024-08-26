import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PillsComponent } from './pills.component';
import { RouterModule } from '@angular/router';

describe('PillsComponent', () => {
    let component: PillsComponent;
    let fixture: ComponentFixture<PillsComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                PillsComponent,
                RouterModule.forRoot([])
            ]
        })
            .compileComponents();
    
        fixture = TestBed.createComponent(PillsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
