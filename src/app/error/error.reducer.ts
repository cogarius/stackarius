import { Action } from '@ngrx/store';
import { ErrorActions, ErrorActionTypes } from './error.actions';

export interface ErrorState {
    error: Error;
    isFatal: boolean;
}

export const initialState: ErrorState = {
    error: null,
    isFatal: false,
};

export function reducer(state = initialState, action: ErrorActions): ErrorState {
    switch (action.type) {

        case ErrorActionTypes.FatalErrorType:
            return {
                ...state,
                isFatal: true
            };


        default:
            return state;
    }
}
