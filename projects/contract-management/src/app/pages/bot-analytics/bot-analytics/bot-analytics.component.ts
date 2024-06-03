import { OnInit, ViewChild } from '@angular/core'
import { FormBuilder, Validators } from '@angular/forms' 
import { formioOptions } from './../../../constants/formiOptions'
import { ActivatedRoute, Router } from '@angular/router' 
import * as _ from 'lodash'
import { Component } from '@angular/core';
import { APIService } from '../../../services/api.service';
@Component({
  selector: 'app-bot-analytics',
  templateUrl: './bot-analytics.component.html',
  styleUrls: ['./bot-analytics.component.scss']
})
export class BotAnalyticsComponent implements OnInit {
  paramaterId: any = null
  ncuLayoutForm: any
  userList:any 
  masterList;
  options: any


  columnDefs = [
    {headerName: 'BOT ID'},
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
      botId:['',Validators.required],
      date:['',Validators.required],
      time:['',Validators.required],
      windSpeed:['',Validators.required],
      windAlarm:['',Validators.required],
    })
  }
 
}
