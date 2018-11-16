import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../store';
import { Observable } from 'rxjs';
import { isPending } from '../auth-blockstack/auth.selectors';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    pending$: Observable<boolean>;

    constructor(private store$: Store<AppState>) { }

    ngOnInit() {
        this.pending$ = this.store$.select(isPending);
    }

}
