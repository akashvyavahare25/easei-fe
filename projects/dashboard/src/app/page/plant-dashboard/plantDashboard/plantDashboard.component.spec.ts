import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { PlantDashboardComponent } from './plantDashboard.component';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('PlantDashboardComponent', () => {
  let component: PlantDashboardComponent;
  let fixture: ComponentFixture<PlantDashboardComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PlantDashboardComponent ],
      imports: [
        MatButtonModule,
        MatInputModule,
        NoopAnimationsModule
     ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlantDashboardComponent);
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
