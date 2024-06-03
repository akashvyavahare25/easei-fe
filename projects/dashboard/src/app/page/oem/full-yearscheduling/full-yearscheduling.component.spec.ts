import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FullYearschedulingComponent } from './full-yearscheduling.component';

describe('FullYearschedulingComponent', () => {
  let component: FullYearschedulingComponent;
  let fixture: ComponentFixture<FullYearschedulingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FullYearschedulingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FullYearschedulingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
