import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { RenewSolarFormComponent } from './renewSolarForm.component';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('RenewSolarFormComponent', () => {
  let component: RenewSolarFormComponent;
  let fixture: ComponentFixture<RenewSolarFormComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ RenewSolarFormComponent ],
      imports: [
        MatButtonModule,
        MatInputModule,
        NoopAnimationsModule
     ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RenewSolarFormComponent);
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
