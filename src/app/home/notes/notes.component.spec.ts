import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotesComponent } from './notes.component';
import { Store, StoreModule } from '@ngrx/store';

describe('NotesComponent', () => {
    let component: NotesComponent;
    let fixture: ComponentFixture<NotesComponent>;
    let store: Store<any>;

    beforeEach(async () => {
        TestBed.configureTestingModule({
            imports: [StoreModule.forRoot({})],
            declarations: [NotesComponent]
        });

        await TestBed.compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(NotesComponent);
        component = fixture.componentInstance;
        store = TestBed.get(Store);

        spyOn(store, 'dispatch').and.callThrough();
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
