import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { map, tap, catchError } from 'rxjs/operators';
import * as RoutingAction from './navigation.actions';
import { of } from 'rxjs';
import { FatalError } from 'src/app/error/error.actions';

@Injectable()
export class RoutingEffects {

    @Effect({ dispatch: false })
    navigate$ = this.actions$.pipe(
        ofType(RoutingAction.ActionTypes.GO),
        map((action: RoutingAction.Go) => action.payload),
        tap(({ path, query: queryParams, extras }) => this.router.navigate(path, { queryParams, ...extras })),
        // this pipe should never goes on error otherwise effects are broken
        catchError((err) => {
            console.warn('Uncaught error detected, broken pipe, NGRX effects might not work due to :', err);
            return of(new FatalError({ error: err }));
        })
    )

    @Effect({ dispatch: false })
    navigateBack$ = this.actions$.pipe(
        ofType(RoutingAction.ActionTypes.BACK),
        tap(() => this.location.back()),
        // this pipe should never goes on error otherwise effects are broken
        catchError((err) => {
            console.warn('Uncaught error detected, broken pipe, NGRX effects might not work due to :', err);
            return of(new FatalError({ error: err }));
        })
    );

    @Effect({ dispatch: false })
    navigateForward$ = this.actions$.pipe(
        ofType(RoutingAction.ActionTypes.FORWARD),
        tap(() => this.location.forward()),
        // this pipe should never goes on error otherwise effects are broken
        catchError((err) => {
            console.warn('Uncaught error detected, broken pipe, NGRX effects might not work due to :', err);
            return of(new FatalError({ error: err }));
        })
    );

    constructor(
        private actions$: Actions,
        private router: Router,
        private location: Location
    ) { }
}
