import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterFormRenderComponent } from './master-form-render.component';

describe('MasterFormRenderComponent', () => {
  let component: MasterFormRenderComponent;
  let fixture: ComponentFixture<MasterFormRenderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MasterFormRenderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MasterFormRenderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
