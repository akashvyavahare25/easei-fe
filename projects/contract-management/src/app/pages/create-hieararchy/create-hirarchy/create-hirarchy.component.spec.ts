import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateHirarchyComponent } from './create-hirarchy.component';

describe('CreateHirarchyComponent', () => {
  let component: CreateHirarchyComponent;
  let fixture: ComponentFixture<CreateHirarchyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateHirarchyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateHirarchyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
