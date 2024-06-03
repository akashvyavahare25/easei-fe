import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScheduleingComponent } from './scheduleing.component';

describe('ScheduleingComponent', () => {
  let component: ScheduleingComponent;
  let fixture: ComponentFixture<ScheduleingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScheduleingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ScheduleingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
