import { createSelector, createFeatureSelector } from '@ngrx/store';
import { ContactsState } from '.';

export const CONTACTS_FEATURE_STATE_NAME = 'contacts';

export const selectState = createFeatureSelector<ContactsState>(CONTACTS_FEATURE_STATE_NAME);

export const isLoading = createSelector(
    selectState,
    (state: ContactsState) => state.pending
);

export const getDisplaySearch = createSelector(
    selectState,
    (state: ContactsState) => state.displaySearch
);

export const getContacts = createSelector(
    selectState,
    (state: ContactsState) => state.mycontacts
);

export const getSearchResult = createSelector(
    selectState,
    (state: ContactsState) => state.searchResults
);

export const isPending = createSelector(
    selectState,
    (state: ContactsState) => state.pending
);

export const hasContacts = createSelector(
    selectState,
    (state: ContactsState) => state.mycontacts !== null && state.mycontacts.length > 0
);
