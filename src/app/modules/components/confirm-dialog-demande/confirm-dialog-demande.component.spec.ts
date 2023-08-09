import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmDialogDemandeComponent } from './confirm-dialog-demande.component';

describe('ConfirmDialogDemandeComponent', () => {
  let component: ConfirmDialogDemandeComponent;
  let fixture: ComponentFixture<ConfirmDialogDemandeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfirmDialogDemandeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmDialogDemandeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
