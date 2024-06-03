import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HelpPersonListComponent } from './help-person-list.component';

describe('HelpPersonListComponent', () => {
  let component: HelpPersonListComponent;
  let fixture: ComponentFixture<HelpPersonListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HelpPersonListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HelpPersonListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
