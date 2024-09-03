import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StartGameModalComponent } from './start-game-modal.component';

describe('StartGameModalComponent', () => {
  let component: StartGameModalComponent;
  let fixture: ComponentFixture<StartGameModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StartGameModalComponent]
    });
    fixture = TestBed.createComponent(StartGameModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
