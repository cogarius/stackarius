import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmPostDeleteComponent } from './confirm-post-delete.component';

describe('ConfirmDeleteComponent', () => {
  let component: ConfirmPostDeleteComponent;
  let fixture: ComponentFixture<ConfirmPostDeleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfirmPostDeleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmPostDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
