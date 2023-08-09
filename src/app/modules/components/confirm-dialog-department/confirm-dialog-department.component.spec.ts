import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmDialogDepartmentComponent } from './confirm-dialog-department.component';

describe('ConfirmDialogDepartmentComponent', () => {
  let component: ConfirmDialogDepartmentComponent;
  let fixture: ComponentFixture<ConfirmDialogDepartmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfirmDialogDepartmentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmDialogDepartmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
