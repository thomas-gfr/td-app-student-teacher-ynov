import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReinitPasswordComponent } from './reinit-password.component';

describe('ReinitPasswordComponent', () => {
    let component: ReinitPasswordComponent;
    let fixture: ComponentFixture<ReinitPasswordComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ReinitPasswordComponent]
        }).compileComponents();

        fixture = TestBed.createComponent(ReinitPasswordComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
