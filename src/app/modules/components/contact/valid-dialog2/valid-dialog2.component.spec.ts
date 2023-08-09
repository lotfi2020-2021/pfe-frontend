import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidDialog2Component } from './valid-dialog2.component';

describe('ValidDialog2Component', () => {
  let component: ValidDialog2Component;
  let fixture: ComponentFixture<ValidDialog2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ValidDialog2Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ValidDialog2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
