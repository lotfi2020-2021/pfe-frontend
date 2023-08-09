import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DemandeEntrepriseComponent } from './demande-entreprise.component';

describe('DemandeEntrepriseComponent', () => {
  let component: DemandeEntrepriseComponent;
  let fixture: ComponentFixture<DemandeEntrepriseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DemandeEntrepriseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DemandeEntrepriseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
