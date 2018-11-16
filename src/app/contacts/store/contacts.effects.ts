import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import {
    ContactsActionTypes, SearchContactBegin, SearchContactSuccess,
    SearchContactError, AddToContactBegin, AddToContactSuccess, AddToContactError,
    GetMyContactsBegin, GetMyContactsSuccess, GetMyContactsError, RemoveContactBegin, RemoveContactSuccess
} from './contacts.actions';
import { ContactsService } from '../services/contacts.service';
import { switchMap, tap, catchError, map, filter, mergeMap } from 'rxjs/operators';
import { FatalError } from 'src/app/error/error.actions';
import { of } from 'rxjs';
import { ContactSearchResult } from '../models/contact-search.model';
import { DataWasFetched } from 'src/app/store';

@Injectable()
export class ContactsEffects {

    constructor(private actions$: Actions, private service: ContactsService) { }

    @Effect()
    getmycontacts$ = this.actions$.pipe(
        ofType(ContactsActionTypes.GetMyContactsBeginType),
        tap(x => console.log('getmycontacts effects starts:', x)),
        mergeMap((a: GetMyContactsBegin) => this.service.getPrivateContactList()
            .pipe(
                tap(x => console.log('getmycontacts found contacts.length: ', x.length)),
                map((r: ContactSearchResult[]) => new GetMyContactsSuccess({ data: r, successCallback: a.payload.successCallback })),
                catchError(error => of(new GetMyContactsError({ error })))
            )
        ),
        tap(x => console.log('getmycontacts effects response:', x)),
        catchError((err) => {
            console.warn('Uncaught error detected, broken pipe, NGRX effects might not work due to :', err);
            return of(new FatalError({ error: err }));
        })
    );

    @Effect()
    successCallbackAndDataDependency$ = this.actions$
        .pipe(
            ofType(ContactsActionTypes.GetMyContactsSuccessType),
            mergeMap((x: GetMyContactsSuccess) => {
                if (x.payload.successCallback) {
                    console.log('successCallbackAndDataDependency will dispatch two actions since successCallback detected ');
                    return [x.payload.successCallback, new DataWasFetched({ contacts: true })];
                }
                return [new DataWasFetched({ contacts: true })];
            }),
            tap(x => console.log('successCallbackAndDataDependency Effet returns ', x)),
        );

    @Effect()
    searchContacts$ = this.actions$.pipe(
        ofType(ContactsActionTypes.SearchContactBeginType),
        switchMap((a: SearchContactBegin) => this.service.searchContacts(a.payload.query)
            .pipe(
                map((r: ContactSearchResult[]) => new SearchContactSuccess({ data: r })),
                catchError(error => of(new SearchContactError({ error })))
            )
        ),
        tap(x => console.log('searchContacts effects response:', x)),
        catchError((err) => {
            console.warn('Uncaught error detected, broken pipe, NGRX effects might not work due to :', err);
            return of(new FatalError({ error: err }));
        })
    );

    @Effect()
    addToContact$ = this.actions$.pipe(
        ofType(ContactsActionTypes.AddToContactBeginType),
        switchMap((a: AddToContactBegin) => this.service.addToContacts(a.payload.contact)
            .pipe(
                map((added: boolean) => added ?
                    new AddToContactSuccess({ contact: a.payload.contact })
                    : new SearchContactError({ error: new Error('addToContacts return false') })),
                catchError(error => of(new AddToContactError({ error })))
            )
        ),
        tap(x => console.log('addToContact effects response:', x)),
        catchError((err) => {
            console.warn('Uncaught error detected, broken pipe, NGRX effects might not work due to :', err);
            return of(new FatalError({ error: err }));
        })
    );


    @Effect()
    removeContact$ = this.actions$.pipe(
        ofType(ContactsActionTypes.RemoveContactBeginType),
        switchMap((a: RemoveContactBegin) => this.service.removeFromContacts(a.payload.id)
            .pipe(
                map((removed: boolean) => removed ?
                    new RemoveContactSuccess({ deletedId: a.payload.id })
                    : new SearchContactError({ error: new Error('removeFromContacts return false') })),
                catchError(error => of(new AddToContactError({ error })))
            )
        ),
        // tap(x => console.log('removeFromContacts effects response:', x)),
        catchError((err) => {
            console.warn('Uncaught error detected, broken pipe, NGRX effects might not work due to :', err);
            return of(new FatalError({ error: err }));
        })
    );
}
