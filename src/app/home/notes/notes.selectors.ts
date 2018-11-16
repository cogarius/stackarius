import { createSelector, createFeatureSelector } from '@ngrx/store';
import { NotesState } from './notes.reducer';

export const NOTES_FEATURE_STATE_NAME = 'notes';

export const selectState = createFeatureSelector<NotesState>(NOTES_FEATURE_STATE_NAME);

export const getNotes = createSelector(
    selectState,
    (state: NotesState) => state.notes
);

export const getNoteToEdit = createSelector(
    selectState,
    (state: NotesState) => state.noteToEdit
);

export const getNoteToDelete = createSelector(
    selectState,
    (state: NotesState) => state.noteToDelete
);

export const isEditMode = createSelector(
    selectState,
    (state: NotesState) => state && state.noteToEdit !== null
);

export const isPending = createSelector(
    selectState,
    (state: NotesState) => state.pending
);

export const displayConfirmDelete = createSelector(
    selectState,
    (state: NotesState) => state && state.displayConfirm
);
