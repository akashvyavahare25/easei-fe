import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OemAlarmComponent } from './oem-alarm.component';

describe('OemAlarmComponent', () => {
  let component: OemAlarmComponent;
  let fixture: ComponentFixture<OemAlarmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OemAlarmComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OemAlarmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
