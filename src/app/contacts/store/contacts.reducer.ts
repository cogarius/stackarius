import { Action } from '@ngrx/store';
import { ContactsActions, ContactsActionTypes } from './contacts.actions';
import { ContactSearchResult } from '../models/contact-search.model';

export interface ContactsState {
    pending: boolean;
    error: Error;
    displaySearch: boolean;
    searchResults: ContactSearchResult[];
    mycontacts: ContactSearchResult[];
}

export const initialState: ContactsState = {
    pending: false,
    displaySearch: false,
    searchResults: new Array<ContactSearchResult>(),
    mycontacts: new Array<ContactSearchResult>(),
    error: null,
};

export function reducer(state = initialState, action: ContactsActions): ContactsState {
    switch (action.type) {

        case ContactsActionTypes.GetMyContactsBeginType:
            return {
                ...state,
                pending: true,
            };
        case ContactsActionTypes.GetMyContactsSuccessType:
            return {
                ...state,
                pending: false,
                mycontacts: action.payload.data,
            };
        case ContactsActionTypes.GetMyContactsErrorType:
            return {
                ...state,
                pending: false,
                error: action.payload.error,
            };

        case ContactsActionTypes.SearchContactBeginType:
            return {
                ...state,
                pending: true,
            };
        case ContactsActionTypes.SearchContactSuccessType:
            return {
                ...state,
                pending: false,
                searchResults: action.payload.data,
                error: null,
            };
        case ContactsActionTypes.SearchContactErrorType:
            return {
                ...state,
                pending: false,
                error: action.payload.error,
            };

        case ContactsActionTypes.DisplayContactSearchType:
            return {
                ...state,
                displaySearch: true,
            };
        case ContactsActionTypes.HideContactSearchType:
            return {
                ...state,
                displaySearch: false,
            };

        case ContactsActionTypes.AddToContactBeginType:
            return {
                ...state,
                pending: true,
            };
        case ContactsActionTypes.AddToContactSuccessType:
            const newContacts = [...state.mycontacts, action.payload.contact];
            console.warn(`AddToContactSuccess reducer contacts was ${state.mycontacts.length} now ${newContacts.length}`);
            return {
                ...state,
                pending: false,
                displaySearch: false,
                mycontacts: newContacts,
            };
        case ContactsActionTypes.AddToContactErrorType:
            return {
                ...state,
                pending: false,
                error: action.payload.error,
            };


        case ContactsActionTypes.RemoveContactBeginType:
            return {
                ...state,
                pending: true,
            };

        case ContactsActionTypes.RemoveContactSuccessType:
            const contactsAfterRemoval = state.mycontacts.filter(x => x.id !== action.payload.deletedId);
            console.warn(`RemoveContactSuccess reducer contacts was ${state.mycontacts.length} now ${contactsAfterRemoval.length}`);

            return {
                ...state,
                pending: false,
                mycontacts: contactsAfterRemoval,
            };

        case ContactsActionTypes.RemoveContactErrorType:
            return {
                ...state,
                pending: false,
                error: action.payload.error,
            };

        default:
            return state;
    }
}
