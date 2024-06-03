import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmAbortComponent } from './confirm-abort.component';

describe('ConfirmAbortComponent', () => {
  let component: ConfirmAbortComponent;
  let fixture: ComponentFixture<ConfirmAbortComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfirmAbortComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmAbortComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
