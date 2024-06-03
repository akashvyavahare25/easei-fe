//@ts-nocheck
import { Component, Input, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import { Router } from '@angular/router'
import HC_heatmap from 'highcharts/modules/heatmap';
import { DataService } from '../../../../src/app/data.service';
import { OemService } from '../../../../src/app/services/oem/oem-service.service';
import { OemNcuService } from '../../../../src/app/services/oem/oem-ncu.service';
import { Subject } from 'rxjs';
import { DayTableSlicer } from '@fullcalendar/daygrid';
HC_heatmap(Highcharts);
@Component({
  selector: 'app-constantheatmap',
  templateUrl: './constantheatmap.component.html',
  styleUrls: ['./constantheatmap.component.scss']
})
export class ConstantheatmapComponent implements OnInit {
  flag: Boolean = false
  knuFlag: Boolean = false
  ncuFlag: Boolean = false
  renewFlag: boolean = false
  routerUrl: string
  @Input() id: any
  @Input() idNotifier: Subject<any>;
  visible: boolean
  knuData: any = [];
  bcuData: any;
  x: any
  y: any
  ncuid: any = ''
  Highcharts: typeof Highcharts = Highcharts;
  constructor(private router: Router, private service: DataService, private oemService: OemService, private oemNcuService: OemNcuService) {
    this.routerUrl = router.url;
    this.flag = true
    if (this.routerUrl.includes("/front/portfolio/renewSolarForm/")) {
      this.renewFlag = true;
    }
    if (this.routerUrl.includes("/front/oem/dashboard/ncu")) {
      this.ncuFlag = true
      this.getBcuDetailsByNcu(this.ncuid)
    }
    else {
      this.ncuFlag = false
    }
    if (this.routerUrl.includes("/front/oem/dashboard/new")) {
      this.knuFlag = true
      this.getKNUDetails()
    }
    else {
      this.knuFlag = false
    }
  }


  ngOnInit(): void {
    setTimeout(() => {
      // this.show(),
      this.show2()
    }, 200);

    this.idNotifier.subscribe(data => {
      if (data) {
        this.ncuid = ''
        this.ncuid = data

        this.getBcuDetailsByNcu(this.ncuid)
      }
    }
    );
  }
  getBcuDetailsByNcu(id) {
    let ncu = id.length > 0 ? "&knu=" + id : ""
    this.oemNcuService.getbcuDetailsByNcu(ncu).subscribe(res => {
      this.bcuData = res.data
      this.getColumn(this.bcuData)
      this.show1()
    })
  }


  getKNUDetails() { 
    this.oemService.getKnuStatus().subscribe(res => {
      this.knuData = res.data;
      this.getColumn(this.knuData)
      this.show();
    })
  }
  getColumn(data) {
    let flag = false
    let rows = 0
    let cols = 0
    let output = 0
    let row = 0
    let col = 0
    let min = 0
    let max = 0
    let reduseIteration = 0
    let datalength = data.length
    if (datalength != 0) {
      if (datalength == 2) {
        flag = true
        col = datalength
      }
      else {
        if (datalength > 3) {
          reduseIteration = datalength / 2
        } else {
          reduseIteration = datalength
        }
        for (let i = 1; i <= reduseIteration; i++) {
          if (i > 1) {
            output = datalength / i
            if (this.isInt(datalength / i) || datalength == 3) {
              flag = true
              if (output >= i) {
                if (output >= i) {
                  row = i
                  col = output
                }
              }
            }
            else {
              if (output >= i) {
                if (output >= i) {
                  min = i
                  max = output
                }
              }
            }
          }
        }
      }
      if (flag) {
        cols = col
        rows = row
      }
      else {
        cols = parseInt(max) + 1
        rows = parseInt(min)
      }
      this.getNCUPositions(data, cols)
    }

  }

  getHeatmapData() {
    this.oemService.getKnuStatus().subscribe(res => {
      let data = res.data
      this.getColumn(data)
    })
  }

  isInt(val): boolean {
    return val % 1 === 0
  }

  getNCUPositions(data: any, cols: number) {
    let k = 1;
    let i = 1; let j = 1
    data.forEach(element => {
      element['x'] = k
      element['y'] = j
      if (this.ncuFlag) {
        this.addColor(element)
      }else{
        this.addColorKNU(element)
      }
      k++
      if (i % cols == 0) {
        k = 1
        j++
      }
      i++
    });
  }
  addColor(element) {
    let color = "" 
    switch (element.plantbcustatus) {
      case "Normal at the docking station":
        color = "#bcf0ec"
        // position=1
        break
      case "Normal and cleaning":
        color = "#26a69a"
        // position=2
        break
      case "Strained and cleaning":
        color = "#ffd20a"
        // position=3
        break
      case "Breakdown":
        color = "#e57373"
        // position=4
        break
      case "Not communicating":
        color = "#ee2a41"
        // position=5
        break
      case "Aborted for emergency":
        color = "#8e101f"
        // position=6
        break
    }
    element['color'] = color
    element['value'] = 85
  }
  addColorKNU(element) {
    let color = "" 
     switch (element.colourStatus) {
      case "Communicating and power supply is normal":
        color = "#BCF0EC"
         break
        case "Communicating but backup battery/anemometer not communicating":
        color = "#FFF0AD"
         break
        case "Not communicating/breakdown condition/showing alarms":
          color = "#FAC7CD"
          break
    }
    element['color'] = color
    // element['value'] = 85
  }
  show(): void {
    const refreshChart = Highcharts.chart('container1', {
      chart: {
        spacingBottom: 0,
        spacingTop: 0,
        spacingLeft: 10,
        spacingRight: 40,
        height: 200,
      },
      exporting: { enabled: false },
      credits: {
        enabled: false
      },
      colorAxis:
      {
        reversed: false,
        min: 98,
        max: 100,
        minColor: '#BCF0EC',
        maxColor: '#FAC7CD',
        labels: {
          format: '{value:f}%',
          style: {
            color: 'black',
            fontSize: '12px'
          }
        },
        stops: [
          [0.1, '#FAC7CD'],
          [0.5, '#FFF0AD'],
          [0.9, '#BCF0EC'],
        ]
      },

      xAxis: {
        visible: false,
      },
      yAxis: {
        visible: false,
      },

      legend: {
        enabled: false,
        title: {
          text: 'Uptime'
        },
        align: 'right',
        layout: 'vertical',
        margin: 25,
        verticalAlign: 'top',
        y: 0,
        symbolHeight: 200,
      },
      tooltip: {
        style: {
          color: '#FFFFFF',
          fontSize: "14px"
        },
        backgroundColor: '#626262',
        borderColor: '#626262',
        formatter: function () {
          return '<b>NCU Status </b> </br>  <span>NCU ID:' + this.point.knuid + ' </span> </br><span>IC Pad No: ' + this.point.ic_pad_no + '</span> </br> <span>No Of BOT Connected: ' + this.point.no_of_bots_connected + '</span> </br> <span>NCU Alarms: ' + this.point.no_of_alarms_raised_in_ncu + '</span> ';
        }
      },
      title: {
        text: undefined
      },
      series: [
        {
          name: 'KNU Status',
          type: 'heatmap',
          borderWidth: 1,
          borderColor: '#fff',
          data: this.knuData,
            dataLabels: {
            enabled: false,
            // color: '#000000',
          },

        },
      ],

    })

  }
  show1(): void {
    const chart = Highcharts.chart('container', {
      chart: {
        spacingBottom: 0,
        spacingTop: 0,
        spacingLeft: 10,
        spacingRight: 0,
        height: 250,
      },
      exporting: { enabled: false },
      credits: {
        enabled: false
      },
      colorAxis:
      {
        reversed: false,
        min: 98,
        max: 100,
        minColor: '#BCF0EC',
        maxColor: '#FAC7CD',
        labels: {
          format: '{value:f}%',
          style: {
            color: 'black',
            fontSize: '12px'
          }
        },
        stops: [
          [0.1, '#FAC7CD'],
          [0.5, '#FFF0AD'],
          [0.9, '#BCF0EC'],
        ]
      },

      xAxis: {
        visible: false,

      },
      yAxis: {
        visible: false,

      },

      legend: {
        enabled: false,
        title: {
          text: 'Uptime'
        },
        align: 'right',
        layout: 'vertical',
        margin: 25,
        verticalAlign: 'top',
        y: 0,
        symbolHeight: 200,
      },
      tooltip: {
        style: {
          color: '#FFFFFF',
          fontSize: "14px"
        },
        backgroundColor: '#626262',
        borderColor: '#626262',
        formatter: function () {
          return '<b>BCU ID:' + this.point.bcuid + ' </b> </br>  <span>IC Pad No:' + this.point.ic_pad_no + ' </span> </br> <span>Status:' + this.point.plantbcustatus + '</span> </br><span>Alarms:' + this.point.no_of_alarms_raised_in_ncu + '</span>';
        }
      },
      title: {
        text: undefined
      },
      series: [
        {
          name: 'KNU Status',
          type: 'heatmap',
          borderWidth: 1,
          borderColor: '#fff',
          data: this.bcuData,
          dataLabels: {
            enabled: false,
            // color: '#000000',
          },

        },
      ],

    })
  }
  show2(): void {
    const chart = Highcharts.chart('container2', {
      chart: {
        spacingBottom: 0,
        spacingTop: 0,
        spacingLeft: 10,
        spacingRight: 10,
        height: 300,
      },
      exporting: { enabled: false },
      credits: {
        enabled: false
      },
      colorAxis:
      {
        reversed: false,
        min: 98,
        max: 100,
        minColor: '#BCF0EC',
        maxColor: '#FAC7CD',
        labels: {
          format: '{value:f}%',
          style: {
            color: 'black',
            fontSize: '12px'
          }
        },
        stops: [
          [0.1, '#FAC7CD'],
          [0.5, '#FFF0AD'],
          [0.9, '#BCF0EC'],
        ]
      },
      xAxis: {
        visible: false,
      },
      yAxis: {
        visible: false,
      },

      legend: {
        title: {
          text: 'Uptime'
        },
        align: 'right',
        layout: 'vertical',
        margin: 25,
        verticalAlign: 'top',
        y: 0,
        symbolHeight: 250,
      },
      tooltip: {
        style: {
          color: '#FFFFFF',
          fontSize: "14px"
        },
        backgroundColor: '#626262',
        borderColor: '#626262',
        formatter: function () {
          return '<b>KNU Status </b> </br>  <span>KNU ID: 1 </span> </br> <span>Average Uptime:</span> ' + this.point.value + '%' + ' </br><span>IC Connected: demo</span> </br> <span>BOT installed: 236 </span> </br> <span>No of Alarms: 10</span> ';
        }
      },
      title: {
        text: undefined
      },
      series: [
        {
          name: 'KNU Status',
          type: 'heatmap',
          borderWidth: 1,
          borderColor: '#fff',
          data: [{
            x: 0,
            y: 0,
            value: 100,
            // name: "Point2",
          }, {
            x: 0,
            y: 1,
            value: 19,
            // name: "Point2",
            color: "#FFF0AD"
          }, {
            x: 0,
            y: 2,
            value: 8,
            name: "Point2",
            color: "#FAC7CD"
          }, {
            x: 0,
            y: 3,
            value: 24,
            name: "Point2",
            color: "#FFF0AD"
          }, {
            x: 0,
            y: 4,
            value: 67,
            name: "Point2",
            color: "#BCF0EC"
          }, {
            x: 0,
            y: 5,
            value: 67,
            name: "Point2",
            color: "#FFF0AD"
          }, {
            x: 0,
            y: 6,
            value: 67,
            name: "Point2",
            color: "#BCF0EC"
          }, {
            x: 0,
            y: 7,
            value: 67,
            name: "Point2",
            color: "#BCF0EC"
          }, {
            x: 0,
            y: 8,
            value: 67,
            name: "Point2",
            color: "#BCF0EC"
          }, {
            x: 1,
            y: 0,
            value: 92,
            name: "Point2",
            color: "#FAC7CD"
          }, {
            x: 1,
            y: 1,
            value: 58,
            name: "Point2",
            color: "#FAC7CD"
          }, {
            x: 1,
            y: 2,
            value: 78,
            name: "Point2",
            color: "#FAC7CD"
          }, {
            x: 1,
            y: 3,
            value: 117,
            name: "Point2",
            color: "#FAC7CD"
          }, {
            x: 1,
            y: 4,
            value: 48,
            name: "Point2",
            color: "#FFF0AD"
          }, {
            x: 1,
            y: 5,
            value: 48,
            name: "Point2",
            color: "#BCF0EC"
          }, {
            x: 1,
            y: 6,
            value: 48,
            name: "Point2",
            color: "#BCF0EC"
          }, {
            x: 1,
            y: 7,
            value: 48,
            name: "Point2",
            color: "#BCF0EC"
          }, {
            x: 1,
            y: 8,
            value: 48,
            name: "Point2",
            color: "#BCF0EC"
          }, {
            x: 2,
            y: 0,
            value: 35,
            name: "Point2",
            color: "#FAC7CD"
          }, {
            x: 2,
            y: 1,
            value: 15,
            name: "Point2",
            color: "#FFF0AD"
          }, {
            x: 2,
            y: 2,
            value: 64,
            name: "Point1",
            color: "#FAC7CD"
          }, {
            x: 2,
            y: 3,
            value: 123,
            name: "Point1",
            color: "#FFF0AD"
          }, {
            x: 2,
            y: 4,
            value: 52,
            name: "Point1",
            color: "#BCF0EC"
          }, {
            x: 2,
            y: 5,
            value: 52,
            name: "Point1",
            color: "#FFF0AD"
          }, {
            x: 2,
            y: 6,
            value: 52,
            name: "Point1",
            color: "#BCF0EC"
          }, {
            x: 2,
            y: 7,
            value: 52,
            name: "Point1",
            color: "#BCF0EC"
          }, {
            x: 2,
            y: 8,
            value: 52,
            name: "Point1",
            color: "#BCF0EC"
          }, {
            x: 3,
            y: 0,
            value: 72,
            name: "Point1",
            color: "#FAC7CD"
          }, {
            x: 3,
            y: 1,
            value: 25,
            name: "Point1",
            color: "#FFF0AD"
          }, {
            x: 3,
            y: 2,
            value: 25,
            name: "Point1",
            color: "#FFF0AD"
          }, {
            x: 3,
            y: 3,
            value: 60,
            name: "Point1",
            color: "#FFF0AD"
          }, {
            x: 3,
            y: 4,
            value: 70,
            name: "Point1",
            color: "#FFF0AD"
          }, {
            x: 3,
            y: 5,
            value: 70,
            name: "Point1",
            color: "#FFF0AD"
          }, {
            x: 3,
            y: 6,
            value: 70,
            name: "Point1",
            color: "#BCF0EC"
          }, {
            x: 3,
            y: 7,
            value: 70,
            name: "Point1",
            color: "#BCF0EC"
          }, {
            x: 3,
            y: 8,
            value: 70,
            name: "Point1",
            color: "#BCF0EC"
          }, {
            x: 4,
            y: 0,
            value: 25,
            name: "Point1",
            color: "#FAC7CD"
          }, {
            x: 4,
            y: 1,
            value: 65,
            name: "Point1",
            color: "#FAC7CD"
          }, {
            x: 4,
            y: 2,
            value: 87,
            name: "Point1",
            color: "#FAC7CD"
          }, {
            x: 4,
            y: 3,
            value: 64,
            name: "Point1",
            color: "#FAC7CD"
          }, {
            x: 4,
            y: 4,
            value: 21,
            name: "Point1",
            color: "#FFF0AD"
          }, {
            x: 4,
            y: 5,
            value: 21,
            name: "Point1",
            color: "#FFF0AD"
          }, {
            x: 4,
            y: 6,
            value: 21,
            name: "Point1",
            color: "#BCF0EC"
          }, {
            x: 4,
            y: 7,
            value: 21,
            name: "Point1",
            color: "#BCF0EC"
          }, {
            x: 4,
            y: 8,
            value: 21,
            name: "Point1",
            color: "#BCF0EC"
          }, {
            x: 5,
            y: 0,
            value: 36,
            name: "Point1",
            color: "#FAC7CD"
          }, {
            x: 5,
            y: 1,
            value: 12,
            name: "Point1",
            color: "#FAC7CD"
          }, {
            x: 5,
            y: 2,
            value: 44,
            name: "Point1",
            color: "#FAC7CD"
          }, {
            x: 5,
            y: 3,
            value: 49,
            name: "Point1",
            color: "#FFF0AD"
          }, {
            x: 5,
            y: 4,
            value: 85,
            name: "Point1",
            color: "#FFF0AD"
          }, {
            x: 5,
            y: 5,
            value: 85,
            name: "Point1",
            color: "#FFF0AD"
          }, {
            x: 5,
            y: 6,
            value: 85,
            name: "Point1",
            color: "#BCF0EC"
          }, {
            x: 5,
            y: 7,
            value: 85,
            name: "Point1",
            color: "#BCF0EC"
          }, {
            x: 5,
            y: 8,
            value: 85,
            name: "Point1",
            color: "#BCF0EC"
          },
          {
            x: 6,
            y: 0,
            value: 85,
            name: "Point1",
            color: "#FAC7CD"
          },
          {
            x: 6,
            y: 1,
            value: 85,
            name: "Point1",
            color: "#FAC7CD"
          }, {
            x: 6,
            y: 2,
            value: 85,
            name: "Point1",
            color: "#FFF0AD"
          }, {
            x: 6,
            y: 3,
            value: 85,
            name: "Point1",
            color: "#FFF0AD"
          }, {
            x: 6,
            y: 4,
            value: 85,
            name: "Point1",
            color: "#FFF0AD"
          }, {
            x: 6,
            y: 5,
            value: 85,
            name: "Point1",
            color: "#FFF0AD"
          }, {
            x: 6,
            y: 6,
            value: 85,
            name: "Point1",
            color: "#BCF0EC"
          }, {
            x: 6,
            y: 7,
            value: 85,
            name: "Point1",
            color: "#BCF0EC"
          }, {
            x: 6,
            y: 8,
            value: 85,
            name: "Point1",
            color: "#BCF0EC"
          },
          {
            x: 6,
            y: 8,
            value: 85,
            name: "Point1",
            color: "#BCF0EC"
          }, {
            x: 7,
            y: 0,
            value: 85,
            name: "Point1",
            color: "#FAC7CD"
          }, {
            x: 7,
            y: 1,
            value: 85,
            name: "Point1",
            color: "#FFF0AD"
          }, {
            x: 7,
            y: 2,
            value: 85,
            name: "Point1",
            color: "#FFF0AD"
          }, {
            x: 7,
            y: 3,
            value: 85,
            name: "Point1",
            color: "#FFF0AD"
          }, {
            x: 7,
            y: 4,
            value: 85,
            name: "Point1",
            color: "#FFF0AD"
          }, {
            x: 7,
            y: 5,
            value: 85,
            name: "Point1",
            color: "#FFF0AD"
          }, {
            x: 7,
            y: 6,
            value: 85,
            name: "Point1",
            color: "#FFF0AD"
          }, {
            x: 7,
            y: 7,
            value: 85,
            name: "Point1",
            color: "#BCF0EC"
          }, {
            x: 7,
            y: 8,
            value: 85,
            name: "Point1",
            color: "#BCF0EC"
          }, {
            x: 8,
            y: 0,
            value: 85,
            name: "Point1",
            color: "#FAC7CD"
          }, {
            x: 8,
            y: 1,
            value: 85,
            name: "Point1",
            color: "#FAC7CD"
          }, {
            x: 8,
            y: 2,
            value: 85,
            name: "Point1",
            color: "#FAC7CD"
          }, {
            x: 8,
            y: 3,
            value: 85,
            name: "Point1",
            color: "#FAC7CD"
          }, {
            x: 8,
            y: 4,
            value: 85,
            name: "Point1",
            color: "#FFF0AD"
          }, {
            x: 8,
            y: 5,
            value: 85,
            name: "Point1",
            color: "#FFF0AD"
          }, {
            x: 8,
            y: 6,
            value: 85,
            name: "Point1",
            color: "#BCF0EC"
          }, {
            x: 8,
            y: 7,
            value: 85,
            name: "Point1",
            color: "#BCF0EC"
          }, {
            x: 8,
            y: 8,
            value: 85,
            name: "Point1",
            color: "#BCF0EC"
          }, {
            x: 9,
            y: 0,
            value: 95,
            name: "Point1",
            color: "#FAC7CD"
          }, {
            x: 9,
            y: 1,
            value: 95,
            name: "Point1",
            color: "#FAC7CD"
          }, {
            x: 9,
            y: 2,
            value: 95,
            name: "Point1",
            color: "#FAC7CD"
          }, {
            x: 9,
            y: 3,
            value: 95,
            name: "Point1",
            color: "#FFF0AD"
          }, {
            x: 9,
            y: 4,
            value: 95,
            name: "Point1",
            color: "#FFF0AD"
          }, {
            x: 9,
            y: 5,
            value: 95,
            name: "Point1",
            color: "#FFF0AD"
          }, {
            x: 9,
            y: 6,
            value: 95,
            name: "Point1",
            color: "#FFF0AD"
          }, {
            x: 9,
            y: 7,
            value: 95,
            name: "Point1",
            color: "#FFF0AD"
          }, {
            x: 9,
            y: 8,
            value: 95,
            name: "Point1",
            color: "#BCF0EC"
          }, {
            x: 10,
            y: 0,
            value: 95,
            name: "Point1",
            color: "#FAC7CD"
          }, {
            x: 10,
            y: 1,
            value: 95,
            name: "Point1",
            color: "#FAC7CD"
          }, {
            x: 10,
            y: 2,
            value: 95,
            name: "Point1",
            color: "#FFF0AD"
          }, {
            x: 10,
            y: 3,
            value: 95,
            name: "Point1",
            color: "#FFF0AD"
          }, {
            x: 10,
            y: 4,
            value: 95,
            name: "Point1",
            color: "#FFF0AD"
          }, {
            x: 10,
            y: 5,
            value: 95,
            name: "Point1",
            color: "#FFF0AD"
          }, {
            x: 10,
            y: 6,
            value: 95,
            name: "Point1",
            color: "#FFF0AD"
          }, {
            x: 10,
            y: 7,
            value: 95,
            name: "Point1",
            color: "#BCF0EC"
          }, {
            x: 10,
            y: 8,
            value: 95,
            name: "Point1",
            color: "#BCF0EC"
          }, {
            x: 11,
            y: 0,
            value: 95,
            name: "Point1",
            color: "#FAC7CD"
          }, {
            x: 11,
            y: 1,
            value: 95,
            name: "Point1",
            color: "#FFF0AD"
          }, {
            x: 11,
            y: 2,
            value: 95,
            name: "Point1",
            color: "#FFF0AD"
          }, {
            x: 11,
            y: 3,
            value: 95,
            name: "Point1",
            color: "#FFF0AD"
          }, {
            x: 11,
            y: 4,
            value: 95,
            name: "Point1",
            color: "#FFF0AD"
          }, {
            x: 11,
            y: 5,
            value: 95,
            name: "Point1",
            color: "#FFF0AD"
          }, {
            x: 11,
            y: 6,
            value: 95,
            name: "Point1",
            color: "#FFF0AD"
          }, {
            x: 11,
            y: 7,
            value: 95,
            name: "Point1",
            color: "#FFF0AD"
          }, {
            x: 11,
            y: 8,
            value: 95,
            name: "Point1",
            color: "#BCF0EC"
          }, {
            x: 12,
            y: 0,
            value: 95,
            name: "Point1",
            color: "#FAC7CD"
          }, {
            x: 12,
            y: 1,
            value: 95,
            name: "Point1",
            color: "#FFF0AD"
          }, {
            x: 12,
            y: 2,
            value: 95,
            name: "Point1",
            color: "#FAC7CD"
          }, {
            x: 12,
            y: 3,
            value: 95,
            name: "Point1",
            color: "#FFF0AD"
          }, {
            x: 12,
            y: 4,
            value: 95,
            name: "Point1",
            color: "#FFF0AD"
          }, {
            x: 12,
            y: 5,
            value: 95,
            name: "Point1",
            color: "#FFF0AD"
          }, {
            x: 12,
            y: 6,
            value: 95,
            name: "Point1",
            color: "#FFF0AD"
          }, {
            x: 12,
            y: 7,
            value: 95,
            name: "Point1",
            color: "#FFF0AD"
          }, {
            x: 12,
            y: 8,
            value: 95,
            name: "Point1",
            color: "#BCF0EC"
          }, {
            x: 13,
            y: 0,
            value: 95,
            name: "Point1",
            color: "#FAC7CD"
          }, {
            x: 13,
            y: 1,
            value: 95,
            name: "Point1",
            color: "#FAC7CD"
          }, {
            x: 13,
            y: 2,
            value: 95,
            name: "Point1",
            color: "#FFF0AD"
          }, {
            x: 13,
            y: 3,
            value: 95,
            name: "Point1",
            color: "#FFF0AD"
          }, {
            x: 13,
            y: 4,
            value: 95,
            name: "Point1",
            color: "#FFF0AD"
          }, {
            x: 13,
            y: 5,
            value: 95,
            name: "Point1",
            color: "#FFF0AD"
          }, {
            x: 13,
            y: 6,
            value: 95,
            name: "Point1",
            color: "#FFF0AD"
          }, {
            x: 13,
            y: 7,
            value: 95,
            name: "Point1",
            color: "#BCF0EC"
          }, {
            x: 13,
            y: 8,
            value: 95,
            name: "Point1",
            color: "#BCF0EC"
          }, {
            x: 14,
            y: 0,
            value: 95,
            name: "Point1",
            color: "#FAC7CD"
          }, {
            x: 14,
            y: 1,
            value: 95,
            name: "Point1",
            color: "#FFF0AD"
          }, {
            x: 14,
            y: 2,
            value: 95,
            name: "Point1",
            color: "#FFF0AD"
          }, {
            x: 14,
            y: 3,
            value: 95,
            name: "Point1",
            color: "#FFF0AD"
          }, {
            x: 14,
            y: 4,
            value: 95,
            name: "Point1",
            color: "#FFF0AD"
          }, {
            x: 14,
            y: 5,
            value: 95,
            name: "Point1",
            color: "#BCF0EC"
          }, {
            x: 14,
            y: 6,
            value: 95,
            name: "Point1",
            color: "#BCF0EC"
          }, {
            x: 14,
            y: 7,
            value: 95,
            name: "Point1",
            color: "#FFF0AD"
          }, {
            x: 14,
            y: 8,
            value: 95,
            name: "Point1",
            color: "#BCF0EC"
          }, {
            x: 15,
            y: 0,
            value: 95,
            name: "Point1",
            color: "#FAC7CD"
          }, {
            x: 15,
            y: 1,
            value: 95,
            name: "Point1",
            color: "#FFF0AD"
          }, {
            x: 15,
            y: 2,
            value: 95,
            name: "Point1",
            color: "#FFF0AD"
          }, {
            x: 15,
            y: 3,
            value: 95,
            name: "Point1",
            color: "#FFF0AD"
          }, {
            x: 15,
            y: 4,
            value: 95,
            name: "Point1",
            color: "#FFF0AD"
          }, {
            x: 15,
            y: 5,
            value: 95,
            name: "Point1",
            color: "#BCF0EC"
          }, {
            x: 15,
            y: 6,
            value: 95,
            name: "Point1",
            color: "#BCF0EC"
          }, {
            x: 15,
            y: 7,
            value: 95,
            name: "Point1",
            color: "#BCF0EC"
          }, {
            x: 15,
            y: 8,
            value: 95,
            name: "Point1",
            color: "#BCF0EC"
          },
          ],
          dataLabels: {
            enabled: false,
            // color: '#000000',
          },

        },
      ],
    })
  }
}
