//@ts-nocheck
import { Component, ElementRef, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatOption } from '@angular/material/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
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
import { Subject } from 'rxjs';
import { DataService } from '../../../data.service';
import * as _ from 'lodash';

export type ChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  labels: string[];
  plotOptions: ApexPlotOptions;
  stroke: any; // ApexStroke;
  fill: ApexFill;

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
  annotation:ApexAnnotations;
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
  annotation:ApexAnnotations;
}; 

@Component({
  selector: 'app-renewSolarForm',
  templateUrl: './renewSolarForm.component.html',
  styleUrls: ['./renewSolarForm.component.scss']
})
export class RenewSolarFormComponent implements OnInit {
  plants: any;
  country:any;
  state:any;
  region:any;
  incharge:any;
  calendar :any; 
  count: any; 
  cleaningData: any
  knuData: any
  uptimeData: any
  soilingData: any
  botStatusData: any
  summeryData: any
  plantsId: any
  type: any
  avgUptime: any;
  uptimeSeries: any = [];
  uptimeXaxis: any = [];
  avgsoiling: any;
  soilingSeries: any = [];
  soilingXaxis: any = [];
  botStatus: any;
  totalBotStatus: any = [];
  allDataSummary: any;
  plantsId: string;
  botStatusArray: any = []
  allAvgUptime: any = [];
  allAvgSoilloss: any = []; 
  startDate:any
  endDate:any
  uptimeColors:any
  soilingLoassColors:any
  uptimeStrok:any
  soilingStrok:any
  uptimeMarker:any
  soilingMarkers:any
  maxDate=new Date()
  dateForm :any
  reset() {
    this.endDate=moment().format("DD-MM-YYYY")
    this.startDate=moment().subtract(7, 'days').format("DD-MM-YYYY")  
    this.calendar = "7";
  }

  @ViewChild("chart") chart: ChartComponent;
  public chartOptions5: Partial<ChartOptions5> | any;
  public chartOptions6: Partial<ChartOptions6> | any;
  public chartOptions7: Partial<ChartOptions> | any;

  startDatechildNotifier: Subject<any> = new Subject<any>(); 
  endDatechildNotifier: Subject<any> = new Subject<any>();
  constructor(public dialog: MatDialog, private route: ActivatedRoute,private router: Router, private service: DataService) {

    this.route.paramMap.subscribe(params => {
      this.plants = params.get('name');
      this.plantsId = params.get('id');
      this.type = params.get('flag'); 
      this.country =params.get('country');
      this.state = params.get('state');
      this.region = params.get('region');
      this.incharge = params.get('incharge');
      this.startDate=params.get('startDate');
      this.endDate=params.get('endDate');    
      this.calendar=params.get('dayFilter') 
    });
  }
  ngOnInit() {
    if(this.calendar == 'undefined'){
      this.calendar = '7'
    }
 
    let startDate :any =moment(this.startDate,'DD-MM-YYYY').format('MM-DD-YYYY')
    let endDate :any =moment(this.endDate,'DD-MM-YYYY').format('MM-DD-YYYY')
    let sdate:any = moment(startDate).format()
    let edate:any = moment(endDate).format()
    this.dateForm = new FormGroup({
      start: new FormControl(sdate),
      end: new FormControl(edate),
    }); 
    this.startDatechildNotifier.next(this.startDate); 
    this.endDatechildNotifier.next(this.endDate);
    this.getavgUptimeData();
    this.getavgSoilingData();
    this.getBotStatus();
    this.service.getSummary1( this.plantsId,this.startDate,this.endDate).subscribe(res => {
      this.summeryData = res;
    })

    this.service.getCleaningSchedule1(this.plantsId,this.startDate,this.endDate).subscribe(res => {
      this.cleaningData = res.data;
    })
  }
  selectedDate(days){
    if(days != "custom"){ 
      this.endDate=moment().format("DD-MM-YYYY")
      this.startDate=moment().subtract(days, 'days').format("DD-MM-YYYY") 
      this.startDatechildNotifier.next(this.startDate); 
      this.endDatechildNotifier.next(this.endDate);
      this.allAPIDate() 
    }
  } 
  selectedCustomDateStart(days){ 
    this.startDate=moment(days.value).format("DD-MM-YYYY") 
    this.startDatechildNotifier.next(this.startDate);
      this.allAPIDate() 
    }
  selectedCustomDateEnd(days){
    this.endDate=moment(days.value).format("DD-MM-YYYY")
    this.startDatechildNotifier.next(this.startDate); 
    this.endDatechildNotifier.next(this.endDate);
    this.allAPIDate() 
    }

    allAPIDate(){  
      this.getavgUptimeData();
      this.getavgSoilingData();
      this.getBotStatus();
      this.service.getSummary1(this.plantsId,this.startDate,this.endDate).subscribe(res => {
        this.summeryData = res;
      })
      this.service.getCleaningSchedule1(this.plantsId,this.startDate,this.endDate).subscribe(res => {
        this.cleaningData = res.data;
      })
    }

  getavgUptimeData() {  
    this.avgUptime = []
    this.uptimeSeries = []
    this.uptimeXaxis = []
    this.allAvgUptime = [] 
    this.service.getuptimedata1(this.plantsId,this.startDate,this.endDate).subscribe(res => {
      this.avgUptime = res;
      if(this.avgUptime.data[0].series){ 
      let threasholdVal: any = this.avgUptime.data[0].threshold;
      let newData: any = this.avgUptime.data[0].series

      let uptimeData = _.filter(newData, { 'name': "With AMC" })[0];
      let uptimeDataWo = _.filter(newData, { 'name': "Without AMC" })[0];

      if (uptimeData && this.type == uptimeData.name) {
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
      } else {
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

      /* let threashold: any = [];
      for (let i = 0; i < this.uptimeSeries[0].data.length; i++) {
        threashold.push(threasholdVal)
      }
      this.uptimeSeries.push({
        name: "",
        data: threashold,
        type: "line"
      }) */
      let sum: number = 0
      let sum1: number = 0
      if (uptimeData && this.type == uptimeData.name) {
        for (let i = 0; i < uptimeData.data.length; i++) {
          sum = sum + parseFloat(uptimeData.data[i])
        }
        let avg = parseFloat(sum / uptimeData.data.length).toFixed(2)
        this.allAvgUptime.push({
          name: uptimeData.name,
          average: avg
        },
        )

      } else {
        for (let i = 0; i < uptimeDataWo.data.length; i++) {
          sum1 = sum1 + parseFloat(uptimeDataWo.data[i])
        }
        let avg1 = parseFloat(sum1 / uptimeDataWo.data.length).toFixed(2)
        this.allAvgUptime.push({
          name: uptimeDataWo.name,
          average: avg1
        },
        )
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
      this.chartOptions6={}
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
      this.avgsoiling = res;
      if(this.avgsoiling.data[0].series){ 
      let avgsoiling: any = this.avgsoiling.data[0];
      let threasholdVal : any = this.avgsoiling.data[0].threshold;
      let newData: any = this.avgsoiling.data[0].series

      let  soilingData = _.filter(newData, { 'name': "With AMC" })[0];
      let soilingDataWo = _.filter(newData, { 'name': "Without AMC" })[0];
      
      if (soilingData && this.type == soilingData.name) {
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
      } else {
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
     
   /*  let threashold:any=[];
    for(let i=0; i < this.soilingSeries[0].data.length;i++){
          threashold.push(threasholdVal)
    }
    this.soilingSeries.push({
      name:  "",
      data: threashold,
      type: "line"
    }) */
 
    let sum: number = 0

    let sum1: number = 0
    if (soilingData && this.type == soilingData.name) {
      for (let i = 0; i < soilingData.data.length; i++) {
        sum = sum + parseFloat(soilingData.data[i])
      }
      let avg = parseFloat(sum / soilingData.data.length).toFixed(2)
      this.allAvgSoilloss.push({
        name: soilingData.name,
        average: avg
      },)
    } else {
      for (let i = 0; i < soilingDataWo.data.length; i++) {
        sum1 = sum1 + parseFloat(soilingDataWo.data[i])
      }
      let avg1 = parseFloat(sum1 / soilingDataWo.data.length).toFixed(2)
      this.allAvgSoilloss.push({
        name: soilingDataWo.name,
        average: avg1
      },
      )
    }
      let data: any = this.avgsoiling.data[0]
      let data1: any = data['x-axis'];
      console.log("allAvgSoilloss",this.allAvgSoilloss)
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
      this.chartOptions5={}
    } 
  })
  }
  getBotStatus() { 
    this.botStatus = []
    this.service.getBotStatus1(this.plantsId,this.startDate,this.endDate).subscribe(res => {
      this.botStatus = res.data;
      this.getSortedBotData();
    })

  }
  getSortedBotData() {
    this.totalBotStatus = []
    let healthyBots: any;
    let unhealthyBots: any;
    let total: any;
    let data: any = this.botStatus
    let  botDataw = _.filter(data, { 'type': "With AMC" })[0];
    let botDataWo = _.filter(data, { 'type': "Without AMC" })[0];
    let per:any
    if ( this.type == botDataw.type) {
      let dataObj: any = botDataw
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
        healthy: healthyBots,
        unhealthy: unhealthyBots,
        total: total
      })
      this.totalBotStatus.push(per)
    } else {
      let dataObj: any = botDataWo
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
    /*   total = +healthyBots + +unhealthyBots
      let per = healthyBots * 100 / total */
      this.botStatusArray.push({
        healthy: healthyBots,
        unhealthy: unhealthyBots,
        total: total
      })
      this.totalBotStatus.push(per)
      
    }
   

    
    for (let i = 0; i < data.length; i++) {
      
    }
    if(this.totalBotStatus.length  > 0){
      setTimeout(() => this.myCharts(), 2000)
      // this.myCharts(); 
    }
  }

  myCharts() {
    this.chartOptions7 = {
      series: [this.totalBotStatus[0]],
      color: '#000000',
      chart: {
        height: 340,
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
            size: "70%",
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
if(this.allAvgSoilloss.length > 0){
  if (this.type == "Without AMC") {
    let textData :any = this.allAvgSoilloss[0]

      this.chartOptions5 = {
        annotations: {
          yaxis: [
            {
              y: this.avgsoiling.data[0].threshold, 
              borderColor: '#000000',
              strokeDashArray: 2,
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
        series: this.soilingSeries,
        chart: {
          height: 300,
          type: "line",
          toolbar: {
            show: true
          }
        },
        stroke: {
          width: [2, 1],
          curve: 'smooth',
          dashArray: [0, 8]
        },
        title: {
          text: undefined,/* textData.average+"%", */
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
              let cat = parseFloat(categories).toFixed(2)
               if(cat == 0.50){
                 let lab = parseFloat(categories).toFixed(2)+ '%' 
                return lab
              }else{ 
                return  parseFloat(categories).toFixed(2) + '%'
              }
              }
          },
        },

        colors: [
          "#6F6BF4",
          "#2D3047"
        ],

        grid: {
          yaxis: {
            lines: {
              show: false
            }
          }
        },
        markers: {
          size: [3, 0],
          colors: undefined,
          strokeColors: ['#6F6BF4', undefined],
        },
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

    } else {
    let textData :any = this.allAvgSoilloss[0]
      this.chartOptions5 = {
        annotations: {
          yaxis: [
            {
              y: this.avgsoiling.data[0].threshold, 
              borderColor: '#000000',
              strokeDashArray: 2,
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
        series: this.soilingSeries,
        chart: {
          height: 300,
          type: "line",
          toolbar: {
            show: true
          }
        },
        stroke: {
          width: [3, 1],
          curve: 'smooth',
          dashArray: [0, 8]
        },
        title: {
          text: /* textData.average+ "%", */undefined,
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
              let cat = parseFloat(categories).toFixed(2)
               if(cat == 0.50){
                 let lab = parseFloat(categories).toFixed(2)+ '%' 
                return lab
              }else{ 
                return  parseFloat(categories).toFixed(2) + '%'
              }
              }
          },
        },
        colors: [
          "#F68D5D80",
          "#2D3047"
        ],

        grid: {
          yaxis: {
            lines: {
              show: false
            }
          }
        },
        markers: {
          size: [0, 0],
          colors: undefined,
          strokeColors: [undefined, undefined],
        },
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
}
    //Mixed Chart

    //Two Line Chart
if(this.allAvgUptime.length > 0 ){
  if (this.type == "Without AMC") {
    let textData :any = this.allAvgUptime[0]
      this.chartOptions6 = {
        annotations: {
          yaxis: [
            {
              y: this.avgUptime.data[0].threshold, 
              borderColor: '#000000',
              strokeDashArray: 2,
              textAnchor: 'start',
              label: { 
                text: "Threshold Value : "+this.avgUptime.data[0].threshold,
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
        colors: ["#6F6BF480", "#2D3047"],
        dataLabels: {
          enabled: false
        },
        stroke: {
          width: [2, 1],
          curve: "smooth",
          dashArray: [0, 8]
        },
        title: {
           text: /* textData.average+"%", */undefined,
          align: "left"
        },

        markers: {
          size: [3, 0],
          colors: undefined,
          strokeColors: ["#6F6BF480", "#000000"],
          strokeWidth: 2,
          strokeOpacity: 0.9,
          strokeDashArray: 0,
          fillOpacity: 1,
          showNullDataPoints: true,
          hover: {
            size: undefined,
            sizeOffset: 3
          }
        },
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
          max:100,
          min:0,
          // categories: [94, 95, 96, 97, 98, 99, 100],
          decimalsInFloat: false,
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
            formatter: (categories: any) => { return  parseFloat(categories).toFixed(0) + '%' },
          },
        },
        legend: {
          position: "top",
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
    } else {
    let textData :any = this.allAvgUptime[0]
      this.chartOptions6 = {
        annotations: {
          yaxis: [
            {
              y: this.avgUptime.data[0].threshold, 
              borderColor: '#000000',
              strokeDashArray: 2,
              textAnchor: 'start',
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
        colors: ["#F68D5D80", "#2D3047"],
        dataLabels: {
          enabled: false
        },
        stroke: {
          width: [2, 1],
          curve: "smooth",
          dashArray: [0, 8]
        },
        title: {
           text:undefined,/* textData.average+"%", */
          align: "left"
        },

        markers: {
          size: [3, 0],
          colors: undefined,
          strokeColors: ["#F68D5D80", "#000000"],
          strokeWidth: 2,
          strokeOpacity: 0.9,
          strokeDashArray: 0,
          fillOpacity: 1,
          showNullDataPoints: true,
          hover: {
            size: undefined,
            sizeOffset: 3
          }
        },
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
          max:100,
          min:0,
          // categories: [94, 95, 96, 97, 98, 99, 100],
          decimalsInFloat: false,
          max: 100,
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
            formatter: (categories: any) => { return  parseFloat(categories).toFixed(0) + '%' },
          },
        },
        legend: {
          position: "top",
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
  }
  foods: Food[] = [
    { value: 'steak-0', viewValue: 'Steak' },
    { value: 'pizza-1', viewValue: 'Pizza' },
    { value: 'tacos-2', viewValue: 'Tacos' },
  ];
  getReport(){
    this.router.navigate(['/front/report']);
}
  // openDialog() {
  //     const dialogRef = this.dialog.open(DialogContentExampleDialog);

  //     dialogRef.afterClosed().subscribe((result: any) => {
  //         console.log(`Dialog result: ${result}`);
  //     });
  // }

}

// @Component({
//     selector: 'dialog-content-example-dialog',
//     templateUrl: 'dialog-content-example-dialog.html',
// })

// export class DialogContentExampleDialog { }

