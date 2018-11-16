import { createSelector } from '@ngrx/store';
import { AppState } from '..';
import { RouterReducerState } from '@ngrx/router-store';



export const selectRouterState = (root: AppState) => root.router;

export const getCurrentUrl = createSelector(
    selectRouterState,
    (state: RouterReducerState) => state.state.root.url
);
