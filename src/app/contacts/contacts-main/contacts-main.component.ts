import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store';
import { getDisplaySearch } from '../store';

@Component({
    selector: 'app-contacts-main',
    templateUrl: './contacts-main.component.html',
    styleUrls: ['./contacts-main.component.css']
})
export class ContactsMainComponent implements OnInit {

    displaySearch$: Observable<boolean>;

    constructor(private store$: Store<AppState>) { }

    ngOnInit() {
        this.displaySearch$ = this.store$.select(getDisplaySearch);
    }

}
