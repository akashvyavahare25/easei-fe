import { OnInit, ViewChild } from '@angular/core'
import { FormBuilder, Validators } from '@angular/forms' 
import { formioOptions } from './../../../constants/formiOptions'
import { ActivatedRoute, Router } from '@angular/router' 
import * as _ from 'lodash'
import { Component } from '@angular/core';
import { APIService } from '../../../services/api.service';
@Component({
  selector: 'app-ncu-layout',
  templateUrl: './ncu-layout.component.html',
  styleUrls: ['./ncu-layout.component.scss']
})
export class NcuLayoutComponent implements OnInit {
  paramaterId: any = null
  ncuLayoutForm: any
  userList:any 
  masterList;
  options: any


  columnDefs = [
    {headerName: 'NCU ID'},
    {headerName: 'Date'},
    {headerName: 'Time'},
    {headerName: 'Component'},
    {headerName: 'Description'},
    {headerName: 'Expected TAT'},
    {headerName: 'Ticket Number'},
  ];

  rowData = [
   ];

  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private apiService: APIService,
  ) {
    this.route.params.subscribe(params => {
      this.paramaterId = params['id']
    })
   }

  ngOnInit(): void {
    this.options = formioOptions 
    this.ncuLayoutForm = this.formBuilder.group({ 
      ncuId:['',Validators.required],
      date:['',Validators.required],
      windSpeed:['',Validators.required],
      windAlarm:['',Validators.required],
    })
  }
 
}
