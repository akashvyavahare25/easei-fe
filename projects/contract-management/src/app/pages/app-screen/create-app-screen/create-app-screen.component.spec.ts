import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateAppScreenComponent } from './create-app-screen.component';

describe('CreateScreenComponent', () => {
  let component: CreateAppScreenComponent;
  let fixture: ComponentFixture<CreateAppScreenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateAppScreenComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateAppScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
