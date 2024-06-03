import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllApprovalWorkflowComponent } from './all-approval-workflow.component';

describe('ApprovalWorkflowComponent', () => {
  let component: AllApprovalWorkflowComponent;
  let fixture: ComponentFixture<AllApprovalWorkflowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AllApprovalWorkflowComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllApprovalWorkflowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
