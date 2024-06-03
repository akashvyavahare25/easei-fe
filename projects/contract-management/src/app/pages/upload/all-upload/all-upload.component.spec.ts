import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllUploadComponent } from './all-upload.component';

describe('AllUploadComponent', () => {
  let component: AllUploadComponent;
  let fixture: ComponentFixture<AllUploadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllUploadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
