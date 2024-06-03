import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HelppopupComponent } from './helppopup.component';

describe('HelppopupComponent', () => {
  let component: HelppopupComponent;
  let fixture: ComponentFixture<HelppopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HelppopupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HelppopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
