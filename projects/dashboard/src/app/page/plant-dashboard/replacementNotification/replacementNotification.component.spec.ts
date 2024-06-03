import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ReplacementNotificationComponent } from './replacementNotification.component';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('ReplacementNotificationComponent', () => {
  let component: ReplacementNotificationComponent;
  let fixture: ComponentFixture<ReplacementNotificationComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ReplacementNotificationComponent ],
      imports: [
        MatButtonModule,
        MatInputModule,
        NoopAnimationsModule
     ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReplacementNotificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('We should have 18 Inputs', () => {
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelectorAll('input').length).toBe(18);
  });
});
