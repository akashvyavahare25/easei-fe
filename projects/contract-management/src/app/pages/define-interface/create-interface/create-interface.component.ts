import { Component, OnInit } from '@angular/core'
import { FormBuilder, Validators, FormArray, FormGroup, FormControl } from '@angular/forms'
import { NzNotificationService } from 'ng-zorro-antd'
import { formioOptions } from '../../../constants/formiOptions'
import { InterfaceService } from '../../../../../src/app/services/interface.service'
import { APIService } from '../../../../../src/app/services/api.service'
import { ActivatedRoute, Router } from '@angular/router'
import { select, Store } from '@ngrx/store'
import * as _ from 'lodash'
import * as Reducers from '../../../../../src/app/store/reducers'
import { environment } from '../../../../../src/environments/environment'

@Component({
  selector: 'app-create-interface',
  templateUrl: './create-interface.component.html',
  styleUrls: ['./create-interface.component.scss'],
})
export class CreateInterfaceComponent implements OnInit {
  fetchRes: any
  interfaceId: any = null
  generateUrl: any  //http://139.162.5.110:3001 //http://localhost:3001
  dataobjSend: {}
  approvalArray: any
  tabs: any = ['Headers', 'Body']
  dataObj: {}
  iForm: any
  value: any
  value1: any
  strgType: any
  resId: any = null
  options: any
  gridApi: any
  item: any
  endpoint: string;
  selectedRequestMethod: string;
  readonly requestMethods: Array<string> = [
    'GET',
    'POST'
  ];
  storageResData: any = [];
  responseData: any;
  responseError: any;
  requestBody: any;
  requestBodyDataTypes: any = [''];
  requestHeaders: any = [{ key: 'Content-Type', value: 'application/json' }];
  endpointError: string;
  loadingState: boolean;
  approvalForm: any
  isVisible = false
 
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private store: Store<any>,
    private interfaceService: InterfaceService,
    private apiService: APIService,
    private notification: NzNotificationService,
  ) {
    this.route.params.subscribe(params => {
      this.interfaceId = params['id']
    })
    // this.store.pipe(select(Reducers.getSettings)).subscribe(state => {
    //   this.onFirstDataRendered(this.gridApi);
    // })
  }


  //Expose  iname, itype, itypeStorage,iStorage, iurl
  //Consume iname, itype, ireq, iurl

  ngOnInit(): void {
    this.options = formioOptions
    this.iForm = this.formBuilder.group({
      iname: ['', Validators.required],
      itype: ['', Validators.required],
      ireq: [''],
      iurl: ['', Validators.required],
      itypeStorage: [''],
      iStorage: [''],
      bodytxt: [''],
      steps: this.formBuilder.array([]),
    })
   
  }

  addTypeInEditor(type) {
    if (type === "Expose") {
      this.value = 'Expose'
    }
    if (type === "Consume") {
      this.value = 'Consume'
    }

    if (this.iForm.value.itype === 'Consume') {
      const iname = this.iForm.get('iname');
      iname.setValidators(Validators.required);
      iname.updateValueAndValidity();
      const ireq = this.iForm.get('ireq');
      ireq.setValidators(Validators.required);
      ireq.updateValueAndValidity();
      const iurl = this.iForm.get('iurl');
      iurl.setValidators(Validators.required);
      iurl.updateValueAndValidity();
      const itypeStorage = this.iForm.get('itypeStorage');
      itypeStorage.setValidators(Validators.nullValidator);
      itypeStorage.updateValueAndValidity();
      const iStorage = this.iForm.get('iStorage');
      iStorage.setValidators(Validators.nullValidator);
      iStorage.updateValueAndValidity();
    
    }else if(this.iForm.value.itype === 'Expose'){
      const iname = this.iForm.get('iname');
      iname.setValidators(Validators.required);
      iname.updateValueAndValidity();
      const ireq = this.iForm.get('ireq');
      ireq.setValidators(Validators.nullValidator);
      ireq.updateValueAndValidity();
      const iurl = this.iForm.get('iurl');
      iurl.setValidators(Validators.required);
      iurl.updateValueAndValidity();
      const itypeStorage = this.iForm.get('itypeStorage');
      itypeStorage.setValidators(Validators.required);
      itypeStorage.updateValueAndValidity();
      const iStorage = this.iForm.get('iStorage');
      iStorage.setValidators(Validators.required);
      iStorage.updateValueAndValidity();
    }

  }

  addTypeInEditor2(type) {
    if (type === "master") {
      this.strgType = 'master'
    }
    if (type === "screen") {
      this.strgType = 'screen'
    }
    if (type === "report") {
      this.strgType = 'report'
    }

    this.generateUrl = environment.baseUrl + '/api/external/api';

    if(type !== null){
      this.iForm.patchValue({
        iurl:  this.generateUrl + '/' + type,
      }); 
      this.retiveDataSet(type);
    }

  }

  retiveDataSet(data){
    this.storageResData = []
    this.apiService.getDataSet(data).subscribe(res => {
      if(res.length > 0){
        this.storageResData = res
      }

    })
  }

  addTypeInEditor3(dataset) {
      if (dataset) {
        var data: any
        if(this.strgType == 'report'){
         data = this.strgType + '/' + dataset.name + '/' + dataset._id
        } else{
         data = this.strgType + '/' + dataset.name + '/' + dataset.code
        }
        this.iForm.patchValue({
          iurl: this.generateUrl + '/' + data,
        }); 
        this.apiService.getDataSet(data).subscribe(res => {
          this.fetchRes = JSON.stringify(res);
        })
    }

  }

  addRequestInEditor(ireq) {
    if (ireq === "GET") {
      this.value1 = 'GET'
    }
    if (ireq === "POST") {
      this.value1 = 'POST'
    }
    this.selectedRequestMethod = ireq;
  }

  onFirstDataRendered(params) {
    this.gridApi = params;
    setTimeout(() => {
      if (this.gridApi && this.gridApi.api) {
        this.gridApi.api.sizeColumnsToFit()
      }
    }, 100)
  }

  constructObject(ctx: string) {
    let context, objBody;
    if (ctx === 'Headers') {
      context =  this.iForm['value'].steps;
    }

    let constructedObject = {};
    constructedObject
      = context
        .reduce((object, item) => {
          object[item.key] = item.value;
          return object;
        }, {});
    return constructedObject;
  }


  submitForm(){
    this.markFormGroupDirty(this.iForm)
    if (this.iForm.valid) {
      var data: any;
      if(this.iForm.value.itype === 'Expose'){
        let headr = {}
        headr['content-type'] = 'application/json';
        headr['Access-Control-Allow-Origin'] = '*';
        headr['Access-Control-Allow-Methods'] = 'GET,POST,OPTIONS,DELETE,PUT';

        let obj = {};
        obj['method'] = 'GET';
        obj['header'] = headr;
        obj['data'] = '';

        let obj2 = {};
        obj2['option'] = obj;
        obj2['url'] = this.iForm.value.iurl;

        this.dataobjSend = obj2;

        data = {
          name: this.iForm.value.iname,
          interfaceType: this.iForm.value.itype,
          apiinterface_data: this.dataobjSend,
        }

        }else{
          data = {
            name: this.iForm.value.iname,
            interfaceType: this.iForm.value.itype,
            apiinterface_data: this.dataobjSend,
          }
        }

          this.interfaceService.saveInterfaceData(data).subscribe(res => {
            this.notification.success('Successfully', 'You have successfully API data!')
            this.iForm.reset()
            this.responseData = '';
            this.responseError = '';
            // setTimeout(() => {}, 300)
          })
      } 

  }

  sendRequest() {
    this.markFormGroupDirty(this.iForm)
    // if (this.iForm.valid) {
      this.isVisible = true
    
    this.endpointError = '';
    this.responseData = '';
    this.responseError = '';
    this.endpoint = this.iForm.value.iurl;

    if (!this.endpoint) {
      this.endpointError = 'Endpoint is a Required value';
      return;
    }

    if( this.iForm.value.bodytxt !== null && this.iForm.value.bodytxt !== undefined){
    this.requestBody = this.iForm.value.bodytxt.trim();
    }

    let obj = {};
    obj['method'] = this.iForm.value.ireq;
    obj['header'] = this.constructObject('Headers');
    obj['data'] = this.iForm.value.bodytxt;

    let obj2 = {};
    obj2['option'] = obj;
    obj2['url'] = this.iForm.value.iurl;

    this.dataobjSend = obj2;

    this.loadingState = true;

    const data = {
      name: this.iForm.value.iname,
      interfaceType: this.iForm.value.itype,
      apiinterface_data: this.dataobjSend,
    }

    this.interfaceService.testInterfaceData(data).subscribe(res => {
      this.notification.success('Successfully', 'You have successfully tested api data!')
      this.responseData = JSON.stringify(res);
      // this.responseError = '';
      // setTimeout(() => {}, 300)
    })

    // }
    this.requestBodyDataTypes = [''];
  }

  addNewStep() {
    const approvalArray = this.iForm.get('steps') as FormArray
    const blockFormGroup = new FormGroup({});
    blockFormGroup.addControl('key', new FormControl('', Validators.required));
    blockFormGroup.addControl('value', new FormControl('', Validators.required));
    approvalArray.push(blockFormGroup);
  }

  removeNewStep(index: any) {
    const approvalArray = this.iForm.get('steps') as FormArray
    approvalArray.removeAt(index)
  }

  finish() {
    this.markFormGroupDirty(this.iForm)
    if (this.iForm.valid) {
      this.isVisible = true
    }
  }

  handleOk() {
    this.isVisible = false
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