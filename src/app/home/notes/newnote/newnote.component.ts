import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store';
import { Back } from 'src/app/store/navigation';
import { CreateUpdateNoteBegin } from '../notes.actions';
import { Observable, Subscription } from 'rxjs';
import { getNoteToEdit, isEditMode } from '../notes.selectors';
import { Note } from 'src/app/core/models/note.model';

@Component({
    selector: 'app-newnote',
    templateUrl: './newnote.component.html',
    styleUrls: ['./newnote.component.css']
})
export class NewNoteComponent implements OnInit, OnDestroy {

    newNoteForm: FormGroup;
    noteToEdit$: Observable<Note>;
    beforeEdition: Note;
    isEditMode$: Observable<boolean>;
    sub: Subscription;


    constructor(private store$: Store<AppState>) { }

    ngOnInit() {
        this.noteToEdit$ = this.store$.select(getNoteToEdit);
        this.isEditMode$ = this.store$.select(isEditMode);

        this.sub = this.noteToEdit$.subscribe(note => this.createFormData(note));

    }
    ngOnDestroy(): void {
        this.sub.unsubscribe();
    }

    createFormData(x: Note) {
        this.beforeEdition = x ? x : {} as Note;
        this.newNoteForm = new FormGroup({
            noteId: new FormControl(this.beforeEdition.id),
            noteTitle: new FormControl(this.beforeEdition.title, [
                Validators.required,
                Validators.minLength(5),
                Validators.maxLength(30)
            ]),
            noteContent: new FormControl(this.beforeEdition.content, [
                Validators.required,
                Validators.minLength(5),
                Validators.maxLength(256)
            ]),
        });
    }
    onSubmit() {
        if (this.newNoteForm.valid) {
            const toSave = {
                ...this.beforeEdition,
                title: this.newNoteForm.value.noteTitle,
                content: this.newNoteForm.value.noteContent,
            };
            console.warn('submit:', this.newNoteForm.value);
            this.store$.dispatch(new CreateUpdateNoteBegin({ note: toSave }));
        }
    }
    cancel() {
        // this.store$.dispatch(new NewNoteCancel());
        this.store$.dispatch(new Back());
    }

}
