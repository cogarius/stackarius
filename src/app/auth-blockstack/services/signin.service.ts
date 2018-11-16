import { Injectable } from '@angular/core';
import * as blockstack from 'blockstack';
import { Observable, of } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { from } from 'rxjs';
import { UserData } from '../models/user-data.model';

@Injectable({
    providedIn: 'root'
})
export class SignInService {

    constructor() { }

    public isUserSignedIn(): Observable<boolean> {
        return of(blockstack.isUserSignedIn());
    }

    public handlePendingSignIn(): Observable<UserData | null> {
        // blockstack.handlePendingSignIn() returns a Promise: that resolves to the user data object
        // if successful and rejects if handling the sign in request fails or there was no pending sign in request.
        return from(blockstack.handlePendingSignIn())
            .pipe(
                tap(x => console.log('handlePendingSignIn resp:', x)),
                catchError((err) => {
                    console.warn('blockstack handlePendingSignIn threw an error probably because there was not pending sign in to process.', err);
                    return of(null);
                })
            );
    }

    public isSignInPending(): Observable<boolean> {
        return of(blockstack.isSignInPending());
    }

    public loadUserData(): Observable<UserData> {
        return of(blockstack.loadUserData());
    }

    public redirectToSignIn(): Observable<void> {
        const origin = window.location.origin;
        return of(blockstack.redirectToSignIn(origin + '/login', origin + '/manifest_blockstack.json', ['store_write', 'publish_data']));
    }

    public signOut(): Observable<void> {
        const origin = window.location.origin;
        return of(blockstack.signUserOut(origin));
    }
}
