//@ts-nocheck
import { Component, AfterViewChecked, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FullCalendarComponent, CalendarOptions } from '@fullcalendar/angular';
import { EventInput, Calendar } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGrigPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { CalendarPopupComponent } from '../calendar-popup/calendar-popup.component';
import { MatDialog } from '@angular/material/dialog';
import { FormBuilder } from '@angular/forms';
import { PlantServiceService } from '../../../services/plants/plant-service.service';
import { Router } from '@angular/router';

import * as moment from 'moment';
var jsonata = require('jsonata');
@Component({
  selector: 'app-full-yearscheduling',
  templateUrl: './full-yearscheduling.component.html',
  styleUrls: ['./full-yearscheduling.component.scss']
})
export class FullYearschedulingComponent implements OnInit {

  bcuIdReset: any
  ncuIdReset: any
  plantIdReset: any
  NcuBcuJsonId: any
  plantId: any
  ncuId: any
  bcuId: any
  ncuList: any = []
  bcuList: any = []
  plantList: any = [] 
  nextMonthDate: string
  calendarOptionsCurrentMonth: any
  calendarOptionsJan: any
  calendarOptionsFeb: any
  calendarOptionsMarch: any
  calendarOptionsApril: any
  calendarOptionsMay: any
  calendarOptionsJun: any
  calendarOptionsJuly: any
  calendarOptionsAug: any
  calendarOptionsSep: any
  calendarOptionsOct: any
  calendarOptionsNov: any
  calendarOptionsDec: any
  fullYear:any=[]
  ncureqid :any=''
  bcureqid:any=''
  @ViewChild('fullcalendar') calendarComponent: FullCalendarComponent;

  calendarEvents: EventInput[] = [];
   responseData:any={}
  calendarPlugins = [dayGridPlugin, timeGrigPlugin, interactionPlugin];

  calendarApi: Calendar;
  initialized = false;

  constructor(private fb: FormBuilder, public dialog: MatDialog, private plantService: PlantServiceService, private router: Router) {
   
  }
  ngOnInit(): void {  
    this.plantService.getPlantHierachyData().subscribe(res => {
      this.NcuBcuJsonId = res
      this.getNcuBcuID(this.NcuBcuJsonId);
    })
   
      this.displayCalendar(this.ncureqid,this.bcureqid)
   
    
  }
  handleDateClick(arg: any) { 
    arg['visibleMultipleDays']=arg.visibleMultipleDays?arg.visibleMultipleDays:false
    const dialogRef = this.dialog.open(CalendarPopupComponent, {
      width: '500px', disableClose: true, data: arg
    });
  }
  ScheduleMultipleDays(){
    this.handleDateClick({
     visibleMultipleDays:true
    })
 }
  displayCalendar(ncu,bcu) { 
   /*  [
      {
        title: 'event 1',
        start: '2022-03-28',
        end: '2022-03-28',
        overlap: true,
        display: 'background',
        color: '#F68D5D',
        textColor: 'black'
      },
      {
        title: 'event 2',
        start: '2022-03-21',
        end: '2022-03-21',
        overlap: true,
        display: 'background',
        color: '#26A69A',
        textColor: 'black'
      }, 
    ] */
    this.responseData={}
    this.fullYear=[]
    this.plantService.getScheduleData(ncu,bcu).subscribe(resp=>{
      this.responseData=resp
    let currentMonth = +moment().format('MM')
    let nextMonth = +moment().add(1, 'months').format('MM')
    let year = +moment().format('yyyy')
    this.nextMonthDate = year + '-' + moment().add(1, 'months').format('MM') + '-01'

 /*    let currentMonthCalendar: CalendarOptions = {
      initialView: 'dayGridMonth',
      height: 450,
      dateClick: this.handleDateClick.bind(this),
      eventClick: function (info) {
        var eventObj = info.event; 
      },
      events: [
        {
          title: 'event 1',
          start: '2022-03-28',
          end: '2022-03-28',
          overlap: true,
          display: 'background',
          color: '#F68D5D',
          textColor: 'black'
        },
        {
          title: 'event 2',
          start: '2022-03-21',
          end: '2022-03-21',
          overlap: true,
          display: 'background',
          color: '#26A69A',
          textColor: 'black'
        },
        {
          title: 'event 3',
          start: '2022-03-11',
          end: '2022-03-16',
          overlap: false,
          display: 'background',
          color: '#EE2A41',
          textColor: 'black'
        },
      ]
    }; */
    let janMonthCalendar: CalendarOptions = {
      initialDate:year+'-01-01',
      initialView: 'dayGridMonth',

      height: 450,
      dateClick: this.handleDateClick.bind(this),
      eventClick: function (info) {
        var eventObj = info.event; 
      },
      events:this.responseData && this.responseData.jan_month ?this.responseData.jan_month:[]
    }; 
    let febMonthCalendar: CalendarOptions = {
      initialDate: year+'-02-01',
      initialView: 'dayGridMonth',

      height: 450,
      dateClick: this.handleDateClick.bind(this),
      eventClick: function (info) {
        var eventObj = info.event; 
      },
      events: this.responseData && this.responseData.feb_month ?this.responseData.feb_month:[]
      // [
       
      //   {
      //     title: 'event 3',
      //     start: '2022-03-11',
      //     end: '2022-03-13',
      //     overlap: true,
      //     display: 'background',
      //     color: '#EE2A41',
      //     textColor: 'black'
      //   },
      // ]
    }; 
    let marchMonthCalendar: CalendarOptions = {
      initialDate: year+'-03-01',
      initialView: 'dayGridMonth',

      height: 450,
      dateClick: this.handleDateClick.bind(this),
      eventClick: function (info) {
        var eventObj = info.event; 
      },
      events:this.responseData && this.responseData.mar_month ?this.responseData.mar_month:[],
      //  [
      //   {
      //     title: 'event 1',
      //     start: '2022-03-28',
      //     end: '2022-03-28',
      //     overlap: true,
      //     display: 'background',
      //     color: '#F68D5D',
      //     textColor: 'black'
      //   },
      //   {
      //     title: 'event 2',
      //     start: '2022-03-21',
      //     end: '2022-03-21',
      //     overlap: true,
      //     display: 'background',
      //     color: '#26A69A',
      //     textColor: 'black'
      //   },
      //   {
      //     title: 'event 3',
      //     start: '2022-03-11',
      //     end: '2022-03-13',
      //     overlap: true,
      //     display: 'background',
      //     color: '#EE2A41',
      //     textColor: 'black'
      //   },
      // ]
    }; 
    let aprilMonthCalendar: CalendarOptions = {
      initialDate:  year+'-04-01',
      initialView: 'dayGridMonth',

      height: 450,
      dateClick: this.handleDateClick.bind(this),
      eventClick: function (info) {
        var eventObj = info.event; 
      },
      events: this.responseData && this.responseData.apr_month ?this.responseData.apr_month:[]
    }; 
    let mayMonthCalendar: CalendarOptions = {
      initialDate:  year+'-05-01',
      initialView: 'dayGridMonth',

      height: 450,
      dateClick: this.handleDateClick.bind(this),
      eventClick: function (info) {
        var eventObj = info.event; 
      },
      events:this.responseData && this.responseData.may_month ?this.responseData.may_month:[]
      // [
      //   {
      //     title: '',
      //     start: '2022-05-01',
      //     end: '2022-06-01',
      //     overlap: true,
      //     display: 'background',
      //     color: '#26A69A',
      //     textColor: 'black'
      //   }, 
      // ]
    }; 
    let junMonthCalendar: CalendarOptions = {
      initialDate: year+'-06-01',
      initialView: 'dayGridMonth',

      height: 450,
      dateClick: this.handleDateClick.bind(this),
      eventClick: function (info) {
        var eventObj = info.event; 
      },
      events:this.responseData && this.responseData.jun_month ?this.responseData.jun_month:[]
      //  [
      //   {
      //     title: '',
      //     start: '2022-06-01',
      //     end: '2022-07-01',
      //     overlap: true,
      //     display: 'background',
      //     color: '#26A69A',
      //     textColor: 'black'
      //   }, 
      // ]
    }; 
    let julyMonthCalendar: CalendarOptions = {
      initialDate: year+'-07-01',
      initialView: 'dayGridMonth',

      height: 450,
      dateClick: this.handleDateClick.bind(this),
      eventClick: function (info) {
        var eventObj = info.event; 
      },
      events: this.responseData && this.responseData.jul_month ?this.responseData.jul_month:[]
      // [
      //   {
      //     title: '',
      //     start: '2022-07-01',
      //     end: '2022-08-01',
      //     overlap: true,
      //     display: 'background',
      //     color: '#26A69A',
      //     textColor: 'black'
      //   },  
      //  ]
    };
     let augMonthCalendar: CalendarOptions = {
      initialDate:  year+'-08-01',
      initialView: 'dayGridMonth',

      height: 450,
      dateClick: this.handleDateClick.bind(this),
      eventClick: function (info) {
        var eventObj = info.event; 
      },
      events:this.responseData && this.responseData.aug_month ?this.responseData.aug_month:[]
      //  [
      //     {
      //       title: '',
      //       start: '2022-08-01',
      //       end: '2022-09-01',
      //       overlap: true,
      //       display: 'background',
      //       color: '#26A69A',
      //       textColor: 'black'
      //     },  
      // ]
    };
     let sepMonthCalendar: CalendarOptions = {
      initialDate: year+'-09-01',
      initialView: 'dayGridMonth',

      height: 450,
      dateClick: this.handleDateClick.bind(this),
      eventClick: function (info) {
        var eventObj = info.event; 
      },
      events:this.responseData && this.responseData.sep_month ?this.responseData.sep_month:[]
      //  [
      //   {
      //     title: 'event 1',
      //     start: '2022-09-01',
      //     end: '2022-10-01',
      //     overlap: true,
      //     display: 'background',
      //     color: '#26A69A',
      //     textColor: 'black'
      //   }, 
      // ]
        };
     let octMonthCalendar: CalendarOptions = {
      initialDate: year+'-10-01',
      initialView: 'dayGridMonth',

      height: 450,
      dateClick: this.handleDateClick.bind(this),
      eventClick: function (info) {
        var eventObj = info.event; 
      },
      events: this.responseData && this.responseData.oct_month ?this.responseData.oct_month:[]
    //   [
    //     {
    //       title: '',
    //       start: '2022-10-01',
    //       end: '2022-11-01',
    //       overlap: true,
    //       display: 'background',
    //       color: '#26A69A',
    //       textColor: 'black'
    //     },  
    // ]  
 
    }; 
    let novMonthCalendar: CalendarOptions = {
      initialDate:  year+'-11-01',
      initialView: 'dayGridMonth',

      height: 450,
      dateClick: this.handleDateClick.bind(this),
      eventClick: function (info) {
        var eventObj = info.event; 
      },
        events:this.responseData && this.responseData.nov_month ?this.responseData.nov_month:[]
      //    [
      //     {
      //       title: '',
      //       start: '2022-11-01',
      //       end: '2022-12-01',
      //       overlap: true,
      //       display: 'background',
      //       color: '#26A69A',
      //       textColor: 'black'
      //     },  
      // ]  
    }; 
    let decMonthCalendar: CalendarOptions = {
      initialDate:  year+'-12-01',
      initialView: 'dayGridMonth',

      height: 450,
      dateClick: this.handleDateClick.bind(this),
      eventClick: function (info) {
        var eventObj = info.event; 
      },
     /*  validRange: {
        start: '2017-05-01',//start date here
        end: '2017-07-01' //end date here
    }, */
      events: this.responseData && this.responseData.dec_month ?this.responseData.dec_month:[]
    //   [
    //     {
    //       title: '',
    //       start: '2022-12-01',
    //       end: '2023-01-01',
    //       overlap: true,
    //       display: 'background',
    //       color: '#26A69A',
    //       textColor: 'black'
    //     },  
    // ]   
    };
  this.fullYear.push(janMonthCalendar,febMonthCalendar,marchMonthCalendar,aprilMonthCalendar,mayMonthCalendar,junMonthCalendar,julyMonthCalendar,augMonthCalendar,sepMonthCalendar,octMonthCalendar,novMonthCalendar,decMonthCalendar)
    // this.calendarOptionsCurrentMonth = currentMonthCalendar
  /*   this.calendarOptionsJan = janMonthCalendar
    this.calendarOptionsFeb = febMonthCalendar
    this.calendarOptionsMarch = marchMonthCalendar
    this.calendarOptionsApril = aprilMonthCalendar
    this.calendarOptionsMay = mayMonthCalendar
    this.calendarOptionsJun = junMonthCalendar
    this.calendarOptionsJuly = julyMonthCalendar
    this.calendarOptionsAug = augMonthCalendar
    this.calendarOptionsSep = sepMonthCalendar
    this.calendarOptionsOct = octMonthCalendar
    this.calendarOptionsNov = novMonthCalendar
    this.calendarOptionsDec = decMonthCalendar */
  })
  }
 
  reset() {
    this.plantIdReset = ""
    this.ncuIdReset = ""
    this.bcuIdReset = ""
    this.getNcuBcuID(this.NcuBcuJsonId);
  }

  selectBcuId(value){
    this.bcureqid=value.join()
    this.displayCalendar(this.ncureqid,this.bcureqid)
  }
  getNcuBcuID(data: any) {
    let plantsData: any = [];
    plantsData = jsonata("data[*]").evaluate(data);
    this.plantId = ''
    let newData = Array.isArray(plantsData) ? plantsData : [plantsData];
    newData.forEach(element => {
      if (this.plantId == undefined || this.plantId == null || this.plantId == '') {
        this.plantList.push({
          name: element.name,
          id: element.id
        })
      }
    });

    let NcuData: any = []
    NcuData = jsonata("data[*].knu").evaluate(data);
    this.ncuId = ''
    NcuData.forEach(element => {
      if (this.ncuId == undefined || this.ncuId == null || this.ncuId == '') {
        this.ncuList.push({
          name: element.name,
          id: element.id
        })
      }
    });
    let bcuData: any = []
    bcuData = jsonata("data[*].knu[*].status[*].bot").evaluate(data);
    this.bcuId = ''
    bcuData.forEach(element => {
      if (this.bcuId == undefined || this.bcuId == null || this.bcuId == '') {
        this.bcuList.push({
          name: element.name,
          id: element.id
        })
      }
    });

  }

  selectPlantId(value: any) {
    this.ncuList = []
    let arrayData: any = []
    let plantlistid: any = []
    let plantPredicateQuery = '*';
    plantlistid.push("id=" + "'" + value + "'");
    /*   if (plantlistid.length > 0) {
        plantPredicateQuery = plantlistid.join(" or ");
      } */
    arrayData = jsonata("data[" + plantlistid + "].knu").evaluate(this.NcuBcuJsonId)
    this.ncuId = ''
    arrayData.forEach(element => {
      if (this.ncuId == undefined || this.ncuId == null || this.ncuId == '') {
        this.ncuList.push({
          name: element.name,
          id: element.id
        })
      }
    });
  }

  selectNcuId(value: any) {
    this.bcuList = []
    let arrayData: any = []
    let knulistid: any = []
    let knuPredicateQuery = '*';
    value.forEach(id => {
      knulistid.push("id=" + "'" + id + "'");
    })
    if (knulistid.length > 0) {
      knuPredicateQuery = knulistid.join(" or ");
    }
    arrayData = jsonata("data[*].knu[" + knuPredicateQuery + "].status[*].bot").evaluate(this.NcuBcuJsonId)
    this.bcuId = ''
    arrayData.forEach(element => {
      if (this.bcuId == undefined || this.bcuId == null || this.bcuId == '') {
        this.bcuList.push({
          name: element.name,
          id: element.id
        })
      }
    });

    this.ncureqid=value.join()
    this.displayCalendar(this.ncureqid,this.bcureqid)
  }
  twoMonths() {
    this.router.navigate(['/front/oem/dashboard/scheduleing'])
  }
}