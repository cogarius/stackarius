import { createSelector, createFeatureSelector } from '@ngrx/store';
import { AuthState } from './auth.reducer';

export const AUTH_FEATURE_STATE_NAME = 'auth';

export const selectAuthState = createFeatureSelector<AuthState>(AUTH_FEATURE_STATE_NAME);

export const getUserId = createSelector(
    selectAuthState,
    (state: AuthState) => state.blockstackId
);

export const getUserName = createSelector(
    selectAuthState,
    (state: AuthState) => state.username
);
export const isPending = createSelector(
    selectAuthState,
    (state: AuthState) => state.pending
);

export const isAuthenticated = createSelector(
    selectAuthState,
    (state: AuthState) => state.isAuthenticated
);

