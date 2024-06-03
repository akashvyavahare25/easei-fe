import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportAppScreenComponent } from './report-app-screen.component';

describe('ReportAppScreenComponent', () => {
  let component: ReportAppScreenComponent;
  let fixture: ComponentFixture<ReportAppScreenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportAppScreenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportAppScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
