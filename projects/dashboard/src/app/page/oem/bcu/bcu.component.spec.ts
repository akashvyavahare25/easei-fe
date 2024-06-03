import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BcuComponent } from './bcu.component';

describe('BcuComponent', () => {
  let component: BcuComponent;
  let fixture: ComponentFixture<BcuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BcuComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BcuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
