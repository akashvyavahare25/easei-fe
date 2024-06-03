import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllScreenComponent } from './all-screen.component';

describe('AllMastersComponent', () => {
  let component: AllScreenComponent;
  let fixture: ComponentFixture<AllScreenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AllScreenComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
