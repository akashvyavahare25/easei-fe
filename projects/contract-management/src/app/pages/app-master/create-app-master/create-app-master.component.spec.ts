import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateAppMasterComponent } from './create-app-master.component';

describe('CreateScreenComponent', () => {
  let component: CreateAppMasterComponent;
  let fixture: ComponentFixture<CreateAppMasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateAppMasterComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateAppMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
