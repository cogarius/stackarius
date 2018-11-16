import {
    ActionReducer,
    ActionReducerMap,
    createFeatureSelector,
    createSelector,
    MetaReducer
} from '@ngrx/store';
import { routerReducer, RouterReducerState } from '@ngrx/router-store';
import { environment } from '../../environments/environment';
import * as fromAppStart from './app-start.reducer';
import * as fromError from '../error/error.reducer';
// import * as fromRouter from '@ngrx/router-store';
export interface AppState {
    router: RouterReducerState;
    appStart: fromAppStart.AppStartState;
    error: fromError.ErrorState;
}

export const reducers: ActionReducerMap<AppState> = {
    router: routerReducer,
    appStart: fromAppStart.reducer,
    error: fromError.reducer,
};

/**
 * By default, @ngrx/store uses combineReducers with the reducer map to compose
 * the root meta-reducer. To add more meta-reducers, provide an array of meta-reducers
 * that will be composed to form the root meta-reducer.
 */
export const metaReducers: MetaReducer<AppState>[] = !environment.production
    ? [logger]
    : [];

/** Logs action dispatched For debug purpose */
export function logger(
    reducer: ActionReducer<AppState>
): ActionReducer<AppState> {
    return function (state: AppState, action: any): AppState {
        console.groupCollapsed(action.type);
        const nextState = reducer(state, action);
        console.log(
            `%c previous state`,
            `color: #9E9E9E; font-weight: bold`,
            state
        );
        console.log(`%c action`, `color: #03A9F4; font-weight: bold`, action);
        console.log(
            `%c next state`,
            `color: #4CAF50; font-weight: bold`,
            nextState
        );
        console.groupEnd();
        return nextState;
    };
}
