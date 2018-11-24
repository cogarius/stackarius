import { TestBed, inject } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';
import { reducers } from '../store';
import { AuthEffects } from './auth.effects';
import { StoreModule } from '@ngrx/store';

describe('AuthEffects', () => {
    let actions$: Observable<any>;
    let effects: AuthEffects;

    beforeEach(() => {

        TestBed.configureTestingModule({
            imports: [
                StoreModule.forRoot(reducers)
            ],
            providers: [
                AuthEffects,
                provideMockActions(() => actions$)
            ]
        });

        effects = TestBed.get(AuthEffects);
    });

    it('should be created', () => {
        expect(effects).toBeTruthy();
    });
});
