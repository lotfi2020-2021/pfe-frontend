import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificationBellInfoComponent } from './notification-bell-info.component';

describe('NotificationBellInfoComponent', () => {
  let component: NotificationBellInfoComponent;
  let fixture: ComponentFixture<NotificationBellInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NotificationBellInfoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NotificationBellInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
