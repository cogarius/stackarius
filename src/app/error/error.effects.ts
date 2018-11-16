import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { ErrorActionTypes } from './error.actions';

@Injectable()
export class ErrorEffects {

    //   @Effect()
    //   loadFoos$ = this.actions$.pipe(ofType(ErrorActionTypes.LoadErrors));

    constructor(private actions$: Actions) { }
}
