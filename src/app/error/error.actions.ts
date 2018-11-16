import { Action } from '@ngrx/store';

export enum ErrorActionTypes {
    FatalErrorType = '[Error] fatal, nrgx pipe could be broken',
}


export class FatalError implements Action {
    readonly type = ErrorActionTypes.FatalErrorType;
    constructor(public paylaod: { error: Error }) {

    }
}


export type ErrorActions =
    FatalError
    ;
