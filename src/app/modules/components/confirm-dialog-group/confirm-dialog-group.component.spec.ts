import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmDialogGroupComponent } from './confirm-dialog-group.component';

describe('ConfirmDialogGroupComponent', () => {
  let component: ConfirmDialogGroupComponent;
  let fixture: ComponentFixture<ConfirmDialogGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfirmDialogGroupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmDialogGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
