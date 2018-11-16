import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { NotesComponent } from './notes/notes.component';
import { StoreModule } from '@ngrx/store';
import * as fromNotes from './notes/notes.reducer';
import { EffectsModule } from '@ngrx/effects';
import { NotesEffects, NOTES_FEATURE_STATE_NAME } from './notes';
import { HomeRoutingModule } from './home-routing.module';
import { NewNoteComponent } from './notes/newnote/newnote.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ClarityModule, ClrFormsNextModule } from '@clr/angular';
import { ConfirmDeleteComponent } from './notes/confirm-delete/confirm-delete.component';

@NgModule({
    imports: [
        CommonModule,
        HomeRoutingModule,
        StoreModule.forFeature(NOTES_FEATURE_STATE_NAME, fromNotes.reducer),
        EffectsModule.forFeature([NotesEffects]),
        ReactiveFormsModule,
        ClarityModule,
        ClrFormsNextModule, // forms are not by default in clarity module
    ],
    declarations: [
        HomeComponent,
        NotesComponent,
        NewNoteComponent,
        ConfirmDeleteComponent,
    ]
})
export class HomeModule { }
