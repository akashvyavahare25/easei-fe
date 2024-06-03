//@ts-nocheck
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms'
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
declare var require: any;
var jsonata = require('jsonata');
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
  ApexAnnotations,
  ApexResponsive,
  ApexStates,
} from "ng-apexcharts";
var moment = require('moment');
import * as Highcharts from "highcharts";
import HC_timeLine from "highcharts/modules/timeline";
import { AbortDialogComponent } from '../abort-dialog/abort-dialog.component';
import { DialogContentAlaramDialog } from '../../plant-dashboard/alarm/alarm.component';
import { OemService } from '../../../services/oem/oem-service.service';
import { Router } from '@angular/router'; 
import { ToastrService } from 'ngx-toastr';
import { DataService } from '../../../data.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
HC_timeLine(Highcharts);
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
export interface PeriodicElement {
  name: string;
  position: number;
  value: number;

}
export interface BotElement {
  level: string;
  no_of_bots_affected: number;
  abort_type: string;
  abort_reason: string;
  issuer: string;
  aborted_since: string;
  removal_abort: string;
  action: string;
}
const ELEMENT_DATA: PeriodicElement[] = [
  { position: 1, name: 'Normal at the docking station', value: 200 },
  { position: 2, name: 'Normal and cleaning', value: 150 },
  { position: 3, name: 'Strained and cleaning', value: 90 },
  { position: 4, name: 'Breakdown', value: 45 },
  { position: 5, name: 'Not communicating', value: 10 },
  { position: 6, name: 'Aborted for emergency', value: 0 },

];
// const ELEMENT_BOT_DATA: PeriodicBotsElement[] = [
//     {level: 'plant',no_of_bots_affected: 250,abort_type:'Sample Data',abort_reason: 'Sample Data',issuer: 'Sample Data',
//         aborted_since: 'Sample Data', removal_abort: 'Sample Data',action: 'Lift Abort'},
//         {level: 'plant',no_of_bots_affected: 250,abort_type:'Sample Data',abort_reason: 'Sample Data',issuer: 'Sample Data',
//         aborted_since: 'Sample Data', removal_abort: 'Sample Data',action: 'Lift Abort'},
//         {level: 'plant',no_of_bots_affected: 250,abort_type:'Sample Data',abort_reason: 'Sample Data',issuer: 'Sample Data',
//         aborted_since: 'Sample Data', removal_abort: 'Sample Data',action: 'Lift Abort'},
//         {level: 'plant',no_of_bots_affected: 250,abort_type:'Sample Data',abort_reason: 'Sample Data',issuer: 'Sample Data',
//         aborted_since: 'Sample Data', removal_abort: 'Sample Data',action: 'Lift Abort'},
//         {level: 'plant',no_of_bots_affected: 250,abort_type:'Sample Data',abort_reason: 'Sample Data',issuer: 'Sample Data',
//         aborted_since: 'Sample Data', removal_abort: 'Sample Data',action: 'Lift Abort'},
//         {level: 'plant',no_of_bots_affected: 250,abort_type:'Sample Data',abort_reason: 'Sample Data',issuer: 'Sample Data',
//         aborted_since: 'Sample Data', removal_abort: 'Sample Data',action: 'Lift Abort'},
//   ];

@Component({
  selector: 'app-oem-dashboard',
  templateUrl: './oem-dashboard.component.html',
  styleUrls: ['./oem-dashboard.component.scss']
})
export class oemDashboardComponent implements OnInit {
  public chartOptions6: Partial<ChartOptions6> | any;
  displayedColumns: string[] = ['position', 'name', 'value'];
  displayedBotColumns: string[] = ['level', 'no_of_bots_affected', 'abort_type', 'abort_reason',
    'issuer', 'aborted_since', 'removal_abort', 'action'];
  dataSource = ELEMENT_DATA;
  // =ELEMENT_BOT_DATA;
  botDataSource :any =new MatTableDataSource();
  
  ncuChartColor = [
    { position: 1, name: 'Communicating And Power Supply Is Normal' },
    { position: 2, name: 'Communicating But Backup Battery/Anemometer Not Communicating' },
    { position: 3, name: 'Not Communicating/Breakdown Condition/Showing Alarms' }]
  abortForm: any
  demoForm: any
  disableDropdownNCU: boolean = false;
  disableDropdownBCU: boolean = false;
  dropdownBCUCleaning: boolean = true;
  selectedAbortLevel: any = ""
  calendar = "Last 7 days";
  Highcharts: typeof Highcharts = Highcharts;
  refreshChart: any
  isView: boolean = false
  show = false;
  allkpis1 = ""
  ncuSummary: any
  uptimeSeries: any = [];
  uptimeXaxis: any = [];
  allAvgUptime: any = [];
  avgUptime: any
  uptimeColors: any
  uptimeStrok: any
  uptimeMarker: any
  abortLevel = ['Plant Level', 'BCU Level']
  /*  'NCU Level', */
  plantId: any
  ncuId: any
  bcuId: any
  days='7'
  ncuList: any = []
  bcuList: any = []
  plantList: any = []
  ncuAlarmSummary = { exceedsla: 0, withinsla: 0 }
  bcuAlarmSummary = { exceedsla: 0, withinsla: 0 }
  NcuBcuJsonId: any
  startDate
  endDate
  plantName:any
  plantnewid:any
  chartData: any = [
    // {
    //   name: 'Normal at the docking station',
    //   color: '#bcf0ec',
    //   y:200,
    // },
    // {
    //     name: 'Normal and cleaning',
    //     color: '#26a69a',
    //     y:50,
    //   },
    //   {
    //     name: 'Strained and cleaning',
    //     color: '#ffd20a',
    //     y:30,
    //   },
    //   {
    //     name: 'Breakdown',
    //     color: '#e57373',
    //     y:10,
    //   },
    //   {
    //     name: 'Not communicating',
    //     color: '#EE2A41',
    //     y:10,
    //   },
    //   {
    //     name: 'Aborted for emergency',
    //     color: '#8e101f',
    //     y:10,
    //   }
  ]
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator; 

  constructor(private formBuilder: FormBuilder,private toastr: ToastrService, public dialog: MatDialog, private oemService: OemService, private router: Router, private service : DataService) { }

  ngOnInit(): void { 
    // this.plantName=localStorage.getItem('plantName')
    this.oemService.getPlantHierachyData().subscribe(res => {
      this.NcuBcuJsonId = res
      // console.log("11111",this.NcuBcuJsonId)
      this.getNcuBcuID(this.NcuBcuJsonId);
    })
    this.abortForm = this.formBuilder.group({
      abortlevel: [''],
      ncuid: [''],
      bcuid: ['']
      /*    abortlevel: ['', Validators.required],
         ncuid: ['', Validators.required],
         bcuid: ['', Validators.required], */
    });
    this.demoForm = this.formBuilder.group({
      // ncuid: ['', Validators.required],
      bcuid: ['', Validators.required],
    });

    this.show = true
    this.summaryData()
    this.getPlantBcuStatus()
    this.getNcuAlarmSummary() 
    this.getBcubotStatus()
    let startDate: any, endDate: any
    endDate = moment().format("DD-MM-YYYY")
    startDate = moment().subtract(7, 'days').format("DD-MM-YYYY")
    let dateparam = "&startdate=" + startDate + "&enddate=" + endDate
    this.getAvgUptime(dateparam)
    // console.log(endDate, "finaldate", startDate)
  }
  getNcuBcuID(data) {
    // let plantsData: any = [];
    let plantData:any=[]
    this.plantnewid = localStorage.getItem('plant').split(',')
    let plant:any = this.plantnewid[0]  
    let id = "id= '" + plant + "'"
    plantData = jsonata("data["+ id +"]").evaluate(data); 
    this.plantName=plantData.name
    
     /*  plantsData = jsonata("data[*]").evaluate(data);
    let newData = Array.isArray(plantsData) ? plantsData : [plantsData];
  
    this.plantId = ''
    newData.forEach(element => {
      if (this.plantId == undefined || this.plantId == null || this.plantId == '') {
        this.plantList.push(element.id)
      }
    });
 */
    let NcuData: any = []
    
    NcuData = jsonata("data[" + id + "].knu").evaluate(data);
    let ncunewData = Array.isArray(NcuData) ? NcuData : [NcuData];
    this.ncuId = ''
    ncunewData.forEach(element => {
      if (this.ncuId == undefined || this.ncuId == null || this.ncuId == '') {
        this.ncuList.push({
          name: element.name,
          id: element.id
        })
      }
    });
    let bcuData: any = []
    bcuData = jsonata("data[" + id + "].knu[*].status[*].bot").evaluate(data);
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
  summaryData() { 
    let plant :any = localStorage.getItem('plant')
    this.service.getSummary1(plant).subscribe(res => {
      this.ncuSummary = res.data
    })
  }
 /*  getKnuStatus() {
    this.oemService.getKnuStatus().subscribe(res => {
      this.botDataSource = res.data
    })
  } */
  getBcubotStatus() {
      this.oemService.getAbortedBotStatus().subscribe(res => {
      this.botDataSource= new MatTableDataSource(res.data);
      this.botDataSource.sort = this.sort;
      this.botDataSource.paginator = this.paginator; 
    })
  }
  getNcuAlarmSummary() {
    this.oemService.getNcuAlarmSummary().subscribe(res => {
      if (res.data[0].value != null || res.data[0].value != undefined) {
        this.ncuAlarmSummary.exceedsla = parseInt(res.data[0].value)
        this.ncuAlarmSummary.withinsla = parseInt(res.data[1].value)
        this.getBcuAlarmSummary()
      }

    })
  }
  selectedDate(days) {
    let startDate: any, endDate: any
    endDate = moment().format("DD-MM-YYYY")
    startDate = moment().subtract(days, 'days').format("DD-MM-YYYY")
    let dateparam = "&startdate=" + startDate + "&enddate=" + endDate
    this.getAvgUptime(dateparam)
    // console.log(endDate, "finaldate", startDate)
  }
  getBcuAlarmSummary() {
    this.oemService.getBcuAlarmSummary().subscribe(res => {
      if (res.data[0].value != null || res.data[0].value != undefined) {
        this.bcuAlarmSummary.exceedsla = parseInt(res.data[0].value)
        this.bcuAlarmSummary.withinsla = parseInt(res.data[1].value)
        this.shows()
      }
    })
  }
  getPlantBcuStatus() {
    this.oemService.getOemBotReport().subscribe(res => {
      this.chartData = res.data
      setTimeout(() => this.viewChart(this.chartData), 500)
      console.log("aaaaaaaaaaaaaaaaaaaaaaaaa",this.chartData)
      this.addColor(this.chartData)
    })
  }
  getAvgUptime(date = '') {
    this.avgUptime = []
    this.uptimeSeries = []
    this.uptimeXaxis = []
    this.allAvgUptime = []
    this.oemService.getUptime(date).subscribe(res => {
      this.avgUptime = res;
      if(this.avgUptime.data[0].series){
      let threasholdVal: any = this.avgUptime.data[0].threshold;
      let newData: any = this.avgUptime.data[0].series

      let uptimeData = _.filter(newData, { 'name': "With AMC" })[0];
      let uptimeDataWo = _.filter(newData, { 'name': "Without AMC" })[0];

      if (uptimeData && uptimeData.name == "With AMC") {
        this.uptimeSeries.push({
          name: uptimeData.name,
          data: uptimeData.data,
          type: "line"
        })
        this.uptimeColors = ["#F68D5D80", "#2D3047"]
        this.uptimeStrok = {
          width: [2, 1],
          curve: "smooth",
          dashArray: [0, 8]
        }
        this.uptimeMarker = {
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
        }
      } else {
        this.uptimeSeries.push({
          name: uptimeDataWo.name,
          data: uptimeDataWo.data,
          type: "line"
        })
        this.uptimeColors = ["#6F6BF480", "#2D3047"]
        this.uptimeStrok = {
          width: [2, 1],
          curve: "smooth",
          dashArray: [0, 8]
        }
        this.uptimeMarker = {
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
        }
      }

   /*    let threashold: any = [];
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
      if (uptimeData && uptimeData.name == "With AMC") {
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
      this.uptimeXaxis.push({ categories: data1 ,tickPlacement: 'on', tickAmount: 19, axisBorder: {
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
      this.uptimeChart()
    }else{
      this.chartOptions6={}
      this.uptimeChart()
    }
  })
  }
  uptimeChart() {
    if (this.allAvgUptime.length > 0) {
      if (this.allAvgUptime.name == "With AMC") {
        let textData: any = this.allAvgUptime[0]
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
            text:undefined, /* textData.average + "%", */
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
            show: true,/* 
            categories: [94, 95, 96, 97, 98, 99, 100], */
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
              formatter: (categories: any) => { return parseFloat(categories).toFixed(2)  + '%' },
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
        let textData: any = this.allAvgUptime[0]
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
            text: /* textData.average + "%", */undefined,
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
            max: 100,
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
      }
    }
  }
  raiseAlarm(formdata) {
    // console.log("Hrr",formdata)
    let message :any
    if(formdata.action){
     message = "resume"
    }
    this.markFormGroupDirty(this.abortForm)
    if(this.abortForm.valid){
      const dialogRef = this.dialog.open(AbortDialogComponent, {
        width: '500px', disableClose: true, data:formdata,
      });
    }else{
      this.toastr.error("Please Select Abort Level !!")
    }

  }

  demoCleaning(data) {
    // let ncuid = this.demoForm.value.ncuid
    let bcuid = this.demoForm.value.bcuid
    this.markFormGroupDirty(this.demoForm)
    if (this.demoForm.valid) {/* ncuid, */
      this.oemService.getDemoCleaningstartstop( bcuid, data).subscribe(res => {
        if(res){
          if(data=="start"){
            this.toastr.success("Demo Cleaning Start") 
          }else{
            this.toastr.success("Demo Cleaning Stop")
          }
          this.demoForm.reset()
        }else{
          this.toastr.error(res)
        }
      })
    }

  }
  markFormGroupDirty(form) {
    (<any>Object).values(form.controls).forEach(control => {
      control.markAsDirty()
      control.markAsTouched()
      control.updateValueAndValidity()
      if (control.controls) {
        this.markFormGroupDirty(control)
      }
    })
  }
  selectAbortLevel(value: any) {
    this.selectedAbortLevel = value
    if (value == "NCU Level") {
      this.disableDropdownNCU = true;
      this.disableDropdownBCU = false;
      this.abortForm.controls['bcuid'].reset();
      this.abortForm.controls['ncuid'].setValidators([Validators.required]);
      this.abortForm.controls['bcuid'].clearValidators();
    } else if (value == "BCU Level") {
      this.disableDropdownBCU = true;
       this.disableDropdownNCU = true;
      this.abortForm.controls['ncuid'].reset();
      this.abortForm.controls['bcuid'].setValidators([Validators.required]);
      // this.abortForm.controls['ncuid'].clearValidators();

    } else {
      this.disableDropdownBCU = false;
      this.disableDropdownNCU = false;
      this.abortForm.controls['ncuid'].reset();
      this.abortForm.controls['bcuid'].reset();
      this.abortForm.controls['bcuid'].clearValidators();
      this.abortForm.controls['ncuid'].clearValidators();

    }

  }

  selectDemoNcuId(value: any) {
    if (value.length != 0) {
      this.dropdownBCUCleaning = true;
    }
    else {
      this.dropdownBCUCleaning = false;
    }
    this.bcuList = []
    let arrayData: any = []
    let knulistid = "id= '" + value + "'"
    arrayData = jsonata("data[*].knu[" + knulistid + "].status[*].bot").evaluate(this.NcuBcuJsonId)
    this.bcuId = ''
    arrayData.forEach(element => {
      if (this.bcuId == undefined || this.bcuId == null || this.bcuId == '') {
        this.bcuList.push({
          name: element.name,
          id: element.id
        })
      }
    });
  }
  selectNcuId(value: any) {
    if (value.length != 0 && this.selectedAbortLevel == "BCU Level") {
      this.disableDropdownBCU = true;
    }
    else {
      this.disableDropdownBCU = false;
    }
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
  }
  navigateNcu() {
    this.router.navigate(['/front/oem/dashboard/ncu'])
  }
  navigateBcu() {
    this.router.navigate(['/front/oem/dashboard/bcu'])
  }
  ncuIdClick(value: any) {
    if (value.length > 0) {
      this.disableDropdownBCU = true;
    }

  }
  btnClick(data: any) {
    if (data == "chart") {
      this.isView = true;
    } else {
      setTimeout(() => this.viewChart(this.chartData), 500)
      this.isView = false;
    }

  }
  addColor(data: any) {
    data.forEach(element => {
      let color = ''
      let position: number = 0
      switch (element.name) {
        case "Normal at the docking station":
          // color="#bcf0ec"
          position = 1
          break
        case "Normal and cleaning":
          // color="#26a69a"
          position = 2
          break
        case "Strained and cleaning":
          // color="#ffd20a"
          position = 3
          break
        case "Breakdown":
          // color="#e57373"
          position = 4
          break
        case "Not communicating":
          // color="#ee2a41"
          position = 5
          break
        case "Aborted for emergency":
          // color="#8e101f"
          position = 6
          break
      }
      // element["color"]=color
      element['position'] = position

    });

  }
  viewChart(data: any) {
    data.forEach(ele =>{
      ele.y= parseInt(ele.y)
    })
    const refreshChart2 = Highcharts.chart("donut", {
      title: {
        text: undefined
      },
      chart: {
        height: 210,
        plotBackgroundColor: null,
        plotBorderWidth: 0,
        plotShadow: false,
      },
      tooltip: {
        style: {
          color: '#FFFFFF',
          fontSize: "14px"
        },
        backgroundColor: '#626262',
        borderColor: '#626262',
        formatter: function () {
          // return '<span>BOT Status:</span> ' + this.point.name;
          return this.point.name;
        }
      },
      credits: {
        enabled: false,
      },
      exporting: { enabled: false },
      plotOptions: {
        pie: {
          dataLabels: {
            formatter: function () {
              return this.y > 1 ? this.point.y : null;
            },
            enabled: true,
            distance: 10,
            style: {
              fontSize: '18px',
              fontWeight: 'bold',
              color: 'black',
            },
          },
          center: ['50%', '50%'],
          size: '90%',
          showInLegend: false,
        },
      },
      series: [
        {
          data: data,
          type: 'pie',
          innerSize: '75%',
        },
      ],
    });
  }
  shows() {
    let rout = this.router
    let bcuWithinSla = this.bcuAlarmSummary.withinsla
    let withinsla = this.ncuAlarmSummary.withinsla
    this.refreshChart = Highcharts.chart('stackbar1', {
      chart: {
        type: 'bar',
        spacingTop: 0,
        spacingLeft: 10,
        spacingRight: 10,
        height: 80,
      },
      title: {
        text: undefined
      },
      legend: {
        enabled: false,
        layout: 'vertical',
        align: 'left',
        verticalAlign: 'top',
        x: 0,
        y: 0,
        floating: true,
        borderWidth: 1,
      },
      xAxis: {
        visible: false,
      },

      yAxis: {
        visible: false,
      },
      tooltip: {
        enabled: false,
      },
      plotOptions: {
        bar: {
          dataLabels: {
            enabled: true,
            color: '#000000'
          }
        },
        series: {
          point: {
            events: {
              click: function () {
                if (withinsla != this.options.y) {
                  rout.navigate(['/front/oem/dashboard/ncu', "alarmexceedingsla"])
                }
                else {
                  rout.navigate(['/front/oem/dashboard/ncu', "alarmwithinsla"])
                }

              }
            }
          },
          stacking: 'percent'
        }
      },
      credits: {
        enabled: false
      },
      series: [
        {
          data: [this.ncuAlarmSummary.withinsla],
          pointWidth: 28,
          color: '#FFD20A',
        },
        {
          data: [this.ncuAlarmSummary.exceedsla],
          pointWidth: 28,
          color: '#EE2A41'
        }

      ],
      exporting: { enabled: false },
    })
    const refreshChart1 = Highcharts.chart('stackbar2', {
      chart: {
        type: 'bar',
        spacingTop: 0,
        spacingLeft: 10,
        spacingRight: 10,
        height: 80,
      },
      title: {
        text: undefined
      },
      legend: {
        enabled: false,
        layout: 'vertical',
        align: 'left',
        verticalAlign: 'top',
        x: 0,
        y: 0,
        floating: true,
        borderWidth: 1,
      },
      xAxis: {
        visible: false,
      },

      yAxis: {
        visible: false,
      },
      tooltip: {
        enabled: false,
      },
      plotOptions: {
        bar: {
          dataLabels: {
            enabled: true,
            color: '#000000'
          }
        },
        series: {
          point: {
            events: {
              click: function () {
                if (bcuWithinSla != this.options.y) {
                  rout.navigate(['/front/oem/dashboard/bcu', "alarmexceedingsla"])
                }
                else {
                  rout.navigate(['/front/oem/dashboard/bcu', "alarmwithinsla"])
                }
              }
            }
          },
          stacking: 'percent'
        }
      },
      credits: {
        enabled: false
      },
      series: [
        {
          data: [this.bcuAlarmSummary.withinsla],
          pointWidth: 28,
          color: '#FFD20A',
        },
        {
          data: [this.bcuAlarmSummary.exceedsla],
          pointWidth: 28,
          color: '#EE2A41'
        }
      ],
      exporting: { enabled: false },
    });

  }
  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }
  openDialog() {
    const dialogRef = this.dialog.open(DialogContentAlaramDialog);/* ,{ width: '840px',height:'600px'} */
    dialogRef.afterClosed().subscribe((result: any) => {
    });
  }
}
