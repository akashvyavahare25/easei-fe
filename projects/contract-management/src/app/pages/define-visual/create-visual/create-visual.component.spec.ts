import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateVisualComponent } from './create-visual.component';

describe('CreateVisualComponent', () => {
  let component: CreateVisualComponent;
  let fixture: ComponentFixture<CreateVisualComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateVisualComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateVisualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
