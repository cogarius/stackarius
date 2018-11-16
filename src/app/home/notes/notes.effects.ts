import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import {
    NotesActionTypes, GetNotesError, GetNotesSuccess,
    CreateUpdateNoteBegin, CreateUpdateNoteSuccess,
    NoteError, DeleteNoteBegin, DeleteNoteSuccess, DeleteNoteError
} from './notes.actions';
import { switchMap, map, catchError } from 'rxjs/operators';
import { NoteService } from './note.service';
import { of } from 'rxjs';
import { FatalError } from 'src/app/error/error.actions';
import { Note } from 'src/app/core/models/note.model';
import { Back, Go } from 'src/app/store/navigation';
import { DataWasFetched } from 'src/app/store';

@Injectable()
export class NotesEffects {

    constructor(private actions$: Actions,
        private service: NoteService) { }

    @Effect()
    getNotes$ = this.actions$
        .pipe(
            ofType(NotesActionTypes.GetNotesBeginType),
            switchMap(() => this.service.getNotes()
                .pipe(
                    map(notes => [notes, null]),
                    catchError((err) => {
                        return of([null, err]);
                    })
                )),
            map(([notes, err]: [Note[], Error]) => {
                if (err) {
                    console.warn('getNotes err:', err);
                    return new GetNotesError({ error: err });
                }
                return new GetNotesSuccess({ notes });
            }),
            catchError((err) => {
                console.warn('Uncaught error detected, broken pipe, NGRX effects might not work due to :', err);
                return of(new FatalError({ error: err }));
            })
        );

    @Effect()
    notifDataFetched$ = this.actions$
        .pipe(
            ofType(NotesActionTypes.GetNotesSuccessType),
            map(x => new DataWasFetched({ notes: true })));

    @Effect()
    createNewPrivateNote$ = this.actions$
        .pipe(
            ofType(NotesActionTypes.CreateUpdateNoteBeginType),
            switchMap((x: CreateUpdateNoteBegin) => this.service.writeNote(x.payload.note)
                .pipe(
                    map((written: boolean) => written ? new CreateUpdateNoteSuccess()
                        : new NoteError({ error: new Error('writeNote returned false') })),
                    catchError((err) => {
                        return of(new NoteError({ error: err }));
                    })
                )
            ),
            catchError((err) => {
                console.warn('Uncaught error detected, broken pipe, NGRX effects might not work due to :', err);
                return of(new FatalError({ error: err }));
            })
        );

    @Effect()
    deleteNote$ = this.actions$
        .pipe(
            ofType(NotesActionTypes.DeleteNoteBeginType),
            switchMap((x: DeleteNoteBegin) => this.service.deleteNote(x.payload.id)
                .pipe(
                    map((deleted: boolean) => deleted ? new DeleteNoteSuccess()
                        : new DeleteNoteError({ error: new Error('deleteNote returned false') })),
                    catchError((err) => {
                        return of(new DeleteNoteError({ error: err }));
                    })
                )
            ),
            catchError((err) => {
                console.warn('Uncaught error detected, broken pipe, NGRX effects might not work due to :', err);
                return of(new FatalError({ error: err }));
            })
        );


    @Effect()
    navBackAfterNoteCreatedOrUpdated$ = this.actions$
        .pipe(
            ofType(NotesActionTypes.CreateUpdateNoteSuccessType),
            map(() => new Back())
        );

    @Effect()
    navToEditNote$ = this.actions$
        .pipe(
            ofType(NotesActionTypes.SetNoteToEditType),
            map(() => new Go({ path: ['/notes/edit'] }))
        );
    @Effect()
    navToNewNote$ = this.actions$
        .pipe(
            ofType(NotesActionTypes.NewNoteRedirectType),
            map(() => new Go({ path: ['/notes/new'] }))
        );
}
