import { Action } from '@ngrx/store';
import { NavigationExtras } from '@angular/router';

export enum ActionTypes {
    GO = '[Nav] Go',
    BACK = '[Nav] Back',
    FORWARD = '[Nav] Forward',
}

export class Go implements Action {
    readonly type = ActionTypes.GO;

    constructor(public payload: {
        path: any[];
        query?: object;
        extras?: NavigationExtras;
    }) { }
}

/**
 * Navigate back
 * */
export class Back implements Action {
    readonly type = ActionTypes.BACK;
}

export class Forward implements Action {
    readonly type = ActionTypes.FORWARD;
}


export type Actions
    = Go
    | Back
    | Forward
    ;
