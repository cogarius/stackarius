import { Action } from '@ngrx/store';
import { Note } from 'src/app/core/models/note.model';

export enum NotesActionTypes {
    GetNotesBeginType = '[Notes] get Notes begin',
    GetNotesSuccessType = '[Notes] get Notes success',
    GetNotesErrorType = '[Notes] get Notes ERROR',

    CreateUpdateNoteBeginType = '[Notes] create or update begin',
    NoteCancelType = '[Notes] cancel',
    CreateUpdateNoteSuccessType = '[Notes] create or update success',
    NoteErrorType = '[Notes]  create or update  ERROR',

    SetNoteToEditType = '[Notes] set note to edit',
    NewNoteRedirectType = '[Notes] redirect to new note',
    DisplayConfirmDeleteType = '[Notes] display delete confirm',
    DeleteNoteBeginType = '[Notes] delete begin',
    DeleteNoteSuccessType = '[Notes] delete success',
    DeleteNoteErrorType = '[Notes] delete error',
    CancelConfirmType = '[Notes] cancel confirm',
}

export class GetNotesBegin implements Action {
    readonly type = NotesActionTypes.GetNotesBeginType;
}
export class GetNotesSuccess implements Action {
    readonly type = NotesActionTypes.GetNotesSuccessType;
    constructor(public payload: { notes: Note[] }) { }
}
export class GetNotesError implements Action {
    readonly type = NotesActionTypes.GetNotesErrorType;
    constructor(public payload: { error: Error }) { }
}

export class NewNoteRedirect implements Action {
    readonly type = NotesActionTypes.NewNoteRedirectType;
}
export class CreateUpdateNoteBegin implements Action {
    readonly type = NotesActionTypes.CreateUpdateNoteBeginType;
    constructor(public payload: { note: Note }) { }
}
export class NoteCancel implements Action {
    readonly type = NotesActionTypes.NoteCancelType;
}
export class CreateUpdateNoteSuccess implements Action {
    readonly type = NotesActionTypes.CreateUpdateNoteSuccessType;
}
export class NoteError implements Action {
    readonly type = NotesActionTypes.NoteErrorType;
    constructor(public payload: { error: Error }) { }
}

export class SetNoteToEdit implements Action {
    readonly type = NotesActionTypes.SetNoteToEditType;
    constructor(public payload: { note: Note }) { }
}

export class DisplayConfirm implements Action {
    readonly type = NotesActionTypes.DisplayConfirmDeleteType;
    constructor(public payload: { note: Note }) { }
}
export class CancelConfirm implements Action {
    readonly type = NotesActionTypes.CancelConfirmType;
}
export class DeleteNoteBegin implements Action {
    readonly type = NotesActionTypes.DeleteNoteBeginType;
    constructor(public payload: { id: string }) { }
}
export class DeleteNoteSuccess implements Action {
    readonly type = NotesActionTypes.DeleteNoteSuccessType;
}
export class DeleteNoteError implements Action {
    readonly type = NotesActionTypes.DeleteNoteErrorType;
    constructor(public payload: { error: Error }) { }
}

export type NotesActions =
    GetNotesBegin
    | GetNotesSuccess
    | GetNotesError

    | CreateUpdateNoteBegin
    | NoteCancel
    | CreateUpdateNoteSuccess
    | NoteError

    | SetNoteToEdit
    | DisplayConfirm
    | CancelConfirm
    | NewNoteRedirect
    | DeleteNoteBegin
    | DeleteNoteSuccess
    | DeleteNoteError
    ;
