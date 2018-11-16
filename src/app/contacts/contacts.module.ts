import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContactsRoutingModule } from './contacts-routing.module';
import { ContactsListComponent } from './contacts-list/contacts-list.component';
import { SearchContactComponent } from './search-contact/search-contact.component';
import { ContactsMainComponent } from './contacts-main/contacts-main.component';
import { ClarityModule, ClrFormsNextModule } from '@clr/angular';
import { StoreModule } from '@ngrx/store';
import * as fromContacts from './store/contacts.reducer';
import { EffectsModule } from '@ngrx/effects';
import { ContactsEffects } from './store/contacts.effects';
import { CONTACTS_FEATURE_STATE_NAME } from './store';

@NgModule({
    imports: [
        CommonModule,
        ContactsRoutingModule,
        ClarityModule,
        ClrFormsNextModule,
        StoreModule.forFeature(CONTACTS_FEATURE_STATE_NAME, fromContacts.reducer),
        EffectsModule.forFeature([ContactsEffects]),
    ],
    declarations: [
        ContactsListComponent,
        SearchContactComponent,
        ContactsMainComponent,
    ]
})
export class ContactsModule { }
