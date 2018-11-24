import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmDeleteComponent } from './confirm-delete.component';
import { StoreModule } from '@ngrx/store';
import { reducers } from 'src/app/store';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('ConfirmDeleteComponent', () => {
    let component: ConfirmDeleteComponent;
    let fixture: ComponentFixture<ConfirmDeleteComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ConfirmDeleteComponent],
            imports: [
                StoreModule.forRoot(reducers)
            ],
            schemas: [CUSTOM_ELEMENTS_SCHEMA]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ConfirmDeleteComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
