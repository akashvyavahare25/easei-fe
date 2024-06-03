import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignLogoComponent } from './assign-logo.component';

describe('AssignLogoComponent', () => {
  let component: AssignLogoComponent;
  let fixture: ComponentFixture<AssignLogoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssignLogoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignLogoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
