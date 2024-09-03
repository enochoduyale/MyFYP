import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PascalCoefficientsComponent } from './pascal-coefficients.component';

describe('PascalCoefficientsComponent', () => {
  let component: PascalCoefficientsComponent;
  let fixture: ComponentFixture<PascalCoefficientsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PascalCoefficientsComponent]
    });
    fixture = TestBed.createComponent(PascalCoefficientsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
