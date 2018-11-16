import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store';
import { displayConfirmDelete, getNoteToDelete } from '..';
import { Note } from 'src/app/core/models/note.model';
import { CancelConfirm, DeleteNoteBegin } from '../notes.actions';

@Component({
    selector: 'app-confirm-delete',
    templateUrl: './confirm-delete.component.html',
    styleUrls: ['./confirm-delete.component.css']
})
export class ConfirmDeleteComponent implements OnInit {
    openModal$: Observable<boolean>;
    toDelete$: Observable<Note>;

    constructor(private store$: Store<AppState>) { }

    ngOnInit() {
        this.openModal$ = this.store$.select(displayConfirmDelete);

        this.toDelete$ = this.store$.select(getNoteToDelete);
    }

    cancelDeletion() {
        this.store$.dispatch(new CancelConfirm());
    }
    deleteNote(note: Note) {
        if (note && note.id) {
            this.store$.dispatch(new DeleteNoteBegin({ id: note.id }));
        }
    }
}
