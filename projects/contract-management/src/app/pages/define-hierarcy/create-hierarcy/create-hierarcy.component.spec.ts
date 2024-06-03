import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateHierarcyComponent } from './create-hierarcy.component';

describe('CreateHierarcyComponent', () => {
  let component: CreateHierarcyComponent;
  let fixture: ComponentFixture<CreateHierarcyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateHierarcyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateHierarcyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
