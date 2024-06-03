import { OnInit, ViewChild } from '@angular/core'
import { FormBuilder, Validators } from '@angular/forms'
import { NzNotificationService } from 'ng-zorro-antd'
import { NzDatePickerComponent } from 'ng-zorro-antd/date-picker';
import { FormBuilderService } from '../../../../../src/app/services/form-builder.service'
import { FormRenderService } from '../../../../../src/app/services/form-render.service'
import { formioOptions } from './../../../constants/formiOptions'
import { MasterService } from '../../../../../src/app/services/master.service'
import { ActivatedRoute, Router } from '@angular/router'
import { select, Store } from '@ngrx/store'
import * as Reducers from '../../../../../src/app/store/reducers'
import * as _ from 'lodash'
import { Component } from '@angular/core';
@Component({
  selector: 'app-plant-layout',
  templateUrl: './plant-layout.component.html',
  styleUrls: ['./plant-layout.component.scss']
})
export class PlantLayoutComponent implements OnInit {
  plantLayoutForm: any
  paramaterId: any = null
  options: any
  item: any = [] 
  data:any  
  rowStyle:any
  getRowStyle:any
  public form: any = { components: [] }
  columnDefs = [
    { headerName: 'Bot Summary', field: 'botSummery' ,width: 400},
    { headerName: 'No. Of BOT', field: 'noofBot',width: 220 },
  ];

  rowData = [
    { botSummery: 'At docking station & normal',  noofBot: 200,},
    { botSummery: 'At docking station & under strain',  noofBot: 200 },
    { botSummery: 'In cleaning & normal',  noofBot: 50 },
    { botSummery: 'In cleaning but under strain',  noofBot: 30 },
    { botSummery: 'Breakdown',  noofBot: 10 },
    { botSummery: 'Not communicating',  noofBot: 10 },
    { botSummery: 'Bot stopped due to emergency switch button',  noofBot: 0 },
  ];

  columnDefs1 = [
    { headerName: '', field: 'field1' ,width: 200},
    { headerName: '', field: 'field2' ,width: 200},
    { headerName: '', field: 'field3' ,width: 200},
  ];

  rowData1 = [
    { field1:'NCU1 / IC Pad XX/ Etc',field2:'',field3:'' },
    { field1:'',field2:'        ',field3:'' },
    { field1:'',field2:'',field3:'' },
    { field1:'',field2:'',field3:'' },
    { field1:'G: (add total here)',field2:'',field3:'' },
    { field1:'O: (add total here)',field2:'',field3:'' },
    { field1:'R: (add total here)',field2:'',field3:'' },
  ];
  columnDefs2 = [
    {headerName: 'Plant level/NCU level/ Bot level'},
    {headerName: 'Abort Type (OEM/Customer/wind)'},
    {headerName: 'Abort Reason'},
    {headerName: 'Issuer (OEM)'},
    {headerName: 'Issuer(Customer)'},
    {headerName: 'Aborted since'},
    {headerName: 'Estimated time of removal of abort'},
  ];

  rowData2 = [
   ];

   columnDefs3 = [
    {headerName: 'NCU ID'},
    {headerName: 'Date'},
    {headerName: 'Time'},
    {headerName: 'Component'},
    {headerName: 'Description'},
    {headerName: 'Expected TAT'},
    {headerName: 'Ticket Number'},
  ];

  rowData3 = [
   ];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private formRenderService: FormRenderService,
    private formBuilderService: FormBuilderService,
    private masterService: MasterService,
    private notification: NzNotificationService,
    private store: Store<any>
  ) {
    this.route.params.subscribe(params => {
      this.paramaterId = params['id']
    })
  this.getRowStyle = params => {
    console.log(params)
    if (params.data.botSummery === 'At docking station & normal' || params.data.botSummery === 'In cleaning & normal') {
      return { background: 'green' };
  }
    else if (params.data.botSummery === 'At docking station & under strain' || params.data.botSummery === 'In cleaning but under strain') {
        return { background: 'yellow' };
    }else 
    if (params.data.noofBot <= 10) {
      return { background: 'red' };
  }
};
  }
  ngOnInit(): void {
    this.options = formioOptions 
    this.plantLayoutForm = this.formBuilder.group({
      plantName: ['', Validators.required],
      plantLocation: ['', Validators.required],
      plantCapacity: ['', Validators.required],
      botInstalled:['',Validators.required],
      underAMC:[''],
      activAlarm:['',Validators.required],
      slaAlarm:['',Validators.required],
      ncuAlarm:['',Validators.required],
      ncuAlarmSLA:['',Validators.required],
      abortedBOT:['',Validators.required],
      updateTime:['',Validators.required],
      updateDate:['',Validators.required],
      abortLevel:['',Validators.required],
    })

  }
  
}
