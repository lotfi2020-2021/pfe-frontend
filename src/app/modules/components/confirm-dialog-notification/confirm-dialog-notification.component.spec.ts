import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmDialogNotificationComponent } from './confirm-dialog-notification.component';

describe('ConfirmDialogNotificationComponent', () => {
  let component: ConfirmDialogNotificationComponent;
  let fixture: ComponentFixture<ConfirmDialogNotificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfirmDialogNotificationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfirmDialogNotificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
