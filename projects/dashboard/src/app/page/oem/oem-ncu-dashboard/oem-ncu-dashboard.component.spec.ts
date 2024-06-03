import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OemBcuDashboardComponent } from './oem-ncu-dashboard.component';

describe('OemBcuDashboardComponent', () => {
  let component: OemBcuDashboardComponent;
  let fixture: ComponentFixture<OemBcuDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OemBcuDashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OemBcuDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
