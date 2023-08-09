import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmDialogUserComponent } from './confirm-dialog-user.component';

describe('ConfirmDialogUserComponent', () => {
  let component: ConfirmDialogUserComponent;
  let fixture: ComponentFixture<ConfirmDialogUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfirmDialogUserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmDialogUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
