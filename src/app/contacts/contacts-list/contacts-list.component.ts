import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store';
import { ContactSearchResult } from '../models/contact-search.model';
import { Observable } from 'rxjs';
import { getContacts, hasContacts, DisplayContactSearch, GetMyContactsBegin, RemoveContactBegin, isPending } from '../store';

@Component({
    selector: 'app-contacts-list',
    templateUrl: './contacts-list.component.html',
    styleUrls: ['./contacts-list.component.css']
})
export class ContactsListComponent implements OnInit {

    mycontacts$: Observable<ContactSearchResult[]>;
    hasContacts$: Observable<boolean>;
    isPending$: Observable<boolean>;
    constructor(private store$: Store<AppState>) { }

    ngOnInit() {
        this.mycontacts$ = this.store$.select(getContacts);
        this.hasContacts$ = this.store$.select(hasContacts);
        this.isPending$ = this.store$.select(isPending);
        this.store$.dispatch(new GetMyContactsBegin());
    }

    displaySearch() {
        this.store$.dispatch(new DisplayContactSearch());
    }
    removeContact(c: ContactSearchResult) {
        if (c) {
            this.store$.dispatch(new RemoveContactBegin({ id: c.id }));
        }
    }

}
