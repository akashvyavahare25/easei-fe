import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllVisualComponent } from './all-visual.component';

describe('AllVisualComponent', () => {
  let component: AllVisualComponent;
  let fixture: ComponentFixture<AllVisualComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllVisualComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllVisualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
