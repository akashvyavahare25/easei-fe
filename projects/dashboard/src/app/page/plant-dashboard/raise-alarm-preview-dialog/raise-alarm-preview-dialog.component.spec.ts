import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RaiseAlarmPreviewDialogComponent } from './raise-alarm-preview-dialog.component';

describe('RaiseAlarmPreviewDialogComponent', () => {
  let component: RaiseAlarmPreviewDialogComponent;
  let fixture: ComponentFixture<RaiseAlarmPreviewDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RaiseAlarmPreviewDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RaiseAlarmPreviewDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
