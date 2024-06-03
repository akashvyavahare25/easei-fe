//@ts-nocheck
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatOption } from '@angular/material/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSelect } from '@angular/material/select';
import { Router } from '@angular/router';
declare var require: any;
var jsonata = require('jsonata');
var moment = require('moment');
interface Food {
  value: string;
  viewValue: string;
}
import {
  ApexFill,
  ApexYAxis,
  ApexTooltip,
  ApexXAxis,
  ApexAxisChartSeries,
  ApexTitleSubtitle,
  ApexDataLabels,
  ApexLegend,
  ApexNonAxisChartSeries,
  ApexPlotOptions,
  ApexChart,
  ChartComponent,
  ApexStroke,
  ApexMarkers,
  ApexGrid,
  ApexAnnotations
} from "ng-apexcharts";
import { max } from 'rxjs/operators';
import { DataService } from '../../../../../src/app/data.service';
import * as _ from 'lodash';
import { Subject } from 'rxjs';
import { type } from 'os'; 
export type ChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  labels: string[];
  plotOptions: ApexPlotOptions;
  stroke: any; // ApexStroke;
  fill: ApexFill;

};
export type ChartOptions2 = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  title: ApexTitleSubtitle;
  plotOptions: ApexPlotOptions;
  legend: ApexLegend;
  xaxis: ApexXAxis;
  yaxis: ApexYAxis | ApexYAxis[];
  labels: string[];
  stroke: any; // ApexStroke;
  markers: ApexMarkers;
  fill: ApexFill;
  tooltip: ApexTooltip;
  grid: ApexGrid;
};
export type ChartOptions3 = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  yaxis: ApexYAxis | ApexYAxis[];
  title: ApexTitleSubtitle;
  labels: string[];
  stroke: any; // ApexStroke;
  markers: ApexMarkers;
  dataLabels: any; // ApexDataLabels;
  fill: ApexFill;
  tooltip: ApexTooltip;
  legend: ApexLegend;
  grid: ApexGrid;
  annotation:ApexAnnotations;
};
export type ChartOptions4 = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  stroke: ApexStroke;
  dataLabels: ApexDataLabels;
  markers: ApexMarkers;
  colors: string[];
  yaxis: ApexYAxis;
  grid: ApexGrid;
  legend: ApexLegend;
  title: ApexTitleSubtitle;
  tooltip: ApexTooltip;
  annotation:ApexAnnotations;

};
export type ChartOptions5 = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  yaxis: ApexYAxis | ApexYAxis[];
  title: ApexTitleSubtitle;
  labels: string[];
  stroke: any; // ApexStroke;
  markers: ApexMarkers;
  dataLabels: any; // ApexDataLabels;
  fill: ApexFill;
  tooltip: ApexTooltip;
  legend: ApexLegend;
  grid: ApexGrid;
};

export type ChartOptions6 = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  stroke: ApexStroke;
  dataLabels: ApexDataLabels;
  markers: ApexMarkers;
  colors: string[];
  yaxis: ApexYAxis;
  grid: ApexGrid;
  legend: ApexLegend;
  title: ApexTitleSubtitle;
  tooltip: ApexTooltip;
};

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  jsonData :any=[]
  region: any = []
  country: any = []
  state: any = []
  plant: any = []
  calendar = '7';
  allPlants1 = '';
  allIncharge1 = '';
  allRegion1 = '';
  allCountry1 = '';
  allState1 = ''; 
  allPlants = new FormControl();
  allIncharge = new FormControl();
  allRegion = new FormControl();
  allCountry = new FormControl();
  allState = new FormControl();
  count: any;
  overview = false;
  heatmap = true;
  allSelected = false;
  allSelected1 = false;
  allSelected2 = false;
  allSelected3 = false;
  allSelected4 = false;
  avgUptime: any;
  uptimeSeries: any = [];
  uptimeXaxis: any = [];
  avgsoiling: any;
  soilingSeries: any = [];
  soilingXaxis: any = [];
  botStatus: any;
  totalBotStatus: any=[];
  allDataSummary: any;
  plantsId: string;
  botStatusArray:any=[]
  allAvgUptime:any=[];
  allAvgSoilloss:any=[];
  allPlantsList: any = [];
  allInchargeList: any = [];
  allRegionList: any = [];
  allCountryList: any = [];
  allStateList: any = [];
  startDate:any
  endDate:any
  uptimeColors:any
  soilingLoassColors:any
  uptimeStrok:any
  soilingStrok:any
  uptimeMarker:any
  soilingMarkers:any
  allselectedregionstatus={selected:false,disselected:false}
  allselectedcountrystatus={selected:false,disselected:false}
  allselectedstatestatus={selected:false,disselected:false}
  allselectedplantstatus={selected:false,disselected:false}
  allselectedinchargestatus={selected:false,disselected:false}
  allPlantsId:string;
  @ViewChild('select') select: MatSelect;
  @ViewChild('select1') select1: MatSelect;
  @ViewChild('select2') select2: MatSelect;
  @ViewChild('select3') select3: MatSelect;
  @ViewChild('select4') select4: MatSelect;
  @ViewChild("chart") chart: ChartComponent;
  public chartOptions: Partial<ChartOptions> | any;
  public chartOptions1: Partial<ChartOptions> | any;
  public chartOptions2: Partial<ChartOptions2> | any;
  public chartOptions3: Partial<ChartOptions3> | any;
  public chartOptions4: Partial<ChartOptions4> | any;
  public chartOptions5: Partial<ChartOptions5> | any;
  public chartOptions6: Partial<ChartOptions6> | any;
  public chartOptions7: Partial<ChartOptions> | any;

 
  childNotifier: Subject<any> = new Subject<any>(); 
  daysNotifier: Subject<any> = new Subject<any>();
  startDatechildNotifier: Subject<any> = new Subject<any>(); 
  endDatechildNotifier: Subject<any> = new Subject<any>();
  maxDate=new Date()
  constructor(public dialog: MatDialog, private router: Router, private service: DataService) { 
    this.childNotifier.next(this.plantsId);
    // console.log(this.plantsId)
  }

  ngOnInit() {
    // this.getavgUptimeData();
    // this.getavgSoilingData();
    // this.getBotStatus();
    // this.getAllSummary();
    this.endDate=moment().format("DD-MM-YYYY")
    this.startDate=moment().subtract(7, 'days').format("DD-MM-YYYY")  
    this.startDatechildNotifier.next(this.startDate); 
    this.endDatechildNotifier.next(this.endDate); 
    this.daysNotifier.next(this.calendar)
    ///this.daysNotifier = 7
    this.allCountryList = []
    this.allStateList = []
    this.region = []  
    this.service.getAPIData1().subscribe(res => {
      this.jsonData = res;
      this.getPlants(this.jsonData.data)
      this.btnClick('overview')
    
    })
  }
  
  reset() {
    this.calendar = "7";
    this.allPlants1 = '';
    this.allIncharge1 = '';
    this.allRegion1 = '';
    this.allCountry1 = '';
    this.allState1 = '';
    this.allSelected2=false;
    this.allSelected=false;
    this.allSelected1=false;
    this.allSelected3=false;
    this.allSelected4=false;
    this.allCountryList=[]
    this.allStateList=[]
    this.endDate=moment().format("DD-MM-YYYY")
    this.startDate=moment().subtract(7, 'days').format("DD-MM-YYYY")   
    this.service.getAPIData1().subscribe(res => {
      this.jsonData = res;
      this.getPlants(this.jsonData.data)
    })
  }
  selectedDate(days){
    if(days != "custom"){ 
      this.endDate=moment().format("DD-MM-YYYY")
      this.startDate=moment().subtract(days, 'days').format("DD-MM-YYYY")
      // console.log(this.endDate,"finaldate",this.startDate) 
      this.startDatechildNotifier.next(this.startDate); 
      this.endDatechildNotifier.next(this.endDate);
      this.daysNotifier.next(days)
      this.allAPIDate() 
    }else{
      this.daysNotifier.next(days)
    }
  } 
  selectedCustomDateStart(days){ 
    this.startDate=moment(days.value).format("DD-MM-YYYY")
      // console.log("finaldate", this.startDate ) 
      this.startDatechildNotifier.next(this.startDate);
      // this.daysNotifier.next("custom")
      this.allAPIDate() 
    }
  selectedCustomDateEnd(days){
    this.endDate=moment(days.value).format("DD-MM-YYYY") 
    this.startDatechildNotifier.next(this.startDate); 
    this.endDatechildNotifier.next(this.endDate);
    //  this.daysNotifier.next(custom)
    this.allAPIDate() 
    }

    allAPIDate(){
      this.getavgUptimeData();
      this.getavgSoilingData();
      this.getBotStatus();
      this.getAllSummary(); 
      this.childNotifier.next(this.plantsId);
    }
  toggleAllSelection() {
    if (this.allSelected) {  
      this.select.options.forEach((item: MatOption) =>{
        this.allselectedplantstatus.selected=true
        this.allselectedplantstatus.disselected=false
        item.select()
      } );
    } else {
      this.select.options.forEach((item: MatOption) =>{
        this.allselectedplantstatus.selected=false
        this.allselectedplantstatus.disselected=true
        item.deselect()
      } );
    }
  }
  optionClick() {
    let newStatus = true;
    this.select.options.forEach((item: MatOption) => {
      if (!item.selected) {
        newStatus = false;
      }
    });
    this.allSelected = newStatus;
  }

  toggleAllSelection1() {
    if (this.allSelected1) {
      this.select1.options.forEach((item: MatOption) => item.select());
    } else {
      this.select1.options.forEach((item: MatOption) => item.deselect());
    }
  }
  optionClick1() {
    let newStatus = true;
    this.select1.options.forEach((item: MatOption) => {
      if (!item.selected) {
        newStatus = false;
      }
    });
    this.allSelected1 = newStatus;
  }
  toggleAllSelection2() {
    if (this.allSelected2) {
      this.select2.options.forEach((item: MatOption) => {
        this.allselectedregionstatus.selected=true
        this.allselectedregionstatus.disselected=false
        item.select()});
    } else {
      this.select2.options.forEach((item: MatOption) =>{
        this.allselectedregionstatus.selected=false
        this.allselectedregionstatus.disselected=true
        item.deselect()
      } );
    }
  }
  optionClick2() {
    let newStatus = true;
    this.select2.options.forEach((item: MatOption) => {
      if (!item.selected) {
        newStatus = false;
      }
    });
    this.allSelected2 = newStatus;
  }
  toggleAllSelection3() {
    if (this.allSelected3) {
      
      this.select3.options.forEach((item: MatOption) => {
        this.allselectedcountrystatus.selected=true
        this.allselectedcountrystatus.disselected=false
        item.select()});
    } else {
      this.select3.options.forEach((item: MatOption) => {
        this.allselectedcountrystatus.selected=false
        this.allselectedcountrystatus.disselected=true
        item.deselect()});
    }
  }
  optionClick3() {
    let newStatus = true;
    this.select3.options.forEach((item: MatOption) => {
      if (!item.selected) {
        newStatus = false;
      }
    });
    this.allSelected3 = newStatus;
  }

  toggleAllSelection4() {
    if (this.allSelected4) {
      this.select4.options.forEach((item: MatOption) =>{
        this.allselectedstatestatus.selected=true
        this.allselectedstatestatus.disselected=false
        item.select()
      } );
    } else {
     
      this.select4.options.forEach((item: MatOption) => {
        this.allselectedstatestatus.selected=false
        this.allselectedstatestatus.disselected=true
        item.deselect()
      } );
    }
  }
  optionClick4() {
    let newStatus = true;
    this.select4.options.forEach((item: MatOption) => {
      if (!item.selected) {
        newStatus = false;
      }
    });
    this.allSelected4 = newStatus;
  }
  getavgUptimeData() {  
    this.avgUptime=[]
    this.uptimeSeries=[]
    this.uptimeXaxis=[]
    this.allAvgUptime=[]
    this.uptimeXaxis=[]
    this.service.getuptimedata1(this.plantsId,this.startDate,this.endDate).subscribe(res => {
      this.uptimeSeries=[]
      this.avgUptime=[]
      this.avgUptime = res;
      if(this.avgUptime.data[0].series){
      let threasholdVal : any = this.avgUptime.data[0].threshold;
      let newData: any = this.avgUptime.data[0].series
      let  uptimeData :any = _.filter(newData, { 'name': "With AMC" })[0];
      let uptimeDataWo :any= _.filter(newData, { 'name': "Without AMC" })[0];
      
      if(uptimeData && uptimeDataWo){
        this.uptimeSeries.push({
          name: uptimeData.name,
          data: uptimeData.data,
          type: "line"
        })
        this.uptimeSeries.push({
          name: uptimeDataWo.name,
          data: uptimeDataWo.data,
          type: "line"
        })  
        this.uptimeColors=[ "#F68D5D80","#6F6BF480","#2D3047"]
        this.uptimeStrok ={
          width: [2, 2, 1],
          curve: "smooth",
          dashArray: [0, 0, 8]
        }
        this.uptimeMarker ={
          size: [3, 3, 0],
          colors: undefined,
          strokeColors: [ "#F68D5D80","#6F6BF480", "#000000"],
          strokeWidth: 2,
          strokeOpacity: 0.9,
          strokeDashArray: 0,
          fillOpacity: 1,
          showNullDataPoints: true,
          hover: {
            size: undefined,
            sizeOffset: 3
          }
        }
      }
    else if(uptimeData && !uptimeDataWo){
        this.uptimeSeries.push({
          name: uptimeData.name,
          data: uptimeData.data,
          type: "line"
        })
        this.uptimeColors=[ "#F68D5D80","#2D3047"]
        this.uptimeStrok ={
          width: [2, 1],
          curve: "smooth",
          dashArray: [ 0, 8]
        }
        this.uptimeMarker ={
          size: [3, 0],
          colors: undefined,
          strokeColors: [ "#F68D5D80","#000000"],
          strokeWidth: 2,
          strokeOpacity: 0.9,
          strokeDashArray: 0,
          fillOpacity: 1,
          showNullDataPoints: true,
          hover: {
            size: undefined,
            sizeOffset: 3
          }
        }
      }
      else if(uptimeDataWo && !uptimeData){
        this.uptimeSeries.push({
          name: uptimeDataWo.name,
          data: uptimeDataWo.data,
          type: "line"
        })  
        this.uptimeColors= [ "#6F6BF480", "#2D3047"]
        this.uptimeStrok = {
          width: [2, 1],
          curve: "smooth",
          dashArray: [ 0, 8]
        }
        this.uptimeMarker ={
          size: [3, 0],
          colors: undefined,
          strokeColors: [ "#6F6BF480","#000000"],
          strokeWidth: 2,
          strokeOpacity: 0.9,
          strokeDashArray: 0,
          fillOpacity: 1,
          showNullDataPoints: true,
          hover: {
            size: undefined,
            sizeOffset: 3
          }
        }
      }
      //  console.log("this.uptimeSeries",this.uptimeSeries)
      /* let threashold:any=[];
      for(let i=0; i < this.uptimeSeries[0].data.length;i++){
            threashold.push(threasholdVal)
      }
      this.uptimeSeries.push({
        name:  "",
        data: threashold,
        type: "line"
      }) */

      let sum : number = 0
      let sum1 : number = 0
      if(uptimeData && uptimeDataWo){
        for(let i=0;i< uptimeData.data.length;i++){
          sum = sum + parseFloat(uptimeData.data[i]) 
        }
        for(let i=0;i< uptimeDataWo.data.length;i++){
          sum1 = sum1 + parseFloat(uptimeDataWo.data[i]) 
        }
        let avg = parseFloat(sum/uptimeData.data.length).toFixed(2)
        let avg1 = parseFloat(sum1/uptimeDataWo.data.length).toFixed(2)
        let mean = +avg + +avg1
        this.allAvgUptime.push({
          name:uptimeData.name,
          average :avg
        },{
          name:uptimeDataWo.name,
          average :avg1
        },{
          averageMean:parseFloat(mean/2).toFixed(2)
        })
      
      }  
      else if(uptimeData &&  !uptimeDataWo){
        for(let i=0;i< uptimeData.data.length;i++){
          sum = sum + parseFloat(uptimeData.data[i]) 
        }
        let avg = parseFloat(sum/uptimeData.data.length).toFixed(2)
        this.allAvgUptime.push({
          name:uptimeData.name,
          average :avg
        },{
          averageMean:parseFloat(avg).toFixed(2)
        })
      }else if(uptimeDataWo && !uptimeData){
        for(let i=0;i< uptimeDataWo.data.length;i++){
          sum1 = sum1 + parseFloat(uptimeDataWo.data[i]) 
        }
        let avg1 = parseFloat(sum1/uptimeDataWo.data.length).toFixed(2)
        this.allAvgUptime.push( {
          name:uptimeDataWo.name,
          average :avg1
        },{
          averageMean:parseFloat(avg1).toFixed(2)
        })
      }   
      
      let data: any = this.avgUptime.data[0]
      let data1: any = data['x-axis'];
      this.uptimeXaxis.push({ categories: data1 ,tickPlacement: 'on', tickAmount: 19,  axisBorder: {
        show: true,
        color: "#74819E", 
      },
      labels: {
        show: true,
         style: {
          colors: "#74819E",
          fontSize: '12px',
          fontFamily: 'Lato, Semibold', 
          cssClass: 'apexcharts-yaxis-label',
        }}})
    }else{
      this.chartOptions4={}
    }
    })
  }
  getavgSoilingData() {
    this.avgsoiling=[]
    this.soilingSeries=[]
    this.soilingXaxis=[]
    this.allAvgSoilloss=[]
    this.soilingXaxis=[] 
    this.service.getsoilingloss1(this.plantsId,this.startDate,this.endDate).subscribe(res => {
      this.soilingSeries=[]
      this.avgsoiling=[]
      this.avgsoiling = res;
     if(this.avgsoiling.data[0].series){ 
      let threasholdVal : any = this.avgsoiling.data[0].threshold;
      let newData: any = this.avgsoiling.data[0].series

      let  soilingData:any = _.filter(newData, { 'name': "With AMC" })[0];
      let soilingDataWo:any = _.filter(newData, { 'name': "Without AMC" })[0];

      if(soilingData && soilingDataWo){
        this.soilingSeries.push({
          name: soilingData.name,
          data: soilingData.data,
          type: "column"
        })  
        this.soilingSeries.push({
          name: soilingDataWo.name,
          data: soilingDataWo.data,
          type: "line"
        })
        this.soilingLoassColors=[ "#F68D5D80","#6F6BF480","#2D3047"]
        this.soilingStrok ={
          width: [2, 2, 1],
          curve: "smooth",
          dashArray: [0, 0, 8]
        }
        this.soilingMarkers ={
          size: [3, 3, 0],
          colors: undefined,
          strokeColors: [ "#F68D5D80","#6F6BF480", "#000000"],
          strokeWidth: 2,
          strokeOpacity: 0.9,
          strokeDashArray: 0,
          fillOpacity: 1,
          showNullDataPoints: true,
          hover: {
            size: undefined,
            sizeOffset: 3
          }
        }
      }
    else if(soilingData && !soilingDataWo){
      this.soilingSeries.push({
        name: soilingData.name,
        data: soilingData.data,
        type: "column"
      })  
        this.soilingLoassColors=[ "#F68D5D80","#2D3047"]
        this.soilingStrok ={
          width: [2, 1],
          curve: "smooth",
          dashArray: [ 0, 8]
        }
        this.soilingMarkers ={
          size: [3, 0],
          colors: undefined,
          strokeColors: [ "#F68D5D80","#000000"],
          strokeWidth: 2,
          strokeOpacity: 0.9,
          strokeDashArray: 0,
          fillOpacity: 1,
          showNullDataPoints: true,
          hover: {
            size: undefined,
            sizeOffset: 3
          }
        }
      }
      else if(soilingDataWo && !soilingData){
        this.soilingSeries.push({
          name: soilingDataWo.name,
          data: soilingDataWo.data,
          type: "line"
        }) 
        this.soilingLoassColors= [ "#6F6BF480", "#2D3047"]
        this.soilingStrok = {
          width: [2, 1],
          curve: "smooth",
          dashArray: [ 0, 8]
        }
        this.soilingMarkers ={
          size: [3, 0],
          colors: undefined,
          strokeColors: [ "#6F6BF480","#000000"],
          strokeWidth: 2,
          strokeOpacity: 0.9,
          strokeDashArray: 0,
          fillOpacity: 1,
          showNullDataPoints: true,
          hover: {
            size: undefined,
            sizeOffset: 3
          }
        }
      }

    /* let threashold:any=[];
    for(let i=0; i < this.soilingSeries[0].data.length;i++){
          threashold.push(threasholdVal)
    }
    this.soilingSeries.push({
      name:  "",
      data: threashold,
      type: "line"
    }) */

    let sum : number = 0
    let sum1 : number = 0
    if(soilingData && soilingDataWo){
       
    for(let i=0;i< soilingData.data.length;i++){
      sum = sum + parseFloat(soilingData.data[i]) 
    }
    
    for(let i=0;i< soilingDataWo.data.length;i++){
      sum1 = sum1 + parseFloat(soilingDataWo.data[i]) 
    }

    let avg = parseFloat(sum/soilingData.data.length).toFixed(2)
    let avg1 = parseFloat(sum1/soilingDataWo.data.length).toFixed(2)
    let mean = +avg + +avg1
    this.allAvgSoilloss.push({
      name:soilingData.name,
      average :avg
    },{
      name:soilingDataWo.name,
      average :avg1
    },{
      averageMean:parseFloat(mean/2).toFixed(2)
    }) 
    }
   else if(soilingData && !soilingDataWo){
      for(let i=0;i< soilingData.data.length;i++){
        sum = sum + parseFloat(soilingData.data[i]) 
      }
    let avg = parseFloat(sum/soilingData.data.length).toFixed(2)
    this.allAvgSoilloss.push({
      name:soilingData.name,
      average :avg
    },{
      averageMean:parseFloat(avg).toFixed(2)
    })
    }
   else if(soilingDataWo && !soilingData){ 
      for(let i=0;i< soilingDataWo.data.length;i++){
        sum1 = sum1 + parseFloat(soilingDataWo.data[i]) 
      }
      let avg1 = parseFloat(sum1/soilingDataWo.data.length).toFixed(2)
      this.allAvgSoilloss.push({
        name:soilingDataWo.name,
        average :avg1
      },{
        averageMean:parseFloat(avg1).toFixed(2)
      })
    }
       let data: any = this.avgsoiling.data[0]
      let data1: any = data['x-axis'];
      this.soilingXaxis.push({ categories: data1 ,tickPlacement: 'on', tickAmount: 19,  axisBorder: {
        show: true,
        color: "#74819E", 
      },
      labels: {
        show: true,
         style: {
          colors: "#74819E",
          fontSize: '12px',
          fontFamily: 'Lato, Semibold', 
          cssClass: 'apexcharts-yaxis-label',
        }}})
  }else{
    this.chartOptions3={}
  }
  }) 
  }
  getBotStatus() {
    this.botStatus =[]
    this.service.getBotStatus1(this.plantsId,this.startDate,this.endDate).subscribe(res => {
      this.botStatus = res;
      this.getSortedBotData();
    })

  }
  getSortedBotData(){
    this.totalBotStatus = []
    this.botStatusArray=[]
    let healthyBots: any;
    let unhealthyBots: any;
    let total: any;
    let per:any
    let data:any = this.botStatus.data
    for (let i = 0; i < data.length; i++) {
      let dataObj: any = data[i]
      healthyBots = dataObj["healthy bot"]
      unhealthyBots = dataObj["unhealthy bot"]
      
      if(healthyBots <= 0 && unhealthyBots <= 0){
        total = +healthyBots + +unhealthyBots
        per = 0
     }else{
       if(healthyBots > 0 && unhealthyBots < 0){
        total = +healthyBots + +unhealthyBots
        per=0
       }else if(healthyBots <  0 && unhealthyBots >0){
        total = +healthyBots + +unhealthyBots
        per=0
       } else if(healthyBots == 0 && unhealthyBots > 0){
        total = +healthyBots + +unhealthyBots
        per = healthyBots * 100 / total
        per = parseFloat(per).toFixed(2)
       } else if(healthyBots > 0 && unhealthyBots == 0){
        total = +healthyBots + +unhealthyBots
        per = healthyBots * 100 / total
        per = parseFloat(per).toFixed(2)
       }
        else if(healthyBots > 0 && unhealthyBots > 0){
        total = +healthyBots + +unhealthyBots
        per = healthyBots * 100 / total
        per = parseFloat(per).toFixed(2)
       } else{
        total = +healthyBots + +unhealthyBots
        per = 0
       }
      }
      this.botStatusArray.push({
        healthy:healthyBots,
        unhealthy:unhealthyBots,
        total:total 
      })
        this.totalBotStatus.push(per)
    }
    setTimeout(() => this.myCharts(), 1500)

  }
  getAllSummary() { 
    this.service.getSummary1(this.plantsId,this.startDate,this.endDate).subscribe(res => {
      this.allDataSummary = res; 
      setTimeout(() => this.myCharts(), 1500)
    })
  }
  myCharts() {
    if(this.totalBotStatus.length >0){
      this.chartOptions = {
        series: [this.totalBotStatus[0]],
        color: '#000000',
        chart: {
          height: 160,
          type: "radialBar",
        },
        stroke: {
          show: true,
          lineCap: 'round'
        },
        plotOptions: {
          radialBar: {
            hollow: {
              margin: 15,
              size: "60%",
              color: '#26A69A'
            },
            track: {
              background: '#EE2A41',
              strokeWidth: 40,
            },
            dataLabels: {
              show: true,
              total: {
                show: true,
                label: 'Healthy',
                color: '#000000',
                fontSize: '16px',
              }
            }
          }
        },
        fill: {
          colors: ['#26A69A'],
        },
      };
      this.chartOptions1 = {
        series: [this.totalBotStatus[1]],
        chart: {
          height: 160,
          type: "radialBar",
  
        },
        stroke: {
          show: true,
          lineCap: 'round'
        },
        fill: {
          colors: ['#26A69A'],
        },
        plotOptions: {
          radialBar: {
            hollow: {
              margin: 15,
              size: "60%",
              color: '#26A69A'
            },
            track: {
              background: '#EE2A41',
              strokeWidth: 40,
            },
            dataLabels: {
              show: true,
              total: {
                show: true,
                label: 'Healthy',
                color: '#000000',
                fontSize: '16px',
              }
            }
          }
        },
      };
    }
  

   
         
          let soilingData:any
          if(this.allAvgSoilloss.length > 2){
            soilingData = this.allAvgSoilloss[2] 
          }else{
              soilingData = this.allAvgSoilloss[1] 
          }
          if( soilingData){
          //Mixed Chart
          this.chartOptions3 = {
            annotations: {
              yaxis: [
                {
                  y: this.avgsoiling.data[0].threshold, 
                  borderColor: '#000000',
                  strokeDashArray: 2,
                  width: '100%',
                  textAnchor: 'start',
                  label: { 
                    text: "Threshold Value : "+this.avgsoiling.data[0].threshold+"%",
                    position: 'right',
                    borderColor: '#fff',
                    borderWidth: 0,
                    borderRadius: 0,
                    textAnchor: 'middle',
                    offsetX: -85,
                    offsetY: -10, 
                    mouseEnter: undefined,
                    mouseLeave: undefined,
                    style: {
                        background: '#fff', 
                        fontSize: '12px',
                        fontWeight:600,
                        fontFamily: "Lato, Bold",
                        cssClass: 'apexcharts-point-annotation-label',
                        padding: {
                          left: 0,
                          right: 5,
                          top: 5,
                          bottom: 5,
                        }
                    },
                  }
                }
              ]
            },
            series: this.soilingSeries,
            chart: {
              height: 300,
              type: "line",
              toolbar: {
                show: true
              },
              zoom: {
                enabled: true
              }
            },
            stroke: this.soilingStrok, 
            title: {
              text: undefined,
            },
            dataLabels: {
              enabled: false,
              enabledOnSeries: undefined
            },
            xaxis: this.soilingXaxis[0],
            yaxis: {
              show: true,
              decimalsInFloat: false,
                /* max: 100, 
                min:0, */
              axisTicks: {
                show: true
              },
              axisBorder: {
                show: true,
                color: "#74819E",
                offsetX: 0,
                offsetY: 1
              },
              labels: {
                show: true,
                align: 'right',
                minWidth: 0,
                maxWidth: 180,
                style: {
                  colors: "#74819E",
                  fontSize: '12px',
                  fontFamily: 'Lato, Semibold', 
                  cssClass: 'apexcharts-yaxis-label',
                },
                lines: {
                  show: true,
                },
                formatter: (categories: any) => { 
                    return  parseFloat(categories).toFixed(2) + '%'
                  }
              },
            },
            colors:this.soilingLoassColors,  
            grid: {
              yaxis: {
                lines: {
                  show: false
                }
              }
            },
            markers: this.soilingMarkers, 
            plotOptions: {
              bar: {
                columnWidth: '30%',
                barHeight: '70%',
              }
            },
            legend: {
              position: "top",
              horizontalAlign: "right",
              floating: false,
              offsetY: 0,
              offsetX: -5,
              show: false,
            },
            tooltip: {
              enabled: true,
              theme: 'light',
              enabledOnSeries: undefined,
              shared: false,
              followCursor: false,
              intersect: false,
              inverseOrder: false,
              custom: undefined,
              fillSeriesColor: false,
              x: { format: "dd MMM yyyy" },
            }
          };
        }
       
          //Two Line Chart
          let uptimeData:any
          if(this.allAvgUptime.length > 2){
            uptimeData = this.allAvgUptime[2] 
          }else{
              uptimeData = this.allAvgUptime[1] 
          }
          if( uptimeData ){
          this.chartOptions4 = {
            annotations: {
              yaxis: [
                {
                  y: this.avgUptime.data[0].threshold, 
                  borderColor: '#000000',
                  strokeDashArray: 2,
                  textAnchor: 'start',
                  width: '100%',
                  label: { 
                    text: "Threshold Value : "+this.avgUptime.data[0].threshold+"%",
                    position: 'right',
                    borderColor: '#fff',
                    borderWidth: 0,
                    borderRadius: 0,
                    textAnchor: 'middle',
                    offsetX: -85,
                    offsetY: -10,
                    mouseEnter: undefined,
                    mouseLeave: undefined,
                    style: {
                        background: '#fff', 
                        fontSize: '12px',
                        fontWeight:600,
                        fontFamily: "Lato, Bold",
                        cssClass: 'apexcharts-point-annotation-label',
                        padding: {
                          left: 5,
                          right: 5,
                          top: 5,
                          bottom: 5,
                        }
                    },
                  }
                }
              ]
            }, 
            series: this.uptimeSeries,
            chart: {
              height: 300,
              type: "line",
              toolbar: {
                show: true
              }
            },
            colors:this.uptimeColors,
            dataLabels: {
              enabled: false
            },
            stroke: this.uptimeStrok, 
            title: {
              text:undefined,
              align: "left"
            },
      
            markers:this.uptimeMarker, 
            grid: {
              yaxis: {
                lines: {
                  show: false
                }
              }
            },
            xaxis: this.uptimeXaxis[0], 
            yaxis: {
              show: true,
              decimalsInFloat: false,
                max: 100, 
                min:0,
              axisTicks: {
                show: true
              },
              axisBorder: {
                show: true,
                color: "#74819E",
                offsetX: 0,
                offsetY: 1
              },
              labels: {
                show: true,
                align: 'right',
                minWidth: 0,
                maxWidth: 160,
                style: {
                  colors: "#74819E",
                  fontSize: '12px',
                  fontFamily: 'Lato, Semibold', 
                  cssClass: 'apexcharts-yaxis-label',
                },
                lines: {
                  show: true,
                },
                formatter: (categories: any) => { 
                    return  parseFloat(categories).toFixed(0) + '%'
                  }
              },
            },
            legend: {
              position: "right",
              showForSingleSeries: true,
              horizontalAlign: "right",
              floating: true,
              offsetY: 0,
              offsetX: -5,
              show: false,
              
            },
            tooltip: {
              enabled: true,
              theme: 'light',
              enabledOnSeries: undefined,
              shared: false,
              followCursor: false,
              intersect: false,
              inverseOrder: false,
              custom: undefined,
              fillSeriesColor: false,
              x: { format: "dd MMM yyyy" },
            }
          };
        }
    } 

  getPlants(regions: any, countries: any, states: any) {
    this.plantsId = ""
    this.allPlantsList = []
    this.allInchargeList = []
    this.allRegionList=[]
    let regionsPredicateQuery = "*"
    let countriesPredicateQuery = "*"
    let statesPredicateQuery = "*"
    let plantPredicateQuery = "*"
    let inchrgesPredicateQuery = "*"
    let regionsPredicateList = [];
    let inchargePredicateList = [];
    let countriesPredicateList = [];
    let statesPredicateList = [];
    let plantsPredicateList = [];
    if (regions != undefined && regions.length > 0) {
      regions.forEach(uuid => {
        regionsPredicateList.push("uuid=" + "'" + uuid.uuid + "'");
      })
      regionsPredicateQuery = regionsPredicateList.join(" or ");
    }
    if (countries != undefined && countries.length > 0) {
      countries.forEach(uuid => {
        countriesPredicateList.push("uuid=" + "'" + uuid.uuid + "'");
        countriesPredicateQuery = countriesPredicateList.join(" or ");
      })
    }
    if (states != undefined && states.length > 0) {
      states.forEach(uuid => {
        statesPredicateList.push("uuid=" + "'" + uuid.uuid + "'");
        statesPredicateQuery = statesPredicateList.join(" or ");
      })
    }
    // let arrayData2: any = []
    // if (countries === undefined) {
    //   arrayData2 = jsonata("data[" + regionsPredicateQuery + "].countries").evaluate(this.jsonData)
    //   if (arrayData2 != null) {
    //     if (arrayData2.length) {
    //       this.allCountryList = arrayData2
    //     }
    //     else {
    //       this.allCountryList.push(arrayData2)
    //     }
    //   }
    // }
    let arrayData: any = []
    arrayData = jsonata("data[" + regionsPredicateQuery + "].countries[" + countriesPredicateQuery + "].states[" + statesPredicateQuery + "].plants").evaluate(this.jsonData)
    if (arrayData != null) {
      this.allPlantsList = arrayData
      this.allPlantsList.forEach(id => {
          if(this.plantsId==undefined || this.plantsId==null||this.plantsId=='')
                    {
                      this.plantsId=id.uuid
                    }
                    else{
                      this.plantsId=this.plantsId+","+id.uuid
                    }
      })
    }
    if (this.allPlantsList.length > 0) {
      this.allPlantsList.forEach(id => {
        plantsPredicateList.push("uuid=" + "'" + id.uuid + "'");
        plantPredicateQuery = plantsPredicateList.join(" or ");
        inchargePredicateList.push("name=" + "'" + id.incharges.name + "'");
        inchrgesPredicateQuery = inchargePredicateList.join(" or ");
      })
    let regionData:any=[];
    regionData=jsonata("data[*]").evaluate(this.jsonData);
    if (regionData != null) {
      if (regionData.length) {
        this.allRegionList = regionData
      }
      else {
        this.allRegionList.push(regionData)
      }
    }
      let arrayData1: any = []
      let arrayInchargeData:any=[]
      arrayInchargeData = jsonata("data[" + regionsPredicateQuery + "].countries[" + countriesPredicateQuery + "].states[" + statesPredicateQuery + "].plants[" + plantPredicateQuery + "].incharges").evaluate(this.jsonData)
     let newData = Array.isArray(arrayInchargeData) ? arrayInchargeData : [arrayInchargeData];
      arrayData1 = _.sortedUniqBy(newData, (o) => {
        return o.name;
      })
      if (arrayData1 != null) {
        if (arrayData1.length) {

          this.allInchargeList = arrayData1
        }
        else {
          this.allInchargeList.push(arrayData1)
        } 
      }
    } 
    this.getavgUptimeData();
    this.getavgSoilingData();
    this.getBotStatus();
    this.getAllSummary(); 
    this.childNotifier.next(this.plantsId);
    this.allPlantsId = this.plantsId;
  }

  getCountry(regions) {
    this.allPlants.reset()
    this.allIncharge.reset()
    this.allSelected=false
    this.allSelected1=false
    if (regions[0] != null) {
      this.region = regions
      this.allCountryList = []
      let regionsPredicateQuery = '*';
      let regionsPredicateList = [];
      regions.forEach(uuid => {
        regionsPredicateList.push("uuid=" + "'" + uuid.uuid + "'");
      })
      if (regionsPredicateList.length > 0) {
        regionsPredicateQuery = regionsPredicateList.join(" or ");
      }
      let arrayData: any = []
      arrayData = jsonata("data[" + regionsPredicateQuery + "].countries").evaluate(this.jsonData)
      if (arrayData != null) {
        this.allCountryList = arrayData
      }
    }
    else {
      this.allCountryList = []
      this.region = []
      this.allSelected3 = false
      this.allCountry1=false 
    }
    if(this.allselectedregionstatus.selected){
      if(this.allRegionList.length==regions.length)
      {
        this.getPlants(this.region)
      }
    }else if(this.allselectedregionstatus.disselected){
      if(this.allRegionList.length==0)
      {
        this.getPlants(this.region)
      }
    }
    else{
      this.getPlants(this.region)
    }
    this.allselectedregionstatus.selected=false
    this.allselectedregionstatus.disselected=false
  }
  getState(country) {
    this.allPlants.reset()
    this.allIncharge.reset()
    this.allSelected=false
    this.allSelected1=false
    
    if (this.allStateList.length == 0) {
      this.allSelected4 = ''
    }
    if (country[0] != null) {
      this.country = country
      this.allStateList = []
      this.country = country
      let statesPredicateQuery = '*';
      let statesPredicateList = [];
      let countriesPredicateList =[];
      let countriesPredicateQuery="*";

      country.forEach(id => {
        countriesPredicateList.push(id.name);
      })
      if (countriesPredicateList.length > 0) {
        countriesPredicateQuery = countriesPredicateList.join(" or ");
      } 
      country.forEach(uuid => {
        statesPredicateList.push("uuid=" + "'" + uuid.uuid + "'");
      })
      if (statesPredicateList.length > 0) {
        statesPredicateQuery = statesPredicateList.join(" or ");
      }
      let arrayData: any = []
      arrayData = jsonata("data[*].countries[" + statesPredicateQuery + "].states").evaluate(this.jsonData)
      if (arrayData != null) {
        this.allStateList = arrayData
      }
    }
    else {
      this.allRegionList=[]
      this.allStateList = []
      this.country = []
    }
    if(this.allselectedcountrystatus.selected){
      if(this.allCountryList.length==country.length)
      {
        this.getPlants(this.region, this.country)
      }
    }else if(this.allselectedcountrystatus.disselected){
      if(this.allCountryList.length==0)
      {
        this.getPlants(this.region, this.country)
      }
    }
    else{
      this.getPlants(this.region, this.country)
    }
    this.allselectedcountrystatus.selected=false
    this.allselectedcountrystatus.disselected=false
  }
  getPlant(states) {
    this.allPlants.reset()
    this.allIncharge.reset()
    this.allSelected=false
    this.allSelected1=false
    
    if (states[0] != null) {
      this.state = states
      this.allPlantsList = []
    }
    else {
      this.allPlantsList = []
      this.state = []
    }
    if(this.allselectedstatestatus.selected){

      if(this.allStateList.length==states.length)
      {
        this.getPlants(this.region, this.country, states)
      }
    }else if(this.allselectedstatestatus.disselected){
      if(this.allStateList.length==0)
      {
        this.getPlants(this.region, this.country, states)
      }
    }
    else{
      this.getPlants(this.region, this.country, states)
    }
    this.allselectedstatestatus.selected=false
    this.allselectedstatestatus.disselected=false
  }
  getIncharge(plants: any) {
      this.plantsId = ""
      if(plants.length == 0 ){
        this.allPlantsList.forEach(id=> {
         
          if(this.plantsId==undefined || this.plantsId==null||this.plantsId=='')
          {
            this.plantsId=id.uuid
          }
          else{
            
            this.plantsId=this.plantsId+","+id.uuid
          }
      }) 
      }
        if(plants[0]!=null){
        
          this.allInchargeList=[]
          let inchargePredicateQuery = '*';
            let  inchargePredicateList = [];
            plants.forEach(id=> {
              inchargePredicateList.push("uuid=" + "'" + id.uuid + "'");
            })
            if(inchargePredicateList.length > 0) {
              inchargePredicateQuery = inchargePredicateList.join(" or ");    
            }      
            let arrayData:any=[]  
      let arrayData1: any = []
      arrayData = jsonata("data[*].countries[*].states[*].plants[" + inchargePredicateQuery + "].incharges").evaluate(this.jsonData)
      let newData = Array.isArray(arrayData) ? arrayData : [arrayData];
      arrayData1 = _.sortedUniqBy(newData, (o) => {
        return o.name;
      })
      if (newData.length) {
        this.allInchargeList = arrayData1
      }
      else {
        this.allInchargeList.push(arrayData1)
      }
    }
    else { 
      this.allSelected1=false
      this.select1 = false
    }
        plants.forEach(id=> {
         
            if(this.plantsId==undefined || this.plantsId==null||this.plantsId=='')
            {
              this.plantsId=id.uuid
            }
            else{
              
              this.plantsId=this.plantsId+","+id.uuid
            }
        })
      if(this.allselectedplantstatus.selected){
        if(this.allPlantsList.length==plants.length){
          this.getavgUptimeData();
          this.getavgSoilingData();
          this.getBotStatus();
          this.getAllSummary(); 
          this.childNotifier.next(this.plantsId);
        } 
      }else if(this.allselectedplantstatus.disselected){ 
      }else{
        this.getavgUptimeData();
        this.getavgSoilingData();
        this.getBotStatus();
        this.getAllSummary(); 
        this.childNotifier.next(this.plantsId);
      }
      this.allselectedplantstatus.selected=false
      this.allselectedplantstatus.disselected=false
    }
    foods: Food[] = [
        { value: 'steak-0', viewValue: 'Steak' },
        { value: 'pizza-1', viewValue: 'Pizza' },
        { value: 'tacos-2', viewValue: 'Tacos' },
    ];
    getReport(){
        this.router.navigate(['/front/report']);
    }
    openDialog() {
        const dialogRef = this.dialog.open(DialogContentExampleDialog);

    dialogRef.afterClosed().subscribe((result: any) => { 
    });
  }

  btnClick(status: any) {
    if (status == 'overview') { 
      this.overview = true;
      this.heatmap = false; 
      this.childNotifier.next(this.plantsId);
    } else if (status == 'heatmap') {
      this.overview = false;
      this.heatmap = true;   
      this.childNotifier.next(this.plantsId);
  } 
  }

}

@Component({
  selector: 'dialog-content-example-dialog',
  templateUrl: 'dialog-content-example-dialog.html',
})

export class DialogContentExampleDialog { }

