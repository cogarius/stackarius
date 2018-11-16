import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { NotesState, getNotes, isPending } from '.';
import { Observable } from 'rxjs';
import { Note } from 'src/app/core/models/note.model';
import { GetNotesBegin, SetNoteToEdit, NewNoteRedirect, DisplayConfirm } from './notes.actions';
import { NoteService } from './note.service';

@Component({
    selector: 'app-notes',
    templateUrl: './notes.component.html',
    styleUrls: ['./notes.component.css']
})
export class NotesComponent implements OnInit {

    mynotes$: Observable<Note[]>;
    isPending$: Observable<boolean>;
    constructor(private store$: Store<NotesState>) { }

    ngOnInit() {
        this.mynotes$ = this.store$.select(getNotes);
        this.isPending$ = this.store$.select(isPending);
        this.store$.dispatch(new GetNotesBegin());
    }
    newNote() {
        this.store$.dispatch(new NewNoteRedirect());
    }

    editNote(note: Note) {
        this.store$.dispatch(new SetNoteToEdit({ note }));
    }

    displayConfirmDeletion(note: Note) {
        this.store$.dispatch(new DisplayConfirm({ note }));
    }

}
