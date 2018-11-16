import { TestBed, inject } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { PostEffects } from './post.effects';

describe('PostEffects', () => {
    let actions$: Observable<any>;
    let effects: PostEffects;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                PostEffects,
                provideMockActions(() => actions$)
            ]
        });

        effects = TestBed.get(PostEffects);
    });

    it('should be created', () => {
        expect(effects).toBeTruthy();
    });
});
