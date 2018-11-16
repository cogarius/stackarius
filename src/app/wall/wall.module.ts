import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WallComponent } from './wall.component';
import { PostComponent } from './post/post.component';
import { StoreModule } from '@ngrx/store';
import * as fromWalls from './post/post.reducer';
import { EffectsModule } from '@ngrx/effects';
import { PostEffects, POST_FEATURE_STATE_NAME } from './post';
import { WallRoutingModule } from './wall-routing.module';
import { NewPostComponent } from './post/newpost/newpost.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ClarityModule, ClrFormsNextModule } from '@clr/angular';
import { ConfirmPostDeleteComponent } from './post/confirm-post-delete/confirm-post-delete.component';
import { ContactsModule } from '../contacts/contacts.module';

@NgModule({
    imports: [
        CommonModule,
        StoreModule.forFeature(POST_FEATURE_STATE_NAME, fromWalls.reducer),
        EffectsModule.forFeature([PostEffects]),
        ReactiveFormsModule,
        ClarityModule,
        ClrFormsNextModule, // forms are not by default in clarity module
        WallRoutingModule,
        ContactsModule,
    ],
    declarations: [
        WallComponent,
        PostComponent,
        NewPostComponent,
        ConfirmPostDeleteComponent,
    ]
})
export class WallModule { }
