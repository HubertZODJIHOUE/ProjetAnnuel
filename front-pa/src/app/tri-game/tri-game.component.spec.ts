import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TriGameComponent } from './tri-game.component';

describe('TriGameComponent', () => {
  let component: TriGameComponent;
  let fixture: ComponentFixture<TriGameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TriGameComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TriGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
