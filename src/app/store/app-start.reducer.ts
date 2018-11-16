import { Action, createSelector } from '@ngrx/store';
import { AppStartActions, AppStartActionTypes } from './app-start.actions';
import { AppState } from '.';

export interface AppStartState {
    started: boolean;
    contactsFetched: boolean;
    postsFetched: boolean;
    notesFetched: boolean;

}

export const initialState: AppStartState = {
    started: false,
    contactsFetched: false,
    postsFetched: false,
    notesFetched: false,
};

export function reducer(state = initialState, action: AppStartActions): AppStartState {
    switch (action.type) {

        case AppStartActionTypes.AppInitActionType:
            return {
                ...state,
                started: true,
            };

        case AppStartActionTypes.DataWasFetchedType:
            return {
                ...state,
                contactsFetched: state.contactsFetched || action.payload.contacts,
                postsFetched: state.postsFetched || action.payload.posts,
                notesFetched: state.notesFetched || action.payload.notes,
            };


        default:
            return state;
    }
}

export const selectAppStartState = (root: AppState) => root.appStart;
export const selectAppStarted = createSelector(
    selectAppStartState,
    (state: AppStartState) => state.started
);

export const getContactsDataWasFetched = createSelector(
    selectAppStartState,
    (state: AppStartState) => state.contactsFetched
);
export const getNotesDataWasFetched = createSelector(
    selectAppStartState,
    (state: AppStartState) => state.notesFetched
);
export const getPostsDataWasFetched = createSelector(
    selectAppStartState,
    (state: AppStartState) => state.postsFetched
);

