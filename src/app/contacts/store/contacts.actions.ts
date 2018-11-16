import { Action } from '@ngrx/store';
import { ContactSearchResult, ContactList } from '../models/contact-search.model';

export enum ContactsActionTypes {
    GetMyContactsBeginType = '[Contacts] get mycontacts begin',
    GetMyContactsSuccessType = '[Contacts] get mycontacts SUCCESS',
    GetMyContactsErrorType = '[Contacts] get mycontacts ERROR',

    SearchContactBeginType = '[Contacts] search begin',
    SearchContactSuccessType = '[Contacts] search success',
    SearchContactErrorType = '[Contacts] search ERROR',

    AddToContactBeginType = '[Contacts] add begin',
    AddToContactSuccessType = '[Contacts] add success',
    AddToContactErrorType = '[Contacts] add ERROR',

    RemoveContactBeginType = '[Contacts] remove contact begin',
    RemoveContactSuccessType = '[Contacts] remove contact success',
    RemoveContactErrorType = '[Contacts] remove contact ERROR',

    DisplayContactSearchType = '[Contacts] display search',
    HideContactSearchType = '[Contacts] hide search',
}

export class GetMyContactsBegin implements Action {
    readonly type = ContactsActionTypes.GetMyContactsBeginType;
    constructor(public payload: { successCallback?: Action } = { successCallback: null }) { }
}
export class GetMyContactsSuccess implements Action {
    readonly type = ContactsActionTypes.GetMyContactsSuccessType;
    constructor(public payload: { data: ContactList, successCallback?: Action }) { }
}
export class GetMyContactsError implements Action {
    readonly type = ContactsActionTypes.GetMyContactsErrorType;
    constructor(public payload: { error: Error }) { }
}

export class SearchContactBegin implements Action {
    readonly type = ContactsActionTypes.SearchContactBeginType;
    constructor(public payload: { query: string }) { }
}
export class SearchContactSuccess implements Action {
    readonly type = ContactsActionTypes.SearchContactSuccessType;
    constructor(public payload: { data: ContactSearchResult[] }) { }
}
export class SearchContactError implements Action {
    readonly type = ContactsActionTypes.SearchContactErrorType;
    constructor(public payload: { error: Error }) { }
}

export class RemoveContactBegin implements Action {
    readonly type = ContactsActionTypes.RemoveContactBeginType;
    constructor(public payload: { id: string }) { }
}
export class RemoveContactSuccess implements Action {
    readonly type = ContactsActionTypes.RemoveContactSuccessType;
    constructor(public payload: { deletedId: string }) { }
}
export class RemoveContactError implements Action {
    readonly type = ContactsActionTypes.RemoveContactErrorType;
    constructor(public payload: { error: Error }) { }
}

export class AddToContactBegin implements Action {
    readonly type = ContactsActionTypes.AddToContactBeginType;
    constructor(public payload: { contact: ContactSearchResult }) { }
}
export class AddToContactSuccess implements Action {
    readonly type = ContactsActionTypes.AddToContactSuccessType;
    constructor(public payload: { contact: ContactSearchResult }) { }
}
export class AddToContactError implements Action {
    readonly type = ContactsActionTypes.AddToContactErrorType;
    constructor(public payload: { error: Error }) { }
}


export class DisplayContactSearch implements Action {
    readonly type = ContactsActionTypes.DisplayContactSearchType;
}

export class HideContactSearch implements Action {
    readonly type = ContactsActionTypes.HideContactSearchType;
}

export type ContactsActions =
    SearchContactBegin
    | SearchContactSuccess
    | SearchContactError

    | GetMyContactsBegin
    | GetMyContactsSuccess
    | GetMyContactsError

    | AddToContactBegin
    | AddToContactSuccess
    | AddToContactError
    | DisplayContactSearch
    | HideContactSearch

    | RemoveContactBegin
    | RemoveContactSuccess
    | RemoveContactError
    ;
