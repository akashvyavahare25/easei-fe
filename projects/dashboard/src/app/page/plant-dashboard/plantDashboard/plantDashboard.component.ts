//@ts-nocheck
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import * as _ from 'lodash';
var moment = require('moment');
declare var require: any;
var jsonata = require('jsonata');
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
  ApexAnnotations,
  ApexResponsive,
  ApexStates,
} from "ng-apexcharts";

export type ChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  labels: string[];
  plotOptions: ApexPlotOptions;
  stroke: any; // ApexStroke;

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
import * as Highcharts from "highcharts";
import HC_timeLine from "highcharts/modules/timeline";
import { MatOption } from '@angular/material/core';
import { MatSelect } from '@angular/material/select';
import { PlantServiceService } from '../../../../../src/app/services/plants/plant-service.service';
import { DataService } from '../../../../../src/app/data.service';
import { concat, Subject } from 'rxjs';
HC_timeLine(Highcharts);

@Component({
  selector: 'app-plantDashboard',
  templateUrl: './plantDashboard.component.html',
  styleUrls: ['./plantDashboard.component.scss']
})
export class PlantDashboardComponent implements OnInit {
  str = "40 BOTs \nDown";
  arr = this.str.split('\n');
  calendar = "7";
  allPlants = new FormControl();
  allKnu = new FormControl();
  botStatus = new FormControl();
  allBot = new FormControl();
  allPlants1 = '';
  allKnu1 = '';
  botStatus1 = '';
  allBot1 = '';
  count: any;
  type: any
  allSelected = false;
  allSelected1 = false;
  allSelected2 = false;
  allSelected3 = false;
  plantJsonData: any
  plants: any = []
  status: any = []
  knu: any = []
  avgUptime: any;
  uptimeSeries: any = [];
  uptimeXaxis: any = [];
  avgsoiling: any;
  soilingSeries: any = [];
  soilingXaxis: any = [];
  allAvgUptime: any = [];
  allAvgSoilloss: any = [];
  summary: any
  cleaningData: any
  bots: any=[]
  allPlantsList: any = [];
  allKnuList: any = [];
  botStatusList: any = [];
  allBotList: any = [];  
  botdatastatus: any = []
  donutSeries: any = []
  serviceNotification: any
  replacementNotifiction: any 
  typeWithoutAMC:any
  soilingType:any
  soilingtypeWithoutAMC:any
  plantId: any = localStorage.getItem('plant')
  knuId: string = ''
  statusName: string = ''
  botId: string = ''
  beyond: any
  botdown: any
  within: any
  startDate: any
  endDate: any
  averageUptimeWithAMC:any
  averageUptimeWithoutAMC:any
  averageSoilingWithAMC:any
  averageSoilingWithoutAMC:any
  replacenotification = { beyondsla: 0, withinsla: 0, healthybots: 0 }
  servicenotification = { beyondsla: 0, withinsla: 0, healthybots: 0 }
  allselectedbot = { selected: false, disselected: false }
  allselectedbotstatus = { selected: false, disselected: false }
  allselectedknustatus = { selected: false, disselected: false }
  allselectedplantstatus = { selected: false, disselected: false }
  flag: Boolean = false;
  maxDate=new Date()

  @ViewChild('select') select: MatSelect;
  @ViewChild('select1') select1: MatSelect;
  @ViewChild('select2') select2: MatSelect;
  @ViewChild('select3') select3: MatSelect;

  toggleAllSelection() {
    if (this.allSelected) {
      this.select.options.forEach((item: MatOption) => {
        this.allselectedplantstatus.selected = true
        this.allselectedplantstatus.disselected = false
        item.select()
      });
    } else {
      this.select.options.forEach((item: MatOption) => {
        this.allselectedplantstatus.selected = false
        this.allselectedplantstatus.disselected = true
        item.deselect()
      });
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
      this.select1.options.forEach((item: MatOption) => {
        this.allselectedknustatus.selected = true
        this.allselectedknustatus.disselected = false
        item.select()
      });
    } else {
      this.select1.options.forEach((item: MatOption) => {
        this.allselectedknustatus.selected = false
        this.allselectedknustatus.disselected = true
        item.deselect()
      });
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
        this.allselectedbotstatus.selected = true
        this.allselectedbotstatus.disselected = false
        item.select()
      });
    } else {
      this.select2.options.forEach((item: MatOption) => {
        this.allselectedbotstatus.selected = false
        this.allselectedbotstatus.disselected = true
        item.deselect()
      });
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
        this.allselectedbot.selected = true
        this.allselectedbot.disselected = false
        item.select()
      });
    } else {
      this.select3.options.forEach((item: MatOption) => {
        this.allselectedbot.selected = false
        this.allselectedbot.disselected = true
        item.deselect()
      });
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
  reset() {
    this.calendar = '7';
    this.allPlants1 = '';
    this.allKnu1 = '';
    this.botStatus1 = '';
    this.allBot1 = '';
    this.allSelected = false
    this.allSelected1 = false
    this.allSelected2 = false
    this.allSelected3 = false
    this.plantId = localStorage.getItem('plant')
    this.knuId = ''
    this.statusName = ''
    this.botId = ''
    this.getPlants(this.plantJsonData.data)
  }
  @ViewChild("chart") chart: ChartComponent;
  public chartOptions5: Partial<ChartOptions5> | any;
  public chartOptions6: Partial<ChartOptions6> | any;
  public chartOptions7: Partial<ChartOptions> | any;
  public chartOptions8: Partial<ChartOptions8> | any;
  value1: boolean = true;
  childNotifier: Subject<any> = new Subject<any>(this.value);
  value2: boolean = true;
  knuchildNotifier: Subject<any> = new Subject<any>(this.value);
  value3: boolean = true;
  stauschildNotifier: Subject<any> = new Subject<any>(this.value);
  value4: boolean = true;
  botchildNotifier: Subject<any> = new Subject<any>(this.value);
  value5: boolean = true;
  startdatechildNotifier: Subject<any> = new Subject<any>(this.value);
  value6: boolean = true;
  enddatechildNotifier: Subject<any> = new Subject<any>(this.value);
  Highcharts: typeof Highcharts = Highcharts;
  constructor(public dialog: MatDialog, private router: Router,
    private plantService: PlantServiceService, private dataService: DataService) {
    //Bar Chart


  }

  ngOnInit() { 
    this.plants = []
    this.endDate = moment().format("DD-MM-YYYY")
    this.startDate = moment().subtract(7, 'days').format("DD-MM-YYYY")
    this.plantService.getPlantHierachyData().subscribe(res => {
      this.plantJsonData = res;
      this.getPlants(this.plantJsonData.data)
        
    })
  }
  selectedDate(days) {
    if (days != "custom") {
      this.endDate = moment().format("DD-MM-YYYY")
      this.startDate = moment().subtract(days, 'days').format("DD-MM-YYYY")
      this.value5 = !this.value5;
      this.startdatechildNotifier.next(this.startDate);
      this.value6 = !this.value6
      this.enddatechildNotifier.next(this.endDate)
      this.getPlants();
    }

  }
  selectedCustomStartDate(days) {
    this.startDate = moment(days.value).format("DD-MM-YYYY")  
  }
  selectedCustomEndDate(days) {
    this.endDate = moment(days.value).format("DD-MM-YYYY")
    this.value5 = !this.value5;
    this.startdatechildNotifier.next(this.startDate);
    this.value6 = !this.value6
    this.enddatechildNotifier.next(this.endDate)
    this.getPlants();
  }
  summaryPlantData() {
    this.plantService.getSummary(this.plantId,this.startDate,this.endDate).subscribe(res => {
      this.summary = res.data
    })
  }
  cleaningSchedule() {
    this.plantService.getCleaningSchedule(this.plantId, this.knuId, this.statusName, this.botId, this.startDate, this.endDate).subscribe(res => {
      this.cleaningData = res.data;
    })
  }
  botPlantStatus() {
    this.botdatastatus = []
    let replaceMentData = []
    this.plantService.getPlantBotStatus(this.plantId, this.knuId, this.statusName, this.botId, this.startDate, this.endDate).subscribe(res => {
    this.botdatastatus = []
    this.bots = []
    this.bots = res.data
      if (this.bots[0].y != null || this.bots[0].y != undefined) {
        this.botdown = parseInt(this.bots[0].y) + parseInt(this.bots[1].y)
      }
      for (let i = 0; i < this.bots.length; i++) {
        this.botdatastatus.push({
          name: this.bots[i].name,
          color: this.bots[i].color,
          y: parseInt(this.bots[i].y),
          position: i + 1,
          events: {
            click: () => {
              this.router.navigate([`/front/plant/alarm`, this.bots[i].name, this.plantId, this.knuId, this.statusName, this.botId, this.startDate, this.endDate]);
            }
          }
        });
      }
      this.plantService.getServiceNotification(this.plantId, this.knuId, this.statusName, this.botId, this.startDate, this.endDate).subscribe(resp => {
        this.serviceNotification = resp.Data
        if (resp.Data[0].value != null || resp.Data[0].value != undefined) {
          this.servicenotification.beyondsla = parseInt(resp.Data[0].value)
          this.servicenotification.withinsla = parseInt(resp.Data[1].value)
          this.servicenotification.healthybots = parseInt(resp.Data[2].value)
        }

        this.plantService.getReplacementNotification(this.plantId, this.knuId, this.statusName, this.botId, this.startDate, this.endDate).subscribe(res => {
          this.replacementNotifiction = res.Data
          if (res.Data[0].value != null || res.Data[0].value != undefined) {
            this.replacenotification.beyondsla = parseInt(res.Data[0].value)
            this.replacenotification.withinsla = parseInt(res.Data[1].value)
            this.replacenotification.healthybots = parseInt(res.Data[2].value)
          }
          this.show();
        })
      })
    })
  }
  show(): void {
    let rout = this.router
    let plantid = this.plantId
    let knuid = this.knuId
    let status = this.statusName
    let botid = this.botId
    let startdate = this.startDate
    let enddate = this.endDate
    let servicebeyondsla = this.servicenotification.beyondsla
    let servicewithinsla = this.servicenotification.withinsla
    let servicehealthy = this.servicenotification.healthybots
    let replacebeyondsla = this.replacenotification.beyondsla
    let replacewithinsla = this.replacenotification.withinsla
    let replacehealthy = this.replacenotification.healthybots
    const refreshChart = Highcharts.chart('stackbar1', {
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
                if (servicebeyondsla == this.options.y) {
                  rout.navigate(['/front/plant/plantService', "7days", plantid, knuid, status, botid, startdate, enddate])
                }
                else if (servicewithinsla == this.options.y) {
                  rout.navigate(['/front/plant/plantService', "15days", plantid, knuid, status, botid, startdate, enddate])
                } else if (servicehealthy == this.options.y) {
                  rout.navigate(['/front/plant/plantService', "30days", plantid, knuid, status, botid, startdate, enddate])
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
          data: [this.servicenotification.healthybots],
          pointWidth: 28,
          color: '#26A69A ',
          //   events: {
          //     click: () => { 
          //         this.router.navigate([`plant/plantService`]);
          //     }
          // }
        },
        {
          data: [this.servicenotification.withinsla],
          pointWidth: 28,
          color: '#FFD20A',
          //   events: {
          //     click: () => { 
          //         this.router.navigate([`plant/plantService`]);
          //     }
          // }
        },
        {
          data: [this.servicenotification.beyondsla],
          pointWidth: 28,
          color: '#EE2A41',
          //   events: {
          //     click: () => { 
          //         this.router.navigate([`plant/plantService`]);
          //     }
          // }

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
        enabled: true,
        // layout: 'vertical',
        // align: 'center',
        // verticalAlign: 'bottom',
        // x: 0,
        // y: 0,
        // floating: true,
        // borderWidth: 1,
          reversed: true
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
                if (replacebeyondsla == this.options.y) {
                  rout.navigate(['/front/plant/replacementNotification', "7days", plantid, knuid, status, botid, startdate, enddate])
                }
                else if (replacewithinsla == this.options.y) {
                  rout.navigate(['/front/plant/replacementNotification', "15days", plantid, knuid, status, botid, startdate, enddate])
                } else if (replacehealthy == this.options.y) {
                  rout.navigate(['/front/plant/replacementNotification', "30ays", plantid, knuid, status, botid, startdate, enddate])
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
          data: [this.replacenotification.healthybots],
          pointWidth: 28,
          color: '#26A69A',
          name: '30 Days',
          //   events: {
          //     click: () => { 
          //         this.router.navigate([`plant/replacementNotification`]);
          //     }
          // }
        },
        {
          data: [this.replacenotification.withinsla],
          pointWidth: 28,
          color: '#FFD20A',
          name: '15 Days',
          //   events: {
          //     click: () => { 
          //         this.router.navigate([`plant/replacementNotification`]);
          //     }
          // }
        },
        {
          data: [this.replacenotification.beyondsla],
          pointWidth: 28,
          color: '#EE2A41',
          name: '7 Days',
          //   events: {
          //     click: () => { 
          //         this.router.navigate([`plant/replacementNotification`]);
          //     }
          // }
        }
      ],
      exporting: { enabled: false },
    });

    const refreshChart2 = Highcharts.chart('donut', {
      chart: {
        height: 210,
        plotBackgroundColor: null,
        plotBorderWidth: 0,
        plotShadow: false,
      },
      title: {
        text: `<strong>${this.botdown || 0}<br> Down</strong>`,
        align: 'center',
        verticalAlign: 'middle',
        y: 20,
      },
      tooltip: {
        style: {
          color: '#FFFFFF',
          fontSize: "14px"
        },
        backgroundColor: '#626262',
        borderColor: '#626262',
        formatter: function () {
          return '<span>BOT Status:</span> ' + this.point.name;
        }
      },
      credits: {
        enabled: false,
      },
      exporting: { enabled: false },
      plotOptions: {
        series: {
          point: {
            events: {
              click: function () {
                // if(){
                //   rout.navigate(['plant/replacementNotification',"7days",plantid,knuid,status,botid])
                // }
                // else if(replacewithinsla == this.options.y)
                // {
                //   rout.navigate(['plant/replacementNotification',"15days",plantid,knuid,status,botid])
                // }else if(replacehealthy == this.options.y)
                // {
                //   rout.navigate(['plant/replacementNotification',"30ays",plantid,knuid,status,botid])
                // }
              }
            }
          },
          stacking: 'normal'
        },
        pie: {
          dataLabels: {
            enabled: false,
            distance: -50,
            style: {
              fontWeight: 'bold',
              color: 'white',
            },
          },
          center: ['50%', '50%'],
          size: '95%',
          showInLegend: false,
        },
      },

      series: [
        {
          data: this.botdatastatus,
          //  [
          //   {
          //     y: 46,
          //     name: "46 BOTs down beyond SLA",
          //     color: "#EE2A41",
          //     position: 1
          // },
          // {
          //     y: 98,
          //     name: "98 BOTs down within  SLA",
          //     color: "#FFD000",
          //     position: 2
          // },
          // {
          //     y: 198,
          //     name: "198 Healthy BOTs",
          //     color: "#26A69A",
          //     position: 3
          // }
          // ],
          type: 'pie',
          innerSize: '80%',
        },
      ],
    });
  }

  getavgUptimeData() {
    this.avgUptime = []
    this.uptimeSeries = []
    this.uptimeXaxis = []
    this.allAvgUptime = []
    this.type=''
    this.typeWithoutAMC=''
    this.plantService.getuptimedata(this.plantId, this.knuId, this.statusName, this.botId, this.startDate, this.endDate).subscribe(res => {
      this.avgUptime = [] 
      this.uptimeSeries = []
      this.avgUptime = res
      if(this.avgUptime.data[0].series){
       let threasholdVal:any = this.avgUptime.data[0].threshold;
      let newData: any = this.avgUptime.data[0].series
      let uptimeData = _.filter(newData, { 'name': "With AMC" })[0];
      let uptimeDataWo = _.filter(newData, { 'name': "Without AMC" })[0];
      if (uptimeData && uptimeData.name == "With AMC") {
        this.type=uptimeData.name
        this.uptimeSeries.push({
          name: uptimeData.name,
          data: uptimeData.data,
          type: "line"
        })
      }
      if(uptimeDataWo){
      if(uptimeDataWo.name == "Without AMC") {
        this.typeWithoutAMC=uptimeDataWo.name
        this.uptimeSeries.push({
          name: uptimeDataWo.name,
          data: uptimeDataWo.data,
          type: "line"
        })
      }
    }
     /*  let threashold: any = [];
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
          sum = sum +parseFloat(uptimeData.data[i])
        }
        this.averageUptimeWithAMC = parseFloat(sum / uptimeData.data.length).toFixed(2)
        this.allAvgUptime.push({
          name: uptimeData.name,
          average:  this.averageUptimeWithAMC
        },
        )

      } 
      if(uptimeDataWo){
        if(uptimeDataWo.name == "Without AMC"){
          for (let i = 0; i < uptimeDataWo.data.length; i++) {
            sum1 = sum1 + parseFloat(uptimeDataWo.data[i])
          }
          this.averageUptimeWithoutAMC = parseFloat(sum1 / uptimeDataWo.data.length).toFixed(2)
          this.allAvgUptime.push({
            name: uptimeDataWo.name,
            average: this.averageUptimeWithoutAMC
          },
          )
        }
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
       this.getavgSoilingData();
       
      }else{
        this.chartOptions6={}
        this.getavgSoilingData();
      }
    })
  }
  getavgSoilingData() {
    this.avgsoiling = []
    this.soilingSeries = []
    this.soilingXaxis = []
    this.allAvgSoilloss = []
    this.soilingXaxis = []
    this.soilingType=''
    this.soilingtypeWithoutAMC=''
    this.plantService.getsoilingloss(this.plantId, this.knuId, this.statusName, this.botId, this.startDate, this.endDate).subscribe(res => {
      this.soilingSeries=[]
      this.avgsoiling=[]
      this.avgsoiling = res;
      if(this.avgsoiling.data[0].series){
      let avgsoiling: any = this.avgsoiling.data[0];
      let threasholdVal: any = this.avgsoiling.data[0].threshold;
      let newData: any = this.avgsoiling.data[0].series

      let soilingData = _.filter(newData, { 'name': "With AMC" })[0];
      let soilingDataWo = _.filter(newData, { 'name': "Without AMC" })[0];
      if (soilingData && 'With AMC' == soilingData.name) {
        this.soilingType=soilingData.name
        this.soilingSeries.push({
          name: soilingData.name,
          data: soilingData.data,
          type: "column"
        })
      }
      if(soilingDataWo){
       if(soilingDataWo.name ==  "Without AMC") {
        this.soilingtypeWithoutAMC=soilingDataWo.name
        this.soilingSeries.push({
          name: soilingDataWo.name,
          data: soilingDataWo.data,
          type: "line"
        })
      }
    }
      /* let threashold: any = [];
      for (let i = 0; i < this.soilingSeries[0].data.length; i++) {
        threashold.push(threasholdVal)
      }
      this.soilingSeries.push({
        name: "",
        data: threashold,
        type: "line"
      }) */

      let sum: number = 0
      let sum1: number = 0
      if (soilingData && "With AMC" == soilingData.name) {
        for (let i = 0; i < soilingData.data.length; i++) {
          sum = sum + parseFloat(soilingData.data[i])
        }
        this.averageSoilingWithAMC = parseFloat(sum / soilingData.data.length).toFixed(2)
        this.allAvgSoilloss.push({
          name: soilingData.name,
          average: this.averageSoilingWithAMC
        })
      } 
      if(soilingDataWo){
      if(soilingDataWo.name == "Without AMC") {
        for (let i = 0; i < soilingDataWo.data.length; i++) {
          sum1 = sum1 + parseFloat(soilingDataWo.data[i])
        }
        this.averageSoilingWithoutAMC = parseFloat(sum1 / soilingDataWo.data.length).toFixed(2)
        this.allAvgSoilloss.push({
          name: soilingDataWo.name,
          average: this.averageSoilingWithoutAMC
        },
        )
      }
    }
      let data: any = this.avgsoiling.data[0]
      let data1: any = data['x-axis'];
      this.soilingXaxis.push({ categories: data1 ,tickPlacement: 'on', tickAmount: 19, axisBorder: {
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
      this.apexChart()
      
    }else{
        this.chartOptions5={}
    }
    })
  }
  apexChart() {
    if( this.type == "With AMC" && this.typeWithoutAMC == "Without AMC" ){
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
                text: "Threshold Value : "+this.avgUptime.data[0].threshold +"%",
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
          height: 270,
          type: "line",
          background: "#fff",
          toolbar: {
            show: true
          }
        },
        colors: ["#F68D5D80","#9390F7", "#2D3047",],
        dataLabels: {
          enabled: false
        },
        stroke: {
          width: [2, 2, 1],
          curve: "smooth",
          dashArray: [0,0, 8]
        },
        title: {
          text: /* textData.average + "%", */undefined,
          align: "left"
        },

        markers: {
          size: [3, 3,0],
          colors: undefined,
          strokeColors: ["#F68D5D80","#9390F7", "#2D3047",],
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
          // categories: [94, 95, 96, 97, 98, 99, 100],
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
            formatter: (categories: any) => { return  parseFloat(categories).toFixed(2) + '%' },
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
          x: { format: "dd MMM 2021" },
        }
      };
    }else if(this.allAvgUptime.length > 0 && this.type == "With AMC"){
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
          height: 270,
          type: "line",
          background: "#fff",
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
          strokeColors: ["#F68D5D", "#2D3047"],
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
          // categories: [94, 95, 96, 97, 98, 99, 100],
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
            formatter: (categories: any) => { return  parseFloat(categories).toFixed(2) + '%' },
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
          x: { format: "dd MMM 2021" },
        }
      };
    }else if(this.allAvgUptime.length > 0 && this.typeWithoutAMC == "Without AMC"){
      let textData: any = this.allAvgUptime[0]
      this.chartOptions6 = {
        series: this.uptimeSeries,
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
        chart: {
          height: 270,
          type: "line",
          background: "#fff",
          toolbar: {
            show: true
          }
        },
        colors: ["#9390F7", "#2D3047"],
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
          strokeColors: ["#9390F7", "#2D3047"],
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
          // categories: [94, 95, 96, 97, 98, 99, 100],
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
          x: { format: "dd MMM 2021" },
        }
      };
    }


       if(this.soilingType == "With AMC" && this.soilingtypeWithoutAMC == "Without AMC"){
        let textData: any = this.allAvgSoilloss[0]
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
            height: 270,
            type: "line",
            toolbar: {
              show: true
            }
          },
          stroke: {
            width: [2, 2, 1],
            curve: "smooth",
            dashArray: [0, 0, 8]
          },
          title: {
            text: /* textData.average + "%", */undefined,
          },
          dataLabels: {
            enabled: false,
            enabledOnSeries: undefined
          },
          // labels: [
          //     "02 Sep",
          //     "03 Sep",
          //     "04 Sep",
          //     "05 Sep",
          //     "06 Sep",
          //     "07 Sep",
          //     "08 Sep",
          //     "09 Sep",
          // ],
          xaxis: this.soilingXaxis[0],
          yaxis: {
            show: true, 
            decimalsInFloat: undefined,
            axisTicks: {
              show: true
            },
            axisBorder: {
              show: true,
              color: "#000000"
            },
            showAlways: false,
            seriesName: [true, true, undefined],
            labels: {
              show: true,
              decimalsInFloat: true,
              step: 1,
              lines: {
                show: true,
              },
              formatter: function (val: any) {
                return parseFloat(val).toFixed(2) + '%'
              }
            },
  
          },
          markers: {
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
          },
          colors: [ "#F68D5D80","#6F6BF480","#2D3047"],
          grid: {
            yaxis: {
              lines: {
                show: false
              }
            }
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
            x: { format: "dd MMM 2021" },
          }
  
        };
       }else if(this.allAvgSoilloss.length > 0 && this.soilingtypeWithoutAMC == "Without AMC"){
        let textData: any = this.allAvgSoilloss[0]
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
            height: 270,
            type: "line",
            toolbar: {
              show: true
            }
          },
          stroke: {
            width: [3],
            curve: 'smooth',
            dashArray: [0, 8]
          },
          title: {
            text: /* textData.average + "%", */undefined,
          },
          dataLabels: {
            enabled: false,
            enabledOnSeries: undefined
          },
          // labels: [
          //     "02 Sep",
          //     "03 Sep",
          //     "04 Sep",
          //     "05 Sep",
          //     "06 Sep",
          //     "07 Sep",
          //     "08 Sep",
          //     "09 Sep",
          // ],
          xaxis: this.soilingXaxis[0],
          yaxis: {
            show: true,
            decimalsInFloat: undefined,
            axisTicks: {
              show: true
            },
            axisBorder: {
              show: true,
              color: "#000000"
            },
            showAlways: false,
            seriesName: [true, true, undefined],
            labels: {
              show: true,
              decimalsInFloat: true,
              step: 1,
              lines: {
                show: true,
              },
              formatter: function (val: any) {
                return parseFloat(val).toFixed(2) + '%'
              }
            },
  
          },
          markers: {
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
          },
          colors: [
            "#9390F7",
            "#2D3047"
          ],
          grid: {
            yaxis: {
              lines: {
                show: false
              }
            }
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
            x: { format: "dd MMM 2021" },
          }
  
        };
       }else if(this.allAvgSoilloss.length > 0 && this.soilingType == "With AMC"){
        let textData: any = this.allAvgSoilloss[0]
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
            height: 270,
            type: "line",
            toolbar: {
              show: true
            }
          },
          stroke: {
            width: [2, 1],
            curve: "smooth",
            dashArray: [ 0, 8]
          },
          title: {
            text: /* textData.average + "%", */undefined,
          },
          dataLabels: {
            enabled: false,
            enabledOnSeries: undefined
          },
          xaxis: this.soilingXaxis[0],
          yaxis: {
            show: true, 
            decimalsInFloat: undefined,
            axisTicks: {
              show: true
            },
            axisBorder: {
              show: true,
              color: "#000000"
            },
            showAlways: false,
            seriesName: [true, true, undefined],
            labels: {
              show: true,
              decimalsInFloat: true,
              step: 1,
              lines: {
                show: true,
              },
              formatter: function (val: any) {
                return parseFloat(val).toFixed(2) + '%'
              }
            },
  
          },
          markers: {
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
          },
          colors: [
            "#F68D5D80","#2D3047"
          ],
          grid: {
            yaxis: {
              lines: {
                show: false
              }
            }
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
            x: { format: "dd MMM 2021" },
          }
  
        };
       }

  }
  foods: Food[] = [
    { value: 'steak-0', viewValue: 'Steak' },
    { value: 'pizza-1', viewValue: 'Pizza' },
    { value: 'tacos-2', viewValue: 'Tacos' },
  ];
  view(status: any) {
    if (status == 'v1') {
      this.router.navigate(['/front/plant/alarm'])
    } else if (status == 'v2') {
      this.router.navigate(['/front/plant/plantService'])
    } else if (status == 'v3') {
      this.router.navigate(['/front/plant/replacementNotification'])
    }
  }
  getReport() {
    this.router.navigate(['/front/report']);
  }
  getPlants(plant: any, knu: any, status: any) {
    this.allPlantsList = []
    // this.allKnuList = [];
    let knuPredicateQuery = "*"
    let statusPredicateQuery = "*"
    let plantsPredicateQuery = "*"
    let knuPredicateList = [];
    let plantsPredicateList = [];
    let statusPredicateList = [];
    if (plant != undefined && plant.length > 0) {
      plant.forEach(id => {
        plantsPredicateList.push("id=" + "'" + id.id + "'");
      })
      plantsPredicateQuery = plantsPredicateList.join(" or ");

    }
    if (status != undefined && status.length > 0) {
      status.forEach(id => {
        statusPredicateList.push("name=" + "'" + id.name + "'");

      })
      statusPredicateQuery = statusPredicateList.join(" or ");
    }
    if (knu != undefined && knu.length > 0) {
      knu.forEach(id => {
        knuPredicateList.push("id=" + "'" + id.id + "'");
        knuPredicateQuery = knuPredicateList.join(" or ");
      })
    }

    let arrayData2: any = []
    if (knu === undefined) {
      arrayData2 = jsonata("data[" + plantsPredicateQuery + "].knu").evaluate(this.plantJsonData)
      if (arrayData2 != null) {
        if (arrayData2.length) {
          this.allKnuList = arrayData2
        }
        else {
          this.allKnuList.push(arrayData2)
        }
      }
    }
    let plantsData: any = [];
    plantsData = jsonata("data[*]").evaluate(this.plantJsonData);
    if (plantsData != null) {
      if (plantsData.length) {

        this.allPlantsList = plantsData
      }
      else {
        this.allPlantsList.push(plantsData)
      }


    }
    let arraybotData: any = []
    arraybotData = jsonata("data[" + plantsPredicateQuery + "].knu[" + knuPredicateQuery + "].status[" + statusPredicateQuery + "].bot").evaluate(this.plantJsonData)
    if (arraybotData != null) {
      if (arraybotData.length) {
        this.allBotList = arraybotData
      }
      else {
        this.allBotList.push(arraybotData)
      }
    }
    this.summaryPlantData();
    this.botPlantStatus();
    this.cleaningSchedule();
    this.getavgUptimeData();
    this.value1 = !this.value1;
    this.childNotifier.next(this.plantId);

  }
  getKnuList(plant) {
    if (plant[0] != null) {
      this.plants = plant
      this.allKnuList = []
      let plantPredicateQuery = '*';
      let plantPredicateList = [];
      plant.forEach(id => {
        plantPredicateList.push("id=" + "'" + id.id + "'");
      })
      if (plantPredicateList.length > 0) {
        plantPredicateQuery = plantPredicateList.join(" or ");
      }
      let arrayData: any = []
      arrayData = jsonata("data[" + plantPredicateQuery + "].knu").evaluate(this.plantJsonData)
      if (arrayData != null) {
        this.allKnuList = arrayData
      }
    }
    else {
      this.allKnuList = []
      this.plants = []
      this.allSelected1 = false
      this.allKnu1 = false
    }
if(plant == 0){
  plantId: string = localStorage.getItem('plant')
}
    this.plantId = ''
    plant.forEach(id => {

      if (this.plantId == undefined || this.plantId == null || this.plantId == '') {
        this.plantId = id.id
      }
      else {

        this.plantId = this.plantId + "," + id.id
      }
    })

    if (this.allselectedplantstatus.selected) {
      if (this.allPlantsList.length == plant.length) {
        this.getPlants(this.plants)
      }
    } else if (this.allselectedplantstatus.disselected) {
      if (this.allPlantsList.length == 0) {
        this.getPlants(this.plants)
      }
    }
    else {
      this.getPlants(this.plants)
    }
    this.allselectedplantstatus.selected = false
    this.allselectedplantstatus.disselected = false

  }
  getStatusList(knu) {
    if (knu[0] != null) {
      this.knu = knu
      this.botStatusList = []
      this.allSelected2 = false
      this.botStatus1 = false
      let knuPredicateQuery = '*';
      let knuPredicateList = [];

      knu.forEach(id => {
        knuPredicateList.push("id=" + "'" + id.id + "'");
      })
      if (knuPredicateList.length > 0) {
        knuPredicateQuery = knuPredicateList.join(" or ");
      }
      let arrayData: any = []
      let arrayData1: any = []
      arrayData = jsonata("data[*].knu[" + knuPredicateQuery + "].status").evaluate(this.plantJsonData)
      let newData = Array.isArray(arrayData) ? arrayData : [arrayData];
      arrayData1 = _.sortedUniqBy(newData, (o) => {
        return o.name;
      })
      if (arrayData1 != null) {
        this.botStatusList = arrayData1
      }
    }
    else {
      this.botStatusList = []
      this.knu = []
    }
    this.knuId = ''
    knu.forEach(id => {
      if (this.knuId == undefined || this.knuId == null || this.knuId == '') {
        this.knuId = id.id
      }
      else {
        this.knuId = this.knuId + "," + id.id
      }
    })
    this.value2 = !this.value2;
    this.knuchildNotifier.next(this.knuId);
    if (this.allselectedknustatus.selected) {

      if (this.allKnuList.length == knu.length) {
        this.getPlants(this.plants, this.knu)
      }
    } else if (this.allselectedknustatus.disselected) {
      if (this.allKnuList.length == 0) {
        this.getPlants(this.plants, this.knu)
      }
    }
    else {
      this.getPlants(this.plants, this.knu)
    }
    this.allselectedknustatus.selected = false
    this.allselectedknustatus.disselected = false

  }
  getBot(status) {
    if (status[0] != null) {
      this.status = status
      this.allPlantsList = []
    }
    else {
      this.allPlantsList = []
      this.status = []
    }
    this.statusName = ''
    status.forEach(id => {
      if (this.statusName == undefined || this.statusName == null || this.statusName == '') {
        this.statusName = id.name
      }
      else {
        this.statusName = this.statusName + "," + id.name
      }
    })
    this.value3 = !this.value3;
    this.stauschildNotifier.next(this.statusName);
    if (this.allselectedbotstatus.selected) {

      if (this.botStatusList.length == status.length) {
        this.getPlants(this.plants, this.knu, status)
      }
    } else if (this.allselectedbotstatus.disselected) {
      if (this.botStatusList.length == 0) {
        this.getPlants(this.plants, this.knu, status)
      }
    }
    else {
      this.getPlants(this.plants, this.knu, status)
    }
    this.allselectedbotstatus.selected = false
    this.allselectedbotstatus.disselected = false

  }
  getBotList(bot) {
    this.botId = ''
    bot.forEach(id => {
      if (this.botId == undefined || this.botId == null || this.botId == '') {
        this.botId = id.id
      }
      else {
        this.botId = this.botId + "," + id.id
      }
    })
    this.value4 = !this.value4;
    this.botchildNotifier.next(this.botId);
    if (this.allselectedbot.selected) {

      if (this.allBotList.length == bot.length) {
        this.getPlants(this.plants, this.knu, this.status);
      }
    } else if (this.allselectedbot.disselected) {
      if (this.allBotList.length == 0) {
        this.getPlants(this.plants, this.knu, this.status);
      }
    }
    else {
      this.getPlants(this.plants, this.knu, this.status);
    }
    this.allselectedbot.selected = false
    this.allselectedbot.disselected = false

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

