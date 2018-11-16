import { Action } from '@ngrx/store';

export enum AppStartActionTypes {
    AppInitActionType = '[AppStart] main App Component Init',
    DataWasFetchedType = '[AppStart] data was fetched'

}

export class AppInit implements Action {
    readonly type = AppStartActionTypes.AppInitActionType;
}

export class DataWasFetched implements Action {
    readonly type = AppStartActionTypes.DataWasFetchedType;
    constructor(public payload:
        {
            notes?: boolean,
            posts?: boolean,
            contacts?: boolean
        } =
        {
            notes: false,
            posts: false,
            contacts: false
        }) { }
    // constructor(public payload: {
    //     notes = false,
    //     posts = false,
    //     contacts = false,
    // }: { notes ?: boolean, posts: boolean, contacts ?: boolean }={ }) { }
}

export type AppStartActions = AppInit
    | DataWasFetched
    ;


function sayName({ first = 'Bob', last = 'Smith' }: { first?: string; last?: string } = {}) {
    const name = first + ' ' + last;
    alert(name);
}
