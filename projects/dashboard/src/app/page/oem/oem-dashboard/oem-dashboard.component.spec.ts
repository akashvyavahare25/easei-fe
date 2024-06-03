import { ComponentFixture, TestBed } from '@angular/core/testing';

import { oemDashboardComponent } from './oem-dashboard.component';

describe('oemDashboardComponent', () => {
  let component: oemDashboardComponent;
  let fixture: ComponentFixture<oemDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ oemDashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(oemDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
