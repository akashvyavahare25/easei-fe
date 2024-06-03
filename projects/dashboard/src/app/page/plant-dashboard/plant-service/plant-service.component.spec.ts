import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlantServiceComponent } from './plant-service.component';

describe('PlantServiceComponent', () => {
  let component: PlantServiceComponent;
  let fixture: ComponentFixture<PlantServiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlantServiceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlantServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
