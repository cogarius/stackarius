import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactsMainComponent } from './contacts-main.component';
import { ContactsListComponent } from '../contacts-list/contacts-list.component';
import { SearchContactComponent } from '../search-contact/search-contact.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { reducers } from 'src/app/store';

describe('ContactsMainComponent', () => {
    let component: ContactsMainComponent;
    let fixture: ComponentFixture<ContactsMainComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                StoreModule.forRoot(reducers)
            ],
            declarations: [ContactsMainComponent, ContactsListComponent, SearchContactComponent],
            schemas: [CUSTOM_ELEMENTS_SCHEMA]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ContactsMainComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
