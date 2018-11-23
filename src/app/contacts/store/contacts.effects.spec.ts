import { TestBed, inject } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { ContactsEffects } from './contacts.effects';
import { StoreModule } from '@ngrx/store';
import { HttpClientModule } from '@angular/common/http';

describe('ContactsEffects', () => {
    let actions$: Observable<any>;
    let effects: ContactsEffects;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [StoreModule.forRoot({}), HttpClientModule],
            providers: [
                ContactsEffects,
                provideMockActions(() => actions$)
            ]
        });

        effects = TestBed.get(ContactsEffects);
    });

    it('should be created', () => {
        expect(effects).toBeTruthy();
    });
});
