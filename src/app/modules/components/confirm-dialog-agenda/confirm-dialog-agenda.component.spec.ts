import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComfirmDialogAgendaComponent } from './confirm-dialog-agenda.component';

describe('ComfirmDialogAgendaComponent', () => {
  let component: ComfirmDialogAgendaComponent;
  let fixture: ComponentFixture<ComfirmDialogAgendaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComfirmDialogAgendaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ComfirmDialogAgendaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
