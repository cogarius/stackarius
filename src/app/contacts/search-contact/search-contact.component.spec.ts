import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchContactComponent } from './search-contact.component';
import { StoreModule } from '@ngrx/store';
import { reducers } from 'src/app/store';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('SearchContactComponent', () => {
    let component: SearchContactComponent;
    let fixture: ComponentFixture<SearchContactComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                StoreModule.forRoot(reducers)
            ],
            declarations: [SearchContactComponent],
            schemas: [CUSTOM_ELEMENTS_SCHEMA]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(SearchContactComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
