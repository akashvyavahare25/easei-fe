import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllAppMasterComponent } from './all-app-master.component';

describe('AllMastersComponent', () => {
  let component: AllAppMasterComponent;
  let fixture: ComponentFixture<AllAppMasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AllAppMasterComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllAppMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
