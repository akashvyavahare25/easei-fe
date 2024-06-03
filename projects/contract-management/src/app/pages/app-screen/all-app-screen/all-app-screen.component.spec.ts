import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllAppScreenComponent } from './all-app-screen.component';

describe('AllScreensComponent', () => {
  let component: AllAppScreenComponent;
  let fixture: ComponentFixture<AllAppScreenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AllAppScreenComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllAppScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
