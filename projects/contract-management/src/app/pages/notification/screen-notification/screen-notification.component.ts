import { Component, ElementRef, OnInit } from '@angular/core'
import { Location, DatePipe } from '@angular/common';
import { FormBuilder } from '@angular/forms'
import { NzNotificationService } from 'ng-zorro-antd'
import * as _ from 'lodash';
import * as moment from 'moment';
import { AppScreenService } from '../../../../../src/app/services/app-screen.service'
import FileSaver from 'file-saver';
import { ViewChild } from '@angular/core';
import { select, Store } from '@ngrx/store'
import { ActivatedRoute, Router } from '@angular/router'
import { ScreenService } from '../../../../../src/app/services/screen.service';
import { APIService } from '../../../../../src/app/services/api.service';
import { ColDef, GridOptions } from 'ag-grid-community';
import * as Reducers from '../../../../../src/app/store/reducers'
import { NotificationService } from '../../../../../src/app/services/notification.service';
import { Validators } from '@angular/forms';
import { NzUploadFile } from 'ng-zorro-antd/upload';
import { DomSanitizer } from '@angular/platform-browser';
@Component({
  selector: 'app-screen-notification',
  templateUrl: './screen-notification.component.html',
  styleUrls: ['./screen-notification.component.scss']
})
export class ScreenNotificationComponent implements OnInit {
  appScreenForm: any
  appScreenId: any = null
  appScreenCode: any = null
  appEditId: any = null
  appScreenName: string
  loading: boolean = true
  screenForm: any;
  public form: any = { components: [] }
  userList: any;
  wfInstanceId: any;
  wfHistory: any;
  wfRunObject: any;
  isReviewAndApproved: boolean = false;
  isAskQuestion: boolean = false;
  isPayment: boolean = false;
  notificationId: any;
  isReject: boolean = false;
  isCompleted: boolean = false;
  userNameId: any;
  updateScreenData:any
  fileList: NzUploadFile[] = [];
  fileUrl:any;
   constructor(
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private appScreenService: AppScreenService,
    private notification: NzNotificationService,
    private screenService: ScreenService,
    private notificationService: NotificationService,
    private apiService: APIService,
    private store: Store<any>,
    private sanitizer: DomSanitizer
  ) {
    this.route.params.subscribe(params => {
      this.appScreenCode = params['code']
      this.appEditId = params['editId'],
        this.wfInstanceId = params['wfInstanceId'],
        this.notificationId = params['notificationId']
    })
    this.store.pipe(select(Reducers.getUser)).subscribe(state => {
      this.userNameId = state.id
    })
  }

  ngOnInit(): void {
    this.screenForm = this.formBuilder.group({
      action: [null, Validators.required],
      remark: [null, Validators.nullValidator],
      delegateUserId: [null, Validators.nullValidator],
      delegateType: [null, Validators.nullValidator]
    })
    this.getDataById();
  }

  getDataById() {
    if (this.appScreenCode) {
      this.screenService.getDataByCode(this.appScreenCode).subscribe(res => {
        this.appScreenName = res.name
        if (res && this.appEditId) {
          this.appScreenService.getDataById(res.code, this.appEditId).subscribe(resp => {
            this.updateScreenData=resp
            this.form.components.push(res.configuration[0])
            
            this.notificationService.getHistoryByIdWithNotificionID(this.wfInstanceId, this.notificationId).subscribe(res => {

              if (res.code === 403) {
                this.notification.error('Warning', res.message)
              } else {
                this.wfHistory = res
                this.wfRunObject = _.find(res, (o) => { return o.wfRunObject === this.appEditId && o.targetObject === this.appScreenCode && o._id === this.notificationId });
                _.each(this.form.components[0].columns, (component) => {
                  if (component.components && component.components.length > 0 && component.components[0].key) {             
                      component.components[0].disabled = true
                      component.components[0].defaultValue = resp[component.components[0].key]                   
                  }
                })
                if (this.wfRunObject.lastActionStatus === 'Rejected') {
                  this.isReject = true;
                  this.notificationService.finishNotification(this.notificationId).subscribe(res => { });
                }
                const splitObject = _.split(this.wfRunObject.progress, '/')
                if (splitObject[0] == splitObject[1]) {
                  this.isCompleted = true;
                  this.notificationService.finishNotification(this.notificationId).subscribe(res => { });
                }

                if (this.wfRunObject && this.wfRunObject.lastDelegateType === 'Review and Approved') {
                  this.isReviewAndApproved = true;
                }
                if (this.wfRunObject && this.wfRunObject.lastDelegateType === 'Only Review/Ask a question?') {
                  this.isAskQuestion = true;
                  this.screenForm.controls['action'].setValue('approve');
                }

                setTimeout(() => {
                  this.loading = false
                  setTimeout(() => {
                    const firstCard = document.getElementById('firstCard').offsetHeight;
                    document.getElementById('secondCard').style.height = firstCard + 'px';
                  }, 30)

                }, 700);
              }
            });
          })
        }
      })


    }
  }
  beforeUpload = (file: NzUploadFile): boolean => {
        this.fileList = this.fileList.concat(file);
    
    return false;
  };
  download(item){
    this.notificationService.download(item).subscribe((resp:any) => {
    const blob = new Blob([resp], { type: 'application/octet-stream' });
    this.fileUrl = this.sanitizer.bypassSecurityTrustResourceUrl(window.URL.createObjectURL(blob));
    FileSaver.saveAs(blob, item.originalname);
    },
        (error: any) => console.log(error),
        () => console.log('Complete')    
    
    );
  } 
  onChangeFOrm(e){ 
    if (e && e.changed && e.changed.value) {   
      this.updateScreenData=e.data
    }
  }
  submit() {
    this.markFormGroupDirty(this.screenForm)
    if (this.screenForm.valid) {
      const data = _.cloneDeep(this.wfRunObject)
      const formData = new FormData();
      if (this.screenForm.value.action === 'approve') {
        if (this.isAskQuestion) {
          data.actionStatus = 'Reviewed';
        } else {
          data.actionStatus = 'Approved';
        }
        data.remark = this.screenForm.value.remark;
        data.delegateType = null;
        Object.keys(data).forEach(fieldName => {
          if(fieldName==='ownerUser'||fieldName==='receiverUser'||fieldName==="lastActionUser" || !data[fieldName]){
          }else{
          formData.append(fieldName, data[fieldName]);
          }
        })
        if(this.fileList){
          _.each(this.fileList,(file)=>{    
            formData.append(
              'files',
              file,
              file.name
            )
          })
        } 
       
          
          this.notificationService.updateNotification('Approved',formData).subscribe(res => {
            if(this.appScreenCode==='S_VENDOR CONTRACT_K6egLo'){
              this.notificationService.getWfinstaceById(data.wfInstanceId).subscribe(statusres=>{                    
              if(statusres.workflowStatus==='Finished'&&statusres.wfType==='Schedule'){
                this.apiService.getSchemaByCode('S_CONTRACT APPROVE STATUS_DYcdxI').subscribe(res=>{
                  let configData:any={}
                  let data2=Object.keys(res.schema_config)
                  let data1=Object.keys(this.updateScreenData)
                  let d = new Date();
                  let n = d.getTime().toString();
                  let uniqueId=n.substring(4)
                  _.each(data2,(element)=>{
                    if(_.includes(data1,element)){
                      configData[element]=this.updateScreenData[element]
                    }
                  })
                  configData['contractAmount']=this.updateScreenData["actualAmount"]
                  configData["amountBalance"]=this.updateScreenData["actualAmount"]-this.updateScreenData.items[0].amount
                  configData["amount"]=this.updateScreenData.items[0].amount
                  configData["shortDescription"]=this.updateScreenData.items[0].shortDescription
                  configData['approvalDate']=new Date()
                  configData['approveBy']=data.receiverUser[0].firstName +' ' + data.receiverUser[0].lastName
                  configData['approvalCode']=uniqueId
                  configData['approvalStatus']='Approve'
                  const contarctData = {
                    name: 'S_CONTRACT APPROVE STATUS_DYcdxI',
                    configuration:configData
                  }
                  this.apiService.addMasterDetails(contarctData).subscribe(response=>{                   
                      this.notification.success('sucessfull', 'Notification Sucessfully Approved');
                      this.router.navigate(['/notification/all']);
                    })                 
                })
              }else{
                this.notification.success('sucessfull', 'Notification Sucessfully Approved');
                this.router.navigate(['/notification/all']);
              } 
           })         
          }
          else{
            this.notification.success('sucessfull', 'Notification Sucessfully Approved');
            this.router.navigate(['/notification/all']);
          }
         })
      }
      if (this.screenForm.value.action === 'reject') {
        data.actionStatus = 'Rejected'
        data.remark = this.screenForm.value.remark;
        data.delegateType = null;
        Object.keys(data).forEach(fieldName => {
          if(fieldName==='ownerUser'||fieldName==='receiverUser'||fieldName==="lastActionUser" || !data[fieldName]){
          }else{
          formData.append(fieldName, data[fieldName]);
          }
        })
        if(this.fileList){
        _.each(this.fileList,(file)=>{    
          formData.append(
            'files',
            file,
            file.name
          )
        })
      }
      if(this.appScreenCode==='S_VENDOR CONTRACT_K6egLo'){ 
        this.notificationService.getWfinstaceById(data.wfInstanceId).subscribe(statusres=>{                    
          if(statusres.wfType==='Schedule'){        
            this.apiService.getSchemaByCode('S_CONTRACT APPROVE STATUS_DYcdxI').subscribe(res=>{
              let configData:any={}
              let data2=Object.keys(res.schema_config)
              let data1=Object.keys(this.updateScreenData)
              let d = new Date();
              let n = d.getTime().toString();
              let uniqueId=n.substring(4)
              _.each(data2,(element)=>{
                if(_.includes(data1,element)){
                  configData[element]=this.updateScreenData[element]
                }
              })
              configData['contractAmount']=this.updateScreenData["actualAmount"]
              configData["amountBalance"]=this.updateScreenData["actualAmount"]-this.updateScreenData.items[0].amount
              configData["amount"]=this.updateScreenData.items[0].amount
              configData["shortDescription"]=this.updateScreenData.items[0].shortDescription
              configData['approvalDate']=new Date()
              configData['approveBy']=data.receiverUser[0].firstName +' ' + data.receiverUser[0].lastName
              configData['approvalCode']=uniqueId
              configData['approvalStatus']='Reject'
              const contarctData = {
                name: 'S_CONTRACT APPROVE STATUS_DYcdxI',
                configuration:configData
              }
              this.apiService.addMasterDetails(contarctData).subscribe(response=>{
                this.notificationService.updateNotification('Approved',formData).subscribe(res => {
                  this.notification.success('sucessfull', 'Notification Sucessfully Approved');
                  this.router.navigate(['/notification/all']);
                })
              })
            })
          }
        })        
    }
     else{
        this.notificationService.updateNotification('Rejected', formData).subscribe(res => {
          this.notification.success('sucessfull', 'Notification Sucessfully rejected');
          this.router.navigate(['/notification/all']);
        })
      }
      }
      if (this.screenForm.value.action === 'delegate') {
        data.actionStatus = 'Delegated'
        data.remark = this.screenForm.value.remark
        data.delegateUserId = this.screenForm.value.delegateUserId
        data.delegateType = this.screenForm.value.delegateType
        Object.keys(data).forEach(fieldName => {
          if(fieldName==='ownerUser'||fieldName==='receiverUser'||fieldName==="lastActionUser" || !data[fieldName]){
          }else{
          formData.append(fieldName, data[fieldName]);
          }
        })
        if(this.fileList){
          _.each(this.fileList,(file)=>{    
            formData.append(
              'files',
              file,
              file.name
            )
          })
      }
        this.notificationService.updateNotification('Delegated', formData).subscribe(res => {
          this.notification.success('sucessfull', 'Notification Sucessfully delegate to user');
          this.router.navigate(['/notification/all']);
        })
      }
    } else {
      setTimeout(() => {
        const firstCard = document.getElementById('firstCard').offsetHeight;
        document.getElementById('secondCard').style.height = firstCard + 'px';
      }, 30)
    }
  }
  /* 
    rejectWorkflow() {
      this.notificationService.getNoActionNotification().subscribe(res => {
        const data = _.find(res, (o) => { return o.wfRunObject === this.appEditId && o.screenName === this.appScreenCode; });
        data.actionStatus = 'Rejected'
        this.notificationService.updateNotification(0, data).subscribe(res => {
          this.notification.success('sucessfull', 'Notification Sucessfully Rejceted');
          this.router.navigate(['/notification/all']);
        })
      })
    }
  
    delegateWorkflow() {
  
    } */

  changeAction() {
    if (this.screenForm.value.action === 'delegate') {
      const delegateUserId = this.screenForm.get('delegateUserId');
      delegateUserId.setValidators(Validators.required);
      delegateUserId.updateValueAndValidity();
      const delegateType = this.screenForm.get('delegateType');
      delegateType.setValidators(Validators.required);
      delegateType.updateValueAndValidity();
      this.apiService.getAllUsers().subscribe(res => {
        this.userList = _.remove(res, (n) => {
          return n._id !== this.userNameId;
        });
      })
    } else {
      const delegateUserId = this.screenForm.get('delegateUserId');
      delegateUserId.setValidators(Validators.nullValidator);
      delegateUserId.updateValueAndValidity();
      const delegateType = this.screenForm.get('delegateType');
      delegateType.setValidators(Validators.nullValidator);
      delegateType.updateValueAndValidity();
    }
    setTimeout(() => {
      const firstCard = document.getElementById('firstCard').offsetHeight;
      document.getElementById('secondCard').style.height = firstCard + 'px';
    }, 10)
  }

  getTime(date) {
    return moment(date).format('YYYY-MM-DD, hh:mm A')
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
