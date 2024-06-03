import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AbortDialogComponent } from './abort-dialog.component';

describe('AbortDialogComponent', () => {
  let component: AbortDialogComponent;
  let fixture: ComponentFixture<AbortDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AbortDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AbortDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
