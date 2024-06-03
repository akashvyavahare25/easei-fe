import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NcuLayoutComponent } from './ncu-layout.component';

describe('NcuLayoutComponent', () => {
  let component: NcuLayoutComponent;
  let fixture: ComponentFixture<NcuLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NcuLayoutComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NcuLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
