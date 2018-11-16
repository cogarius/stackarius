import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchContactComponent } from './search-contact.component';

describe('SearchContactComponent', () => {
    let component: SearchContactComponent;
    let fixture: ComponentFixture<SearchContactComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [SearchContactComponent]
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
