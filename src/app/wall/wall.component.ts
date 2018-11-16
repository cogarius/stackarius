import { Component, OnInit } from '@angular/core';
import { AppState } from '../store';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { getUserId, getUserName } from '../auth-blockstack/auth.selectors';

@Component({
    selector: 'app-wall',
    templateUrl: './wall.component.html',
    styleUrls: ['./wall.component.css']
})
export class WallComponent implements OnInit {
    userId$: Observable<string>;
    username$: Observable<string>;

    constructor(private store$: Store<AppState>) { }

    ngOnInit() {
        this.userId$ = this.store$.select(getUserId);
        this.username$ = this.store$.select(getUserName);
    }

}
