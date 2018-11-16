import { Component, OnInit } from '@angular/core';
import { AppState } from './store';
import { Store } from '@ngrx/store';
import { selectAppStarted } from './store/app-start.reducer';
import { AppInit } from './store/app-start.actions';
import { SignOutBegin } from './auth-blockstack/auth.actions';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

    constructor(private store$: Store<AppState>) {
    }

    ngOnInit(): void {
        this.store$.select(selectAppStarted);
        this.store$.dispatch(new AppInit());
    }
}
