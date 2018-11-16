import { Action } from '@ngrx/store';
import { NotesActions, NotesActionTypes } from './notes.actions';
import { Note } from 'src/app/core/models/note.model';

export interface NotesState {
    notes: Array<Note>;
    error: Error;
    pending: boolean;
    displayConfirm: boolean;
    noteToEdit: Note;
    noteToDelete: Note;
}

export const initialState: NotesState = {
    error: null,
    notes: new Array<Note>(),
    pending: false,
    displayConfirm: false,
    noteToEdit: null,
    noteToDelete: null,
};

export function reducer(state = initialState, action: NotesActions): NotesState {
    switch (action.type) {

        case NotesActionTypes.GetNotesErrorType:
            return {
                ...state,
                error: action.payload.error,
            };
        case NotesActionTypes.GetNotesBeginType:
            return {
                ...state,
                pending: true,
            };
        case NotesActionTypes.GetNotesSuccessType:
            return {
                ...state,
                pending: false,
                notes: action.payload.notes,
            };

        case NotesActionTypes.CreateUpdateNoteBeginType:
            return {
                ...state,
                pending: true,
            };
        case NotesActionTypes.NewNoteRedirectType:
            return {
                ...state,
                pending: false,
                noteToEdit: null, // edit mode is false
            };
        case NotesActionTypes.CreateUpdateNoteSuccessType:
            return {
                ...state,
                pending: false,
            };
        case NotesActionTypes.NoteErrorType:
            return {
                ...state,
                error: action.payload.error,
                pending: false,
            };

        case NotesActionTypes.SetNoteToEditType:
            return {
                ...state,
                noteToEdit: action.payload.note,
                pending: false,
            };
        case NotesActionTypes.DisplayConfirmDeleteType:
            return {
                ...state,
                noteToDelete: action.payload.note,
                displayConfirm: true,
            };
        case NotesActionTypes.CancelConfirmType:
            return {
                ...state,
                displayConfirm: false,
            };
        case NotesActionTypes.DeleteNoteBeginType:
            return {
                ...state,
                pending: true,
            };
        case NotesActionTypes.DeleteNoteSuccessType:
            const newNodes = state.notes.filter(n => n.id !== state.noteToDelete.id);
            return {
                ...state,
                notes: newNodes,
                displayConfirm: false,
                pending: false,
            };
        case NotesActionTypes.DeleteNoteErrorType:
            return {
                ...state,
                error: action.payload.error,
                pending: false,
            };

        default:
            return state;
    }
}

