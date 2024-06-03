import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScreenNotificationComponent } from './screen-notification.component';

describe('ScreenNotificationComponent', () => {
  let component: ScreenNotificationComponent;
  let fixture: ComponentFixture<ScreenNotificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScreenNotificationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ScreenNotificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
