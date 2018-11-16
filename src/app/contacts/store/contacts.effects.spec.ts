import { TestBed, inject } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { ContactsEffects } from './contacts.effects';

describe('ContactsEffects', () => {
    let actions$: Observable<any>;
    let effects: ContactsEffects;

    beforeEach(() => {
        TestBed.configureTestingModule({
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
