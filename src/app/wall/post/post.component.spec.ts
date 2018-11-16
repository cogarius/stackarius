import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostComponent } from './post.component';
import { Store, StoreModule } from '@ngrx/store';

describe('PostComponent', () => {
    let component: PostComponent;
    let fixture: ComponentFixture<PostComponent>;
    let store: Store<any>;

    beforeEach(async () => {
        TestBed.configureTestingModule({
            imports: [StoreModule.forRoot({})],
            declarations: [PostComponent]
        });

        await TestBed.compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(PostComponent);
        component = fixture.componentInstance;
        store = TestBed.get(Store);

        spyOn(store, 'dispatch').and.callThrough();
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
