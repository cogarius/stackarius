import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store';
import { SignOutBegin } from 'src/app/auth-blockstack/auth.actions';
import { Observable } from 'rxjs';
import { isAuthenticated, getUserId } from 'src/app/auth-blockstack/auth.selectors';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

    authenticated$: Observable<boolean>;
    userId$: Observable<string>;

    constructor(private store$: Store<AppState>) {
    }

    ngOnInit() {
        this.authenticated$ = this.store$.select(isAuthenticated);
        this.userId$ = this.store$.select(getUserId);
    }

    signOut() {
        this.store$.dispatch(new SignOutBegin());
    }
}

