import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddHelpPersonComponent } from './add-help-person.component';

describe('AddHelpPersonComponent', () => {
  let component: AddHelpPersonComponent;
  let fixture: ComponentFixture<AddHelpPersonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddHelpPersonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddHelpPersonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
