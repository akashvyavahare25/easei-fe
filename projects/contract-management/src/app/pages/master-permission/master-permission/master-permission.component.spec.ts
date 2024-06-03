import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterPermissionComponent } from './master-permission.component';

describe('MasterPermissionComponent', () => {
  let component: MasterPermissionComponent;
  let fixture: ComponentFixture<MasterPermissionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MasterPermissionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MasterPermissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
