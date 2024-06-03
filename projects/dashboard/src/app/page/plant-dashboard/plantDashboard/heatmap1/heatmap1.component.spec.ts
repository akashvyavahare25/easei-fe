import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Heatmap1Component } from './heatmap1.component';

describe('Heatmap1Component', () => {
  let component: Heatmap1Component;
  let fixture: ComponentFixture<Heatmap1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Heatmap1Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Heatmap1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
