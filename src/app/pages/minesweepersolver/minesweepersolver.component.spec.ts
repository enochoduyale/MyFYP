import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MinesweepersolverComponent } from './minesweepersolver.component';

describe('MinesweepersolverComponent', () => {
  let component: MinesweepersolverComponent;
  let fixture: ComponentFixture<MinesweepersolverComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MinesweepersolverComponent]
    });
    fixture = TestBed.createComponent(MinesweepersolverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
