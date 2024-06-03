//@ts-nocheck
import { Component, ViewChild, OnInit } from '@angular/core';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { LiveAnnouncer } from '@angular/cdk/a11y'; 
import { OembcuService } from '../../../services/oem/oem-bcu.serivce';

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
import { data } from 'jquery';

export type anemometerGraph = {
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
  start_time: string;
  duration_abort: string;
  max_speed_abort: string;
  avg_speed: string;
}
const ELEMENT_DATA: PeriodicElement[] = [
  // { start_time: '03:21:33 AM', duration_abort: '1 hr 5 min', max_speed_abort: '15 m/s', avg_speed: '15 m/s' },
  // { start_time: '03:21:33 AM', duration_abort: '1 hr 5 min', max_speed_abort: '15 m/s', avg_speed: '15 m/s' },
  // { start_time: '03:21:33 AM', duration_abort: '1 hr 5 min', max_speed_abort: '15 m/s', avg_speed: '15 m/s' },
  // { start_time: '03:21:33 AM', duration_abort: '1 hr 5 min', max_speed_abort: '15 m/s', avg_speed: '15 m/s' },
  // { start_time: '03:21:33 AM', duration_abort: '1 hr 5 min', max_speed_abort: '15 m/s', avg_speed: '15 m/s' },
]
@Component({
  selector: 'app-wind-dashboard',
  templateUrl: './wind-dashboard.component.html',
  styleUrls: ['./wind-dashboard.component.scss']
})
export class WindDashboardComponent implements OnInit {
  displayedColumns: string[] = ['start_time', 'duration_abort', 'max_speed_abort', 'avg_speed'];
  dataSource = new MatTableDataSource(ELEMENT_DATA); 
  @ViewChild("chart") chart: ChartComponent;
  public anemometerGraph: Partial<anemometerGraph> | any;
  constructor(private service:OembcuService) { }

  ngOnInit(): void {
    setTimeout(() => {
      this.show()
     
    },200);

  }

  show(): void {

       this.service.getWindData().subscribe(res=>{
      
    /*  const chart = Highcharts.chart('container', {
       chart: {
         gridLineWidth: 2,
         // gridZIndex: 3
       },
       title: {
         text: undefined
       },
 
       yAxis: {
         type: 'linear',
         // lineColor: '#000000',
         // lineWidth: 1,
         visible: true,
       },
 
       xAxis: {
         title: {
           text: "Time(hour)",
         },
         // categories:['00:00:00 AM','12:00:00 AM','3:00:00 AM','6:00:00 AM','8:00:00 AM','9:00:00 AM','11:00:00 AM'],
         // type: 'datetime',
         // formatter: function () {
 
         // return Highcharts.dateFormat('%Y-%m-%d', this.value);
         // },
         type: 'datetime',
         labels: {
           formatter: function() {
              var h=new Date().getHours();
               var	m = new Date().getMinutes();
               var  s=new Date().getSeconds();
             return h + ':' + m + ':' + s;
           }
         },
         // categories:['00:00:00','12:00:00 AM','3:00:00 AM','6:00:00 AM','8:00:00 AM','9:00:00 AM','11:00:00 AM'],
         gridLineWidth: 1,
         gridZIndex: 4,
 
         accessibility: {
           // rangeDescription: 'Range: 2010 to 2017'
         },
 
       },
 
       legend: {
         layout: 'horizontal',
         align: 'center',
         verticalAlign: 'top'
       },
 
       plotOptions: {
         series: {
           label: {
             enabled: false,
             connectorAllowed: false
           },
           marker: {
             enabled: false
           },
           // pointStart: Date.UTC(1, 13, 0, 0, 0)
           // pointStart: 12
         }
       },
 
       series: [{
         name: 'Wind Velocity (m/s)',
         data: [5, 4, 6, 1, 0, 7]
       }, {
         name: 'Wind Velocity (m/s)',
         data: [8, 3, 11, 1, 5, 4]
       }, {
         name: 'Wind Velocity (m/s)',
         data: [2, 4, 2, 8, 1, 7]
       }, {
         name: 'Wind Velocity (m/s)',
         data: [11, 8, 1, 9, 4, 12]
       }
       ],
 
       responsive: {
         rules: [{
           condition: {
             maxWidth: 500
           },
           chartOptions: {
             legend: {
               enabled: false,
               layout: 'horizontal',
               align: 'center',
               horizontalAlign: 'top'
 
             }
           }
         }]
       }
 
     }); */
     
    this.anemometerGraph = {
      annotations: {
        xaxis: [
          {
            x:  res.annotations.x, 
            x2: res.annotations.x2, 
            strokeDashArray: 0,
            borderColor: "#FF0000",
            tooltip:{
              enabled: true,
              title:{
                text:'Wind aborted'
              }
            }
          },
          {
            x: res.annotations.x, 
            strokeDashArray: 0,
            borderColor: "#FF0000",
            tooltip:{
              enabled: true,
              title:{
                text:'Wind aborted'
              }
            }
          },
          {
            x: res.annotations.x2, 
            borderColor: "#008000",
            strokeDashArray: 0,
            fillColor: '#808080',
            tooltip:{
              enabled: true,
            }
          }
        ]
      },
      series: res.series,
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
        curve: 'straight',
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
          format: 'h:MM:s',
          // formatter: function (value) {
          //   let oDate = new Date(value);
          //   return '' + oDate.getUTCHours() + ':' + oDate.getMinutes().toString().padStart(2, 0);
          // },
        },
        type: 'datetime',
        // categories: ['0:00:00','1.00.00','2.00.00','3.00.00']
        // categories: [2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016],
        // gridLineWidth: 1,
        // gridZIndex: 3,
        datetimeUTC: false
      },
      grid: {
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
      /*   colors: [
          "#6F6BF4",
          "#EE2A41",
          "#FF9D00",
          "#26A69A",
          "#F68D5D"
  
        ], */
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
  })

  this.service.getWindTableData().subscribe(res=>{
    this.dataSource= new MatTableDataSource(res.series); 
    this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;       })
  }
  @ViewChild(MatSort) sort: MatSort;
  // @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    // this.dataSource.paginator = this.paginator;
  }

  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }
}
