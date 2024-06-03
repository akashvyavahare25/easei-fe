//@ts-nocheck
import { Component, AfterViewChecked, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FullCalendarComponent,CalendarOptions } from '@fullcalendar/angular'; 
import { EventInput, Calendar } from '@fullcalendar/core'; 
import dayGridPlugin from '@fullcalendar/daygrid'; 
import timeGrigPlugin from '@fullcalendar/timegrid'; 
import interactionPlugin from '@fullcalendar/interaction';  
import { Subject, scheduled } from 'rxjs';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'; 
import { PlantServiceService } from '../../../services/plants/plant-service.service'; 
import { Router } from '@angular/router';
import { CalendarPopupComponent } from '../calendar-popup/calendar-popup.component'; 
declare var require: any;
var moment = require('moment');
var jsonata = require('jsonata'); 
@Component({
  selector: 'app-scheduleing',
  templateUrl: './scheduleing.component.html',
  styleUrls: ['./scheduleing.component.scss']
})
export class ScheduleingComponent  implements OnInit {
  bcuIdReset :any
  ncuIdReset:any
  plantIdReset:any
  NcuBcuJsonId: any
  plantId: any
  ncuId: any
  bcuId: any
  ncuList: any = []
  bcuList: any = []
  plantList: any = [] 
  ncureqid :any=''
  bcureqid:any=''
  nextMonthDate:string
  calendarOptionsCurrentMonth :any
  calendarOptionsNextMonth:any
  visible:boolean=false
  @ViewChild('fullcalendar') calendarComponent: FullCalendarComponent;
  
  calendarEvents: EventInput[] = [];

  calendarPlugins = [dayGridPlugin, timeGrigPlugin, interactionPlugin];

  calendarApi: Calendar; 
  initialized = false; 
  responseData:any={}
  constructor( private fb: FormBuilder,  public dialog: MatDialog, private plantService: PlantServiceService,private router: Router) {
 
  }
  ngOnInit(): void {  
    this.plantService.getPlantHierachyData().subscribe(res => {
      this.NcuBcuJsonId = res
      this.getNcuBcuID(this.NcuBcuJsonId);
    })
    this.responseData={}
    this.plantService.getTwoMonthScheduleData('','').subscribe(resp=>{
      this.responseData=resp
      this.displayCalendar(resp)
    })
        
    
  } 
  handleDateClick(arg :any) { 
    arg['ncureqid']=this.ncureqid
    arg['bcureqid']=this.bcureqid
    arg['visibleMultipleDays']=arg.visibleMultipleDays?arg.visibleMultipleDays:false
    const dialogRef = this.dialog.open(CalendarPopupComponent, {
      width: '500px', disableClose: true,data:arg,
    });
  }

 displayCalendar(data){
  
  

  // let currentMonth = +moment().format('MM')
  let nextMonth = +moment().add(1,'months').format('MM')
  let year = +moment().format('yyyy')
  if(nextMonth == 1){
    year = year+1
    this.nextMonthDate = year+'-'+moment().add(1,'months').format('MM')+'-01'   
  }else{
    this.nextMonthDate = year+'-'+moment().add(1,'months').format('MM')+'-01'
  }
    // this.responseData.current_month.forEach(ele=>{
    //   ele['overlap']=true
    //   ele['display']= 'background',
    // ele['color'] = '#F68D5D',  
    // ele['textColor']= 'black' 
    // })
    // this.responseData.next_month.forEach(ele=>{
    //   ele['overlap']=true
    //   ele['display']= 'background',
    // ele['color'] = '#F68D5D',  
    // ele['textColor']= 'black' 
    // })

   let currentMonthCalendar : CalendarOptions = {
    initialView: 'dayGridMonth',
    height: 650,
     dateClick: this.handleDateClick.bind(this),
    eventClick: function(info) {
      var eventObj = info.event;
    },
    events: data.current_month
    // [
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
    //     start: '2023-12-11',
    //     end: '2023-12-13',
    //     overlap: true,
    //     display: 'background',
    //     color: '#EE2A41',
    //     textColor: 'black' 
    //   }, 
    // ]
  };
   let nextMonthCalendar :  CalendarOptions = {
    initialDate:this.nextMonthDate ,
     initialView: 'dayGridMonth',
    
    height: 650,
     dateClick: this.handleDateClick.bind(this),
    eventClick: function(info) {
      var eventObj = info.event;
    },
    
    events: data.next_month
    //  [
    //   {
    //     title: 'event',
    //     start: '2023-12-25',
    //     end: '2023-12-25',
    //     overlap: true,
    //     display: 'background',
    //     color: '#F68D5D',  
    //     textColor: 'black' 
    //   },
    //   {
    //     title: 'event2',
    //     start: '2023-12-28',
    //     end: '2023-12-28',
    //     overlap: true,
    //     display: 'background',
    //     color: '#F68D5D',  
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
  this.calendarOptionsCurrentMonth=currentMonthCalendar

  setTimeout(() => {
    this.calendarOptionsNextMonth = nextMonthCalendar
    console.log('currentMonthCalendar',currentMonthCalendar)
    this.visible=true
  }, 500);


}
    ScheduleMultipleDays(){
       this.handleDateClick({
        visibleMultipleDays:true
       })
    }

   reset(){
   this.plantIdReset  = ""
    this.ncuIdReset = ""
    this.bcuIdReset =""
    this.getNcuBcuID(this.NcuBcuJsonId);
  }
  getNcuBcuID(data:any) {
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
  selectBcuId(value){
    this.bcureqid=value.join()
    this.responseData={}
    this.plantService.getTwoMonthScheduleData(this.ncureqid,this.bcureqid).subscribe(resp=>{
      this.displayCalendar(resp)
    })
 
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
    this.responseData={}
    this.plantService.getTwoMonthScheduleData(this.ncureqid,this.bcureqid).subscribe(resp=>{
      this.displayCalendar(resp)
    })
  }
  fullYear(){
    this.router.navigate(['/front/oem/dashboard/fullYearScheduleing'])
  }
}