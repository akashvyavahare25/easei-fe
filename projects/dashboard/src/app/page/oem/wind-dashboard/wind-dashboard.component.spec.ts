import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WindDashboardComponent } from './wind-dashboard.component';

describe('WindDashboardComponent', () => {
  let component: WindDashboardComponent;
  let fixture: ComponentFixture<WindDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WindDashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WindDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
