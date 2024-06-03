import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { FormBuilder, FormArray, Validators, FormGroup, FormControl } from '@angular/forms'
import { formioOptions } from './../../../constants/formiOptions'
import { NzNotificationService } from 'ng-zorro-antd'
import { MasterService } from '../../../../../src/app/services/master.service'
import { APIService } from '../../../../../src/app/services/api.service'
import { ApprovalService } from '../../../../../src/app/services/approval-service'
import * as _ from 'lodash'
import { AppMasterService } from '../../../../../src/app/services/app-master.service'
import { ScreenService } from '../../../../../src/app/services/screen.service'
import { FormRenderService } from '../../../../../src/app/services/form-render.service'
import { RulesService } from '../../../../../src/app/services/rules.service'
@Component({
  selector: 'app-approval-workflow',
  templateUrl: './approval-workflow.component.html',
  styleUrls: ['./approval-workflow.component.scss']
})
export class ApprovalWorkflowComponent implements OnInit {
  approvalForm: any
  applicationList: any;
  allScreenList: any;
  screenData: any;
  loading: boolean = true;
  triggerList: string[] = ['Add', 'Edit', 'Delete','Schedule'];
  listOfRoles: string[] = ['admin', 'user', 'role-1']
  tirgetTypes: string[] = ['parameter', 'master', 'screen']
  listOfAprrovers: object[] = []
  notificationList: string[] = ['Email', 'On-Screen', 'SMS', 'Whatsapp', 'Telegram']
  isVisible = false
  isRule:boolean=false
  triggerFlag:boolean=true
  workflowId: any
  rulesList:[]
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private masterService: MasterService,
    private notification: NzNotificationService,
    private apiService: APIService,
    private formBuilder: FormBuilder,
    private approvalService: ApprovalService,
    private appMasterService: AppMasterService,
    private screenService: ScreenService,
    private formRenderService: FormRenderService,
    private rulesService:RulesService
  ) {
    this.route.params.subscribe(params => {
      this.workflowId = params['id']
    })
  }

  ngOnInit(): void {
    this.approvalForm = this.formBuilder.group({
      name: ['', Validators.required],
      targetType: ['', Validators.required],
      appName: ['', Validators.nullValidator],
      targetObject: ['', Validators.required],
      triggerOn: [[], Validators.required],
      wfType:['',Validators.required],
      rule: [''],
      steps: this.formBuilder.array([]),
    })
    this.appMasterService.getAllAppMasterData().subscribe(response => {
      this.applicationList = response
      this.screenService.getAllScreenData().subscribe(res => {
        this.loading = false;
        this.allScreenList = res;     
          if (this.workflowId) {
            this.approvalService.getWorkflowById(this.workflowId).subscribe(res => {
              this.rulesService.getRulesByScreenId(res.targetObject).subscribe(resp=>{
                this.rulesList=resp
              _.forEach(res.steps, (step, index) => {
                this.changeRole(step.roles, index)
                this.addNewStep();
              });
              this.approvalForm.patchValue(res)
            })
          })
          } else {
            this.addNewStep();
          }
        });
    });
  }

  addNewStep() {
    const approvalArray = this.approvalForm.get('steps') as FormArray
    const blockFormGroup = new FormGroup({});
    blockFormGroup.addControl('name', new FormControl('', Validators.required));
    blockFormGroup.addControl('roles', new FormControl([], Validators.required));
    blockFormGroup.addControl('approvers', new FormControl([], Validators.required));
    blockFormGroup.addControl('typeOfApprovers', new FormControl('Any', Validators.required));
    blockFormGroup.addControl('notificationType', new FormControl([], Validators.required));
    approvalArray.push(blockFormGroup);
  }

  removeNewStep(index: any) {
    const approvalArray = this.approvalForm.get('steps') as FormArray
    approvalArray.removeAt(index)
  }
  selcetWftype(type){
    if(type==="Rule"){
      this.isRule=true
    }else{
      this.isRule=false
    }
  }
  changeRole(roles, index) {
    this.apiService.getUsersByRole({ "roles": roles }).subscribe(res => {
      this.listOfAprrovers[index] = res
    })
  }

  changeTarget() {
    if (this.approvalForm.get('targetType').value === 'parameter') {
      this.formRenderService.getAllData().subscribe(res => {
        this.screenData = res
      });
    }
    if (this.approvalForm.get('targetType').value === 'master') {
      this.masterService.getAllMasterData().subscribe(res => {
        this.screenData = res
      })
    }

    if (this.approvalForm.get('targetType').value === 'screen') {
      const appName = this.approvalForm.get('appName');
      appName.reset();
      appName.setValidators(Validators.required);
      appName.updateValueAndValidity();
    } else {
      const appName = this.approvalForm.get('appName');
      appName.reset();
      appName.setValidators(Validators.nullValidator);
      appName.updateValueAndValidity();
    }
    const targetObject = this.approvalForm.get('targetObject');
    targetObject.reset();
    targetObject.updateValueAndValidity();

  }

  selectScreens() {
    if (this.approvalForm.get('appName').value && this.approvalForm.get('appName').value !== '') {
      const application = _.find(this.applicationList, (o) => { return o.name === this.approvalForm.get('appName').value; });
      this.screenData = _.filter(this.allScreenList, { 'application_master': application._id });
      const targetObject = this.approvalForm.get('targetObject');
      targetObject.reset();
      targetObject.updateValueAndValidity();
    }

  }
  selectRules(id){
    if(id){
      this.triggerFlag=false
      this.rulesService.getRulesByScreenId(id).subscribe(res=>{
        this.rulesList=res
      })
    }else{
      this.triggerFlag=true
    }
  }
  checkWorkflowDefineOnTrigger(item){
    if(item&&this.approvalForm.value.targetObject){
      _.each(this.approvalForm.value.triggerOn,(element)=>{
      this.approvalService.getWorkflowByCodeandtype(this.approvalForm.value.targetObject,element).subscribe(res=>{
        console.log(res.length,res)
        if(!_.isEmpty(res)){
          this.notification.info('Info',"This Trigger already define")
          this.approvalForm.controls['triggerOn'].reset()
        }
      })
    })
    }
  }
  checkWorkflowDefine(id){
    if(id){
      this.approvalService.getWorkflowByRuleId(id).subscribe(res=>{
        console.log(res.length,res)
        if(!_.isEmpty(res)){
          this.notification.info('Info',"This rule already define")
          this.approvalForm.controls['rule'].reset()
        }
      })
    }
  }
  finish() {
    this.markFormGroupDirty(this.approvalForm)
    if (this.approvalForm.valid) {
      this.isVisible = true
    }
  }

  submitWorkflow() {
    if (this.approvalForm.valid) {
      if (this.workflowId) {
        const data = {
          name: this.approvalForm.value.name,
          steps: this.approvalForm.value.steps,
          _id: this.workflowId,
          rule:this.approvalForm.value.rules
        }
        this.approvalService.updateWorkflow(data).subscribe(res => {
          this.notification.success('Successfully', 'You have successfully update Work flow!')
          this.approvalForm.reset();
          setTimeout(() => { this.router.navigate(['/approval/all']) }, 700)
        })
      } else {
        const data = this.approvalForm.value;
        if (this.approvalForm.value.appName === null || this.approvalForm.value.appName === '') {
          data.appName = this.approvalForm.value.targetObject
        }
        this.approvalService.addWorkflow(data).subscribe(res => {
          if (res.code == '1010') {
            this.notification.warning('Warning', res.message)
          } else {
            this.notification.success('Successfully', 'You have successfully save workflow!')
            this.approvalForm.reset();
            this.listOfAprrovers = [];
            this.triggerFlag=true
            const approvalArray = this.approvalForm.get('steps') as FormArray
            while (approvalArray.length !== 1) {
              approvalArray.removeAt(0)
            }
          }

        },
          (error) => {
            if (error.error) {
              this.notification.error('Add User', error.error.message)
            }
          })
      }
    }
  }

  handleOk() {
    this.isVisible = false
    this.submitWorkflow();

  }

  handleCancel() {
    this.isVisible = false
  }

  markFormGroupDirty(form) {
    (<any>Object).values(form.controls).forEach(control => {
      control.markAsDirty()
      control.updateValueAndValidity()
      if (control.controls) {
        this.markFormGroupDirty(control)
      }
    })
  }
}
