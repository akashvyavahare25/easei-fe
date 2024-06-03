import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllHierarcyComponent } from './all-hierarcy.component';

describe('AllHierarcyComponent', () => {
  let component: AllHierarcyComponent;
  let fixture: ComponentFixture<AllHierarcyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllHierarcyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllHierarcyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
