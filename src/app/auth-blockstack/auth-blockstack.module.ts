import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import * as fromAuth from './auth.reducer';
import { EffectsModule } from '@ngrx/effects';
import { AuthEffects } from './auth.effects';
import { AUTH_FEATURE_STATE_NAME } from './auth.selectors';

@NgModule({
    imports: [
        CommonModule,
        StoreModule.forFeature(AUTH_FEATURE_STATE_NAME, fromAuth.reducer), // register state slice
        EffectsModule.forFeature([AuthEffects])
    ],
    declarations: [],
})
export class AuthBlockstackModule { }

