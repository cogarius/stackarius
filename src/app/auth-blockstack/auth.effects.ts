import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { map, catchError, switchMap, tap } from 'rxjs/operators';
import {
    AuthActionTypes, UserIsSignedIn, UserNotSigned,
    VerifyUserIsSignedInBegin, LoadUserDataSuccess, LoadUserDataBegin, SignInStaysOnSamePage,
} from './auth.actions';
import { SignInService } from 'src/app/auth-blockstack/services/signin.service';
import { of } from 'rxjs';
import { FatalError } from 'src/app/error/error.actions';
import { AppStartActionTypes } from 'src/app/store/app-start.actions';
import { UserData } from './models/user-data.model';
import { Go } from '../store/navigation';
import { Store, select } from '@ngrx/store';
import { AppState } from '../store';

@Injectable()
export class AuthEffects {

    @Effect()
    verifyAuthOnAppInit$ = this.actions$
        .pipe(
            ofType(AppStartActionTypes.AppInitActionType),
            map(() => new VerifyUserIsSignedInBegin()),
            catchError((err) => {
                console.warn('Uncaught error detected, broken pipe, NGRX effects might not work due to :', err);
                return of(new FatalError({ error: err }));
            })
        );

    @Effect()
    verifyUserIsSignedInBlockstack$ = this.actions$
        .pipe(
            ofType(AuthActionTypes.VerifyUserIsSignedInBeginType),
            switchMap(() => this.service.isUserSignedIn()
                .pipe(
                    tap(x => console.log('check is user signed? ', x)),
                    switchMap((signedIn: boolean) => {
                        if (signedIn) {
                            return of(signedIn);
                        }
                        // check pending sign in
                        return this.service.isSignInPending()
                            .pipe(
                                tap(x => console.log('is a pending sign in? ', x)),
                                switchMap((pending: boolean) => {
                                    if (!pending) {
                                        return of(false); // not signed in nor pending sign in
                                    }
                                    // there is a pending sign in-> handle it ̰
                                    return this.service.handlePendingSignIn()
                                        .pipe(
                                            tap(x => console.log('handlePendingSignIn retrurned ', x)),
                                            map((data: UserData) => data ? true : false)
                                        );
                                })
                            );
                    }),
                )
            ),
            map((loggedIn: boolean) => {
                if (loggedIn) {
                    return new UserIsSignedIn();
                }
                return new UserNotSigned();
            }),
            catchError((err) => {
                console.warn('Uncaught error detected, broken pipe, NGRX effects might not work due to :', err);
                return of(new FatalError({ error: err }));
            })
        );

    @Effect()
    displayWelcomePageWhenNotSignedIn$ = this.actions$
        .pipe(
            ofType(AuthActionTypes.UserNotSignedType),
            map(() => new Go({ path: ['welcome'] }))
        );

    @Effect({ dispatch: false })
    redirectToBlockstackBrowserToSignIn$ = this.actions$
        .pipe(
            ofType(AuthActionTypes.RedirectToBlockstackSignInType),
            switchMap(() => this.service.redirectToSignIn()),
            tap(x => console.log('beeing redirected to blockstack browser for sign in..')),
            catchError((err) => {
                console.warn('Uncaught error detected, broken pipe, NGRX effects might not work due to :', err);
                return of(new FatalError({ error: err }));
            })
        );

    @Effect()
    loadAfterSignIn$ = this.actions$
        .pipe(
            ofType(AuthActionTypes.UserIsSignedInType),
            map(x => new LoadUserDataBegin())
        );

    @Effect()
    navToHomeAfterSignIn$ = this.actions$
        .pipe(
            ofType(AuthActionTypes.UserIsSignedInType),
            tap(x => console.log('check post sign in redirection..')),

            map(x => {
                if (window.location.pathname === '/login'
                    || window.location.pathname === '/'
                    || window.location.pathname === '/welcome') {
                    console.log('nav to home after login');
                    return new Go({ path: ['notes'] });
                }
                return new SignInStaysOnSamePage();
            })
        );

    @Effect()
    loadUserData$ = this.actions$
        .pipe(
            ofType(AuthActionTypes.LoadUserDataBeginType),
            switchMap(() => this.service.loadUserData()),
            map((userdata: UserData) => new LoadUserDataSuccess({ data: userdata })),
            catchError((err) => {
                console.warn('Uncaught error detected, broken pipe, NGRX effects might not work due to :', err);
                return of(new FatalError({ error: err }));
            })
        );

    @Effect({ dispatch: false })
    signOut$ = this.actions$
        .pipe(
            ofType(AuthActionTypes.SignOutBeginType),
            switchMap(() => this.service.signOut()),
            // forces PWA refresh
            tap(x => window.location.reload(true))
            // map(x => new Go({ path: ['home'] }))
        );

    constructor(private actions$: Actions,
        private store$: Store<AppState>,
        private service: SignInService) { }
}
