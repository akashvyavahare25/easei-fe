import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConstantheatmapComponent } from './constantheatmap.component';

describe('Heatmap1Component', () => {
  let component: ConstantheatmapComponent;
  let fixture: ComponentFixture<ConstantheatmapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConstantheatmapComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConstantheatmapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
