import { TestBed, inject } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { ErrorEffects } from './error.effects';

describe('ErrorEffects', () => {
    let actions$: Observable<any>;
    let effects: ErrorEffects;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                ErrorEffects,
                provideMockActions(() => actions$)
            ]
        });

        effects = TestBed.get(ErrorEffects);
    });

    it('should be created', () => {
        expect(effects).toBeTruthy();
    });
});
