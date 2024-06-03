//@ts-nocheck
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { FormBuilder, Validators } from '@angular/forms'
import * as Highcharts from 'highcharts';
import HC_serieslabel from 'highcharts/modules/series-label';
import * as moment from 'moment'
import * as _ from 'lodash';
var jsonata = require('jsonata');
// import HC_export_data from 'highcharts/modules/export-data';
// import HC_export_access from 'highcharts/modules/accessibility';
HC_serieslabel(Highcharts);
// HC_export_data(Highcharts);
// HC_export_access(Highcharts);

import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexFill,
  ApexTooltip,
  ApexXAxis,
  ApexLegend,
  ApexDataLabels,
  ApexTitleSubtitle,
  ApexYAxis
} from "ng-apexcharts";
import { type } from 'os';
import { ActivatedRoute } from '@angular/router';
import { OembcuService } from '../../../services/oem/oem-bcu.serivce';
import { PlantServiceService } from '../../../services/plants/plant-service.service';
import { listenerCount } from 'process';
import { MatPaginator } from '@angular/material/paginator';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  markers: any; //ApexMarkers;
  stroke: any; //ApexStroke;
  yaxis: ApexYAxis | ApexYAxis[];
  dataLabels: ApexDataLabels;
  title: ApexTitleSubtitle;
  legend: ApexLegend;
  fill: ApexFill;
  tooltip: ApexTooltip;
};
export type ChartOptions1 = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  markers: any; //ApexMarkers;
  stroke: any; //ApexStroke;
  yaxis: ApexYAxis | ApexYAxis[];
  dataLabels: ApexDataLabels;
  title: ApexTitleSubtitle;
  legend: ApexLegend;
  fill: ApexFill;
  tooltip: ApexTooltip;
};
export type ChartOptions2 = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  markers: any; //ApexMarkers;
  stroke: any; //ApexStroke;
  yaxis: ApexYAxis | ApexYAxis[];
  dataLabels: ApexDataLabels;
  title: ApexTitleSubtitle;
  legend: ApexLegend;
  fill: ApexFill;
  tooltip: ApexTooltip;
};
export type ChartOptionsMotorCurrent = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  markers: any; //ApexMarkers;
  stroke: any; //ApexStroke;
  yaxis: ApexYAxis | ApexYAxis[];
  dataLabels: ApexDataLabels;
  title: ApexTitleSubtitle;
  legend: ApexLegend;
  fill: ApexFill;
  tooltip: ApexTooltip;
};
export type ChartOptionsBrushCurrent = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  markers: any; //ApexMarkers;
  stroke: any; //ApexStroke;
  yaxis: ApexYAxis | ApexYAxis[];
  dataLabels: ApexDataLabels;
  title: ApexTitleSubtitle;
  legend: ApexLegend;
  fill: ApexFill;
  tooltip: ApexTooltip;
};
export type ChartOptionsMotor_Brush_Temp = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  markers: any; //ApexMarkers;
  stroke: any; //ApexStroke;
  yaxis: ApexYAxis | ApexYAxis[];
  dataLabels: ApexDataLabels;
  title: ApexTitleSubtitle;
  legend: ApexLegend;
  fill: ApexFill;
  tooltip: ApexTooltip;
};
export interface PeriodicElement {
  ticket_id: string;
  ncu_id: string;
  date: string;
  time: string;
  component: string;
  description: string;
  expected_tat: string;
}

export interface PeriodicElement2 {
  component: string;
  uom: string;
  minimum: string;
  maximum: string;
  instantaneous: string;
  avgerage: string;
}
export interface PeriodicElement1 {
  ticket_id: string;
  ncu_id: string;
  date: string;
  time: string;
  component: string;
  description: string;
  expected_tat: string;
}
const ELEMENT_DATA: PeriodicElement[] = []
const ELEMENT_DATA1: PeriodicElement1[] = [
  // { ticket_id: 'BOT 10001', ncu_id: 'ncu_10001', date: '15 feb-2022', time: '07:35:45', component: 'Brush', description: 'low', expected_tat: '12hrs', },
  // { ticket_id: 'BOT 10002', ncu_id: 'ncu_10001', date: '16 feb-2022', time: '07:35:45', component: 'Brush', description: 'low', expected_tat: '12hrs', },
  // { ticket_id: 'BOT 10003', ncu_id: 'ncu_10001', date: '17 feb-2022', time: '07:35:45', component: 'Brush', description: 'low', expected_tat: '12hrs', },
  // { ticket_id: 'BOT 10004', ncu_id: 'ncu_10001', date: '18 feb-2022', time: '07:35:45', component: 'Brush', description: 'low', expected_tat: '12hrs', },
  // { ticket_id: 'BOT 10005', ncu_id: 'ncu_10001', date: '19 feb-2022', time: '07:35:45', component: 'Brush', description: 'low', expected_tat: '12hrs', },
]
const ELEMENT_DATA2: PeriodicElement2[] = [
  // { component: 'Drive Motor 1 current', uom: 'ncu_10001', minimum: '15 feb-2022', maximum: '07:35:45', instantaneous: 'Brush', avgerage: '12hrs', },
  // { component: 'Drive Motor 1 current', uom: 'ncu_10001', minimum: '16 feb-2022', maximum: '07:35:45', instantaneous: 'Brush', avgerage: '12hrs', },
  // { component: 'Drive Motor 1 current', uom: 'ncu_10001', minimum: '17 feb-2022', maximum: '07:35:45', instantaneous: 'Brush', avgerage: '12hrs', },
  // { component: 'Drive Motor 1 current', uom: 'ncu_10001', minimum: '18 feb-2022', maximum: '07:35:45', instantaneous: 'Brush', avgerage: '12hrs', },
  // { component: 'Drive Motor 1 current', uom: 'ncu_10001', minimum: '19 feb-2022', maximum: '07:35:45', instantaneous: 'Brush', avgerage: '12hrs', },
  // { component: 'Battery Voltage' },
  // { component: 'Battery Temperature' },
  // { component: 'PCB 1 Temperature' },
  // { component: 'PCB 2 Temperature' },
]
@Component({
  selector: 'app-bcu',
  templateUrl: './bcu.component.html',
  styleUrls: ['./bcu.component.scss']
})
export class BcuComponent implements OnInit {
  bucketlist: any = [];
  Highcharts: typeof Highcharts = Highcharts;
  displayedColumns1: string[] = ['ticket_id', 'ncu_id', 'date', 'time', 'component', 'description', 'expected_tat'];
  dataSource1 :any = new MatTableDataSource();
  displayedColumns: string[] = ['ticketid', 'ncuid', 'date', 'time', 'component', 'description', 'expectedtat'];
  dataSource :any = new MatTableDataSource();
  displayedColumns2: string[] = ['component', 'uom', 'minimum', 'maximum', 'instantaneous', 'avgerage',];
  dataSource2 :any = new MatTableDataSource();

  @ViewChild("chart") chart: ChartComponent;
  public chartOptions: Partial<ChartOptions> | any;
  public chartOptions1: Partial<ChartOptions1> | any;
  public chartOptions2: Partial<ChartOptions2> | any;
  public chartOptionsMotorCurrent: Partial<ChartOptionsMotorCurrent> | any;
  public chartOptionsBrushCurrent: Partial<ChartOptionsBrushCurrent> | any;
  paramaterType: any
  bcuSummary: any
  visible: boolean = false
  sixHourVisible: boolean = false
  brushcurrentData: any
  brushBucketList: any = []
  temperatureBucketList: any = []
  tempVoltageBucketList: any = []
  currentSocBucketList: any = []
  pcbBucketlist: any = []
  ncuId: any
  bcuId: any
  ncuList: any = []
  bcuList: any = []
  plantnewid:any=[]
  NcuBcuJsonId: any
  bcuForm: any
  allid: any
  ncu=''
  bcu=''
  ticketamount: any = 0
  motorCurrenData: any
  tempVoltageData: any
  socBatteryData: any
  pcbData: any
  temperatureData: any
  miny:any
  maxy:any
  motordays='1'
  brushdays='1'
  tempdays='1'
  voltagedays='1'
  socdays='1'
  pcbdays='1'
  startDate: any
  endDate: any
  pcbticketAmount:any
  public chartOptionsMotor_Brush_Temp: Partial<ChartOptionsMotor_Brush_Temp> | any;

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private _liveAnnouncer: LiveAnnouncer, private formBuilder: FormBuilder, private route: ActivatedRoute, private bcuService: OembcuService, private plantService: PlantServiceService) {
    this.route.params.subscribe(params => {
      this.paramaterType = params['type']
    })

  }

  ngOnInit(): void {
/*     this.endDate=moment().format("DD-MM-YYYY")
    this.startDate=moment().subtract(1, 'days').format("DD-MM-YYYY")   */
    this.allid = "&knu=&bcu="
    if(this.paramaterType) {
      let type='&type='+this.paramaterType +'&knu=aa080e19-4684-4cde-8e55-e2c09baf3f74&bcu=8482ef69-8d7d-4b46-adfe-751b7ebe0cb0'
      this.bcuAlarmDetails(type); 
    }else{
      this.bcuAlarmDetails(this.allid)
    }
   
    // this.bcuForm = this.formBuilder.group({
    //   ncuid: ['', Validators.required],
    //   bcuid: ['', Validators.required],
    // }); 
    this.plantService.getPlantHierachyData().subscribe(res => {
      this.NcuBcuJsonId = res
      this.getNcuBcuID(this.NcuBcuJsonId);
    })
   
    this.bcuSummryData(this.allid);

  }
  changeMotorbucket(event) {
    this.endDate = moment().format("DD-MM-YYYY")
    this.startDate = moment().subtract(event, 'days').format("DD-MM-YYYY")
    let dateparam = "&startdate=" + this.startDate + "&enddate=" + this.endDate
    this.MotorCurrentData(this.allid,dateparam);
  }
  changeBrushbucket(event) {
    this.endDate = moment().format("DD-MM-YYYY")
    this.startDate = moment().subtract(event, 'days').format("DD-MM-YYYY")
    let dateparam = "&startdate=" + this.startDate + "&enddate=" + this.endDate
    this.BrushCurrentData(this.allid, dateparam);
  }
  changeTemperaturebucket(event) {
    this.endDate = moment().format("DD-MM-YYYY")
    this.startDate = moment().subtract(event, 'days').format("DD-MM-YYYY")
    let dateparam = "&startdate=" + this.startDate + "&enddate=" + this.endDate
    this.TemperatureGraphData(this.allid,dateparam);
  }
  changeTempVoltageBucket(event) {
    this.endDate = moment().format("DD-MM-YYYY")
    this.startDate = moment().subtract(event, 'days').format("DD-MM-YYYY")
    let dateparam = "&startdate=" + this.startDate + "&enddate=" + this.endDate
    this.BatteryTempVoltageData(this.allid,dateparam);

  }
  changeCurrentSocBucket(event) {
    this.endDate = moment().format("DD-MM-YYYY")
    this.startDate = moment().subtract(event, 'days').format("DD-MM-YYYY")
    let dateparam = "&startdate=" + this.startDate + "&enddate=" + this.endDate
    this.BatteryCurrentSocData(this.allid,dateparam);
  }
  changePcbBucket(event) {
    this.endDate = moment().format("DD-MM-YYYY")
    this.startDate = moment().subtract(event, 'days').format("DD-MM-YYYY")
    let dateparam = "&startdate=" + this.startDate + "&enddate=" + this.endDate
    this.PcbTemperatureData(this.allid,dateparam);
  }
  bcuSummryData(id:any) {
    this.endDate = moment().format("DD-MM-YYYY")
    this.startDate = moment().subtract(1, 'days').format("DD-MM-YYYY")
   let dateparam = "&startdate=" + this.startDate + "&enddate=" + this.endDate
    this.bcuService.getBcuSummary(id).subscribe(res => {
      this.bcuSummary = res.data[0]
       if(res){
        this.MotorCurrentData(id,dateparam);
       }
     
    })
  }
  MotorCurrentData(id:any,date:any) {
    this.endDate = moment().format("DD-MM-YYYY")
    this.startDate = moment().subtract(1, 'days').format("DD-MM-YYYY")
   let dateparam = "&startdate=" + this.startDate + "&enddate=" + this.endDate
    this.bcuService.getBcuMotorCurrent(date, id).subscribe(res => {
      if(res){
        this.BrushCurrentData(id,dateparam);
       
      }
      this.motorCurrenData = res.data.series
      this.miny=res.data.threshold.y
     this.maxy=res.data.threshold.y2
      this.motorCurrentShow();
    })
  }
  BrushCurrentData(id:any , date:any) {
    this.endDate = moment().format("DD-MM-YYYY")
    this.startDate = moment().subtract(1, 'days').format("DD-MM-YYYY")
   let dateparam = "&startdate=" + this.startDate + "&enddate=" + this.endDate
    this.bcuService.getBcuBrushCurrent(date, id).subscribe(res => {
      this.brushcurrentData = res.series
      if(res){
        this.TemperatureGraphData(id,dateparam);
      }
      // for(let i=0 ;i <this.brushcurrentData[0].data.length-1 ;i++){
      //    if(i == 0){

      //    }else{
      //     //  console.log('jjjjj',this.brushcurrentData[0].data[i-1]=this.brushcurrentData[0].data[i])
      //      this.brushcurrentData[0].data[i-1]=this.brushcurrentData[0].data[i]
      //    }
      // }
      // console.log('fff',this.brushcurrentData[0].data.length)
      if (this.brushcurrentData[0].data.length < 20) {
        let value = this.brushcurrentData[0].data.length - 1
        if (value > 0) {
          this.ticketamount = value
        }
      } else {
        this.ticketamount = 19
      }
      this.brushShow();
    })


  }

  TemperatureGraphData(id:any,date:any) {
    this.endDate = moment().format("DD-MM-YYYY")
    this.startDate = moment().subtract(1, 'days').format("DD-MM-YYYY")
   let dateparam = "&startdate=" + this.startDate + "&enddate=" + this.endDate
    this.bcuService.getBcuTemperature(date, id).subscribe(res => {
      if(res){
        this.BatteryTempVoltageData(id,dateparam);
      }
      this.temperatureData = res.series
      this.temperatureShow();
    })
 
  }
  BatteryTempVoltageData(id:any,date:any) {
    this.endDate = moment().format("DD-MM-YYYY")
    this.startDate = moment().subtract(1, 'days').format("DD-MM-YYYY")
   let dateparam = "&startdate=" + this.startDate + "&enddate=" + this.endDate
    this.bcuService.getBatterytempVoltage(date, id).subscribe(res => {
      if(res){
        this.BatteryCurrentSocData(id,dateparam);
      }
      this.tempVoltageData = res.series
      this.tempVolShow();
    })
  }
  BatteryCurrentSocData(id:any,date:any) {
    this.endDate = moment().format("DD-MM-YYYY")
    this.startDate = moment().subtract(1, 'days').format("DD-MM-YYYY")
   let dateparam = "&startdate=" + this.startDate + "&enddate=" + this.endDate
    this.bcuService.getBatteryCurrentSoc(date, id).subscribe(res => {
      if(res){
        this.PcbTemperatureData(id,dateparam);
      }
      this.socBatteryData = res.series
      this.show()
    })
  }
  PcbTemperatureData(id:any,date:any) {
    this.endDate = moment().format("DD-MM-YYYY")
    this.startDate = moment().subtract(1, 'days').format("DD-MM-YYYY")
   let dateparam = "&startdate=" + this.startDate + "&enddate=" + this.endDate
    this.bcuService.getBcuPcbTemperature(date, id).subscribe(res => {

      this.pcbData = res.series
      if(this.pcbData[0].data.length >=20 || this.pcbData[1].data.length >=20){
        this.pcbticketAmount=19
      }else{
        if(this.pcbData[0].data.length+this.pcbData[1].data.length > 10 ){
          if(this.pcbData[0].data.length > this.pcbData[1].data.length){
            this.pcbticketAmount=this.pcbData[0].data.length
          }else if(this.pcbData[0].data.length < this.pcbData[1].data.length){
             this.pcbticketAmount=this.pcbData[1].data.length
          }
        }else{
        
            this.pcbticketAmount=this.pcbData[0].data.length+this.pcbData[1].data.length
  
      }
    }
      this.pcbshow();
    })
  }
  bcuAlarmDetails(id:any) {
    this.bcuService.getbcuAlarmDetails(id).subscribe(res => {
      this.dataSource= new MatTableDataSource(res.data);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator; 
    })
  }
  bcuNotificationDetails() {
    this.bcuService.getbcuNotificationDetails().subscribe(res => {

    })
  }
  bcuBotInstantaniousData() {
    this.bcuService.getbcuBotInstantaniousParameter().subscribe(res => {

    })
  }
  reset(){
    this.ncu='';
    this.bcu='';
    this.allid = ""
    this.bcuSummryData(this.allid);

  }
  temperatureShow() {
    this.chartOptionsMotor_Brush_Temp = {
      series:this.temperatureData,
      chart: {
        zoom: {
          enabled: true,
          type: 'y',
          autoScaleYaxis: false,
          zoomedArea: {
            fill: {
              color: '#808080',
              opacity: 0.4
            },
            stroke: {
              color: '#0D47A1',
              opacity: 0.4,
              width: 1
            }
          }
        },
        toolbar: {
          show: true,
        },
        height: 350,
        type: "line",
        stacked: false
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: 'smooth',
        // width: 2,
        width: [2, 2]
      },

      xaxis: {
        title: {
          text: "Time(HH:MM:SS)",
          style: {
            fontSize: '12px',
            fontWeight: undefined,
          }
        },
        labels: {
          // format: 'h:MM:s',
          formatter: function (value) {
            let oDate = new Date(value);
            return moment.unix(oDate).format("DD-MMM HH:mm:ss");
            // return ''+ oDate.getMonth()+ '-' + oDate.getHours() + ':' + oDate.getMinutes().toString().padStart(2, 0)+ ':' +oDate.getSeconds();
          },
        },
        tickAmount: 19,
        tickPlacement: 'between',
        datetimeUTC: false
      },
      grid: {
        padding: {
          left: 40,
        },
        xaxis: {
          lines: {
            show: true
          }
        },
        yaxis: {
          lines: {
            show: true
          }
        }
      },
      yaxis: [
        {
          axisTicks: {
            show: true
          },
          axisBorder: {
            show: true,
            color: "#008FFB"
          },
          labels: {
            offsetX: 28,
            style: {
              color: "#008FFB"
            }
          },
          title: {
            text: undefined,
            style: {
              color: "#008FFB"
            }
          },
          tooltip: {
            enabled: true
          }
        }
      ],
      tooltip: {
        fixed: {
          enabled: true,
          position: "topLeft", // topRight, topLeft, bottomRight, bottomLeft
          offsetY: 30,
          offsetX: 60
        }
      },
      legend: {
        offsetX: 0,
        offsetY: 0,
        position: 'top',
        horizontalAlign: 'center',
        markers: {
          width: 20,
          height: 6,
          radius: 0,
        },
      }
    };
  }
  pcbshow() {
    this.chartOptions = {
      series: this.pcbData,
      chart: {
        toolbar: {
          show: true,
        },
        height: 350,
        type: "line",
        stacked: false
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: 'smooth',
        width: [2, 2]
      },

      xaxis: {
        title: {
          text: "Time(HH:MM:SS)",
          style: {
            fontSize: '12px',
            fontWeight: undefined,
          }
        },
        labels: {
          // format: 'h:MM:s',
          formatter: function (value) {
            let oDate = new Date(value);
            return moment.unix(oDate).format("DD-MMM HH:mm:ss");
            // return ''+ oDate.getMonth()+ '-' + oDate.getHours() + ':' + oDate.getMinutes().toString().padStart(2, 0)+ ':' +oDate.getSeconds();
          },
        },
        tickAmount: this.pcbticketAmount,
        tickPlacement: 'between',
        datetimeUTC: false
      },
      grid: {
        padding: {
          left: 25,
        },
        xaxis: {
          lines: {
            show: true
          }
        },
        yaxis: {
          lines: {
            show: true
          }
        }
      },
      yaxis: [
        {
          axisTicks: {
            show: true
          },
          axisBorder: {
            show: true,
            color: "#008FFB"
          },
          labels: {
            offsetX: 13,
            style: {
              color: "#008FFB"
            }
          },
          title: {
            text: undefined,
            style: {
              color: "#008FFB"
            }
          },
          tooltip: {
            enabled: true
          }
        },
        {
          // seriesName: "Income",
          opposite: true,
          axisTicks: {
            show: true
          },
          axisBorder: {
            show: true,
            color: "#00E396"
          },
          labels: {
            style: {
              color: "#00E396"
            }
          },
          title: {
            text: undefined,
            style: {
              color: "#00E396"
            }
          }
        },
      ],
      tooltip: {
        fixed: {
          enabled: true,
          position: "topLeft", // topRight, topLeft, bottomRight, bottomLeft
          offsetY: 30,
          offsetX: 60
        }
      },
      legend: {
        offsetX: 0,
        offsetY: 0,
        position: 'top',
        horizontalAlign: 'center',
        markers: {
          width: 20,
          height: 6,
          radius: 0,
        },
      }
    };

  }
  motorCurrentShow() {
    if (this.motorCurrenData.length > 0) {
      this.chartOptionsMotorCurrent = {
        annotations: {
          yaxis: [
            {
              y: this.miny,
              y2: this.maxy,
              borderColor: '#000000',
              fillColor: '#808080',
              strokeDashArray: 0,
              label: {
                text: undefined
              }
            }
          ]
        },
        series: this.motorCurrenData,
        chart: {
          zoom: {
            enabled: true,
            type: 'x',
            autoScaleYaxis: false,
            zoomedArea: {
              fill: {
                color: '#808080',
                opacity: 0.4
              },
              stroke: {
                color: '#0D47A1',
                opacity: 0.4,
                width: 1
              }
            }
          },
          toolbar: {
            show: true,
          },
          height: 350,
          type: "line",
          stacked: false
        },

        dataLabels: {
          enabled: false
        },
        stroke: {
          curve: 'smooth',
          // width: 2,
          width: [2, 2, 2, 2, 2, 2, 2, 2]
        },

        xaxis: {
          title: {
            text: "Time(HH:MM:SS)",
            style: {
              fontSize: '12px',
              fontWeight: undefined,
            }
          },
          labels: {
            // format: 'h:MM:s',
            formatter: function (value) {
              let oDate = new Date(value);
              return moment.unix(oDate).format("DD-MMM HH:mm:ss");
              // return ''+ oDate.getMonth()+ '-' + oDate.getHours() + ':' + oDate.getMinutes().toString().padStart(2, 0)+ ':' +oDate.getSeconds();
            },
          },
          tickAmount: 19,
          tickPlacement: 'between',
          // datetimeUTC: false
        },
        grid: {
          padding: {
            left: 25,
          },
          xaxis: {
            lines: {
              show: true
            }
          },
          yaxis: {
            lines: {
              show: true
            }
          }
        },
        yaxis: [
          {
            axisTicks: {
              show: true
            },
            axisBorder: {
              show: true,
              color: "#008FFB"
            },
            labels: {
              offsetX: 13,
              style: {
                color: "#008FFB"
              }
            },
            title: {
              text: undefined,
              style: {
                color: "#008FFB"
              }
            },
            tooltip: {
              enabled: true
            }
          }
        ],
        tooltip: {
          fixed: {
            enabled: false,
            position: "topLeft", // topRight, topLeft, bottomRight, bottomLeft
            offsetY: 30,
            offsetX: 60
          }
        },
        legend: {
          offsetX: 0,
          offsetY: 0,
          position: 'top',
          horizontalAlign: 'center',
          markers: {
            width: 20,
            height: 6,
            radius: 0,
          },
        }
      };
    }
  }
  brushShow() {
    if (this.brushcurrentData.length > 0) {
      this.chartOptionsBrushCurrent = {
        series: this.brushcurrentData,
        chart: {
          // zoom: {
          //   enabled: true,
          //   type: 'y',
          //   autoScaleYaxis: false,
          //   zoomedArea: {
          //     fill: {
          //       color: '#808080',
          //       opacity: 0.4
          //     },
          //     stroke: {
          //       color: '#0D47A1',
          //       opacity: 0.4,
          //       width: 1
          //     }
          //   }
          // },
          toolbar: {
            show: true,
          },
          height: 350,
          type: "line",
          stacked: false
        },
        dataLabels: {
          enabled: false
        },
        stroke: {
          curve: 'smooth',
          // width: 2,
          width: [2, 2, 2, 2, 2, 2, 2, 2]
        },

        xaxis: {
          title: {
            text: "Time(HH:MM:SS)",
            style: {
              fontSize: '12px',
              fontWeight: undefined,
            }
          },
          labels: {
            // format: 'h:MM:s',
            formatter: function (value) {
              let oDate = new Date(value);
              return moment.unix(oDate).format("DD-MMM HH:mm:ss");
              // return ''+ oDate.getMonth()+ '-' + oDate.getHours() + ':' + oDate.getMinutes().toString().padStart(2, 0)+ ':' +oDate.getSeconds();
            },
          },
          tickAmount: this.ticketamount,
          tickPlacement: 'between',
          datetimeUTC: false
        },
        grid: {
          padding: {
            left: 25,
          },
          xaxis: {
            lines: {
              show: true
            }
          },
          yaxis: {
            lines: {
              show: true
            }
          }
        },
        yaxis: [
          {
           
            axisTicks: {
              show: true
            },
            axisBorder: {
              show: true,
              color: "#008FFB"
            },
            labels: {
              offsetX: 13,
              style: {
                color: "#008FFB"
              }
            },
            title: {
              text: undefined,
              style: {
                color: "#008FFB"
              }
            },
            tooltip: {
              enabled: true
            }
          }
        ],
        tooltip: {
          fixed: {
            enabled: true,
            position: "topLeft", // topRight, topLeft, bottomRight, bottomLeft
            offsetY: 30,
            offsetX: 60
          }
        },
        legend: {
          offsetX: 0,
          offsetY: 0,
          position: 'top',
          horizontalAlign: 'center',
          markers: {
            width: 20,
            height: 6,
            radius: 0,
          },
        }
      };
    }
  }
  tempVolShow() {
    if (this.tempVoltageData.length > 0) {
      this.chartOptions2 = {
        series: this.tempVoltageData,
        stroke: {
          curve: "smooth"
        },
        chart: {
          toolbar: {
            show: true,
          },
          height: 350,
          type: "line",
          stacked: false
        },
        dataLabels: {
          enabled: false
        },
        stroke: {
          curve: 'straight',
          // width: 2,
          width: [2, 2,]
        },

        xaxis: {
          title: {
            text: "Time(HH:MM:SS)",
            style: {
              fontSize: '12px',
              fontWeight: undefined,
            }
          },
          labels: {
            formatter: function (value) {
              let oDate = new Date(value);
              return moment.unix(oDate).format("DD-MMM HH:mm:ss");
              // return ''+ oDate.getMonth()+ '-' + oDate.getHours() + ':' + oDate.getMinutes().toString().padStart(2, 0)+ ':' +oDate.getSeconds();
            },
          },
          tickAmount: 19,
          tickPlacement: 'between',
          datetimeUTC: false
        },
        grid: {
          padding: {
            left: 25,
          },
          xaxis: {
            lines: {
              show: true
            }
          },
          yaxis: {
            lines: {
              show: true
            }
          }
        },
        yaxis: [
          {
            axisTicks: {
              show: true
            },
            axisBorder: {
              show: true,
              color: "#008FFB"
            },
            labels: {
              offsetX: 13,
              style: {
                color: "#008FFB"
              }
            },
            title: {
              text: undefined,
              style: {
                color: "#008FFB"
              }
            },
            tooltip: {
              enabled: true
            }
          },
          {
            // seriesName: "Income",
            opposite: true,
            axisTicks: {
              show: true
            },
            axisBorder: {
              show: true,
              color: "#00E396"
            },
            labels: {
              style: {
                color: "#00E396"
              }
            },
            title: {
              text: undefined,
              style: {
                color: "#00E396"
              }
            }
          },
        ],
        tooltip: {
          fixed: {
            enabled: true,
            position: "topLeft", // topRight, topLeft, bottomRight, bottomLeft
            offsetY: 30,
            offsetX: 60
          }
        },
        legend: {
          offsetX: 0,
          offsetY: 0,
          position: 'top',
          horizontalAlign: 'center',
          markers: {
            width: 20,
            height: 6,
            radius: 0,
          },
        }
      };
    }
  }
  show() {
    if (this.socBatteryData.length > 0) {
      this.chartOptions1 = {
        series: this.socBatteryData,
        chart: {
          toolbar: {
            show: true,
          },
          height: 350,
          type: "line",
          stacked: false
        },
        dataLabels: {
          enabled: false
        },
        stroke: {
          curve: 'smooth',
          width: [2, 2]
        },

        xaxis: {
          title: {
            text: "Time(HH:MM:SS)",
            style: {
              fontSize: '12px',
              fontWeight: undefined,
            }
          },
          labels: {
            formatter: function (value) {
              let oDate = new Date(value);
              return moment.unix(oDate).format("DD-MMM HH:mm:ss");
              // return ''+ oDate.getMonth()+ '-' + oDate.getHours() + ':' + oDate.getMinutes().toString().padStart(2, 0)+ ':' +oDate.getSeconds();
            },
          },
          tickAmount: 19,
          tickPlacement: 'between',
          datetimeUTC: false
        },
        grid: {
          padding: {
            left: 25,
          },
          xaxis: {
            lines: {
              show: true
            }
          },
          yaxis: {
            lines: {
              show: true
            }
          }
        },
        yaxis: [
          {
            axisTicks: {
              show: true
            },
            axisBorder: {
              show: true,
              color: "#008FFB"
            },
            labels: {
              offsetX: 13,
              style: {
                color: "#008FFB"
              }
            },
            title: {
              text: undefined,
              style: {
                color: "#008FFB"
              }
            },
            tooltip: {
              enabled: true
            }
          },
          {
            // seriesName: "Income",
            opposite: true,
            axisTicks: {
              show: true
            },
            axisBorder: {
              show: true,
              color: "#00E396"
            },
            labels: {
              style: {
                color: "#00E396"
              }
            },
            title: {
              text: undefined,
              style: {
                color: "#00E396"
              }
            }
          },
          // {
          //   seriesName: "Revenue",
          //   opposite: true,
          //   axisTicks: {
          //     show: true
          //   },
          //   axisBorder: {
          //     show: true,
          //     color: "#FEB019"
          //   },
          //   labels: {
          //     style: {
          //       color: "#FEB019"
          //     }
          //   },
          //   title: {
          //     text: "Revenue (thousand crores)",
          //     style: {
          //       color: "#FEB019"
          //     }
          //   }
          // }
        ],
        tooltip: {
          fixed: {
            enabled: true,
            position: "topLeft", // topRight, topLeft, bottomRight, bottomLeft
            offsetY: 30,
            offsetX: 60
          }
        },
        legend: {
          offsetX: 0,
          offsetY: 0,
          position: 'top',
          horizontalAlign: 'center',
          markers: {
            width: 20,
            height: 6,
            radius: 0,
          },
        }
      };
    }
  }
  getNcuBcuID(data: any) {
    let NcuData: any = []
    this.plantnewid = localStorage.getItem('plant').split(',')
    let plant:any = this.plantnewid[0] 
    let id = "id= '" + plant + "'"
    NcuData = jsonata("data[" + id + "].knu").evaluate(data);
    this.ncuId = ''
    let newData = Array.isArray(NcuData) ? NcuData : [NcuData];
    newData.forEach(element => {
      if (this.ncuId == undefined || this.ncuId == null || this.ncuId == '') {
        this.ncuList.push({
          name: element.name,
          id: element.id
        })
      }
    });
    // let bcuData: any = []
    // bcuData = jsonata("data[*].knu[*].status[*].bot").evaluate(data);
    // this.bcuId = ''
    // bcuData.forEach(element => {
    //   if (this.bcuId == undefined || this.bcuId == null || this.bcuId == '') {
    //     this.bcuList.push({
    //       name: element.name,
    //       id: element.id
    //     })
    //   }
    // });

  }
  selectNcuId(value: any) {
    this.bcuList = []
    let arrayData: any = []
    let knulistid= "id= '" + value + "'"
    this.ncuId = value
    // let knuPredicateQuery = '*';
    // value.forEach(id => {
    //   this.ncuId = id
    //   knulistid.push("id=" + "'" + id + "'");
    // })

    // if (knulistid.length > 0) {
    //   knuPredicateQuery = knulistid.join(" or ");
    // }
    arrayData = jsonata("data[*].knu[" + knulistid + "].status[*].bot").evaluate(this.NcuBcuJsonId)
    this.bcuId = ''
    let newData = Array.isArray(arrayData) ? arrayData : [arrayData];
    newData.forEach(element => {
      if (this.bcuId == undefined || this.bcuId == null || this.bcuId == '') {
        this.bcuList.push({
          name: element.name,
          id: element.id
        })
      }
    });

  }
  selectbcuId(event: any) {
    this.bcuId = event
    this.allid = ''
    this.allid = "&knu=" + this.ncuId + "&bcu=" + this.bcuId
    this.bcuSummryData(this.allid);
    this.bcuAlarmDetails(this.allid)
    // this.BrushCurrentData(this.allid);
  }


  ngAfterViewInit() {
   /*  this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator; */
  }
  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

}
