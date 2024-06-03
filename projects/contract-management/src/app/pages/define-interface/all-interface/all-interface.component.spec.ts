import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllInterfaceComponent } from './all-interface.component';

describe('AllMastersComponent', () => {
  let component: AllInterfaceComponent;
  let fixture: ComponentFixture<AllInterfaceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AllInterfaceComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllInterfaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
