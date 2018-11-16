import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store';
import { SearchContactBegin, isLoading, getSearchResult, HideContactSearch, AddToContactBegin } from '../store';
import { Subject, Observable, Subscription } from 'rxjs';
import { filter, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { ContactSearchResult } from '../models/contact-search.model';

@Component({
    selector: 'app-search-contact',
    templateUrl: './search-contact.component.html',
    styleUrls: ['./search-contact.component.css']
})
export class SearchContactComponent implements OnInit, OnDestroy {

    searchTerm$ = new Subject<string>();
    pending$: Observable<boolean>;
    sub: Subscription;
    searchResults$: Observable<ContactSearchResult[]>;

    constructor(private store$: Store<AppState>) { }

    ngOnInit() {
        this.sub = this.debounceInput(this.searchTerm$).subscribe(x => this.store$.dispatch(new SearchContactBegin({ query: x })));
        this.pending$ = this.store$.select(isLoading);
        this.searchResults$ = this.store$.select(getSearchResult);
    }
    ngOnDestroy(): void {
        if (this.sub) {
            this.sub.unsubscribe();
        }
    }

    debounceInput(search$: Observable<string>) {
        return search$.pipe(
            filter((str: string) => (str.trim()).length > 1),
            debounceTime(500),
            distinctUntilChanged(),
        );
    }

    cancelSearch() {
        this.store$.dispatch(new HideContactSearch());
    }

    addContact(contact: ContactSearchResult) {
        if (contact) {
            this.store$.dispatch(new AddToContactBegin({ contact }));
        }
    }
}
