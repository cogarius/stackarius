import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { reducers } from '../../store';
import { ContactsListComponent } from './contacts-list.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { StoreModule } from '@ngrx/store';

describe('ContactsListComponent', () => {
    let component: ContactsListComponent;
    let fixture: ComponentFixture<ContactsListComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                StoreModule.forRoot(reducers)
            ],
            declarations: [ContactsListComponent],
            schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ContactsListComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
