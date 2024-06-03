import { Component, Input, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import HC_heatmap from 'highcharts/modules/heatmap';
import { Subject } from 'rxjs';
import { PlantServiceService } from '../../../../services/plants/plant-service.service';
HC_heatmap(Highcharts);
@Component({
  selector: 'app-heatmap1',
  templateUrl: './heatmap1.component.html',
  styleUrls: ['./heatmap1.component.scss']
})
export class Heatmap1Component implements OnInit {
  flag: Boolean = false
  @Input() notifier: Subject<any>;
  value1: boolean;
  @Input() knunotifier: Subject<any>;
  value2: boolean;
  @Input() statusnotifier: Subject<any>;
  value3: boolean;
  @Input() botnotifier: Subject<any>;
  value4: any
  @Input() startdatenotifier:Subject<any>
  value5:any
  @Input() enddatenotifier:Subject<any>
  @Input() start :any
  @Input() end :any
  value6:any
  plants: any=''
  plantKnuData: any = [];
  plantData: any = []
  data: any = []
  knuid: any = ''
  statusname: any
  botid: any
  startDate:any
  endDate:any
  x: any
  y: any
  Highcharts: typeof Highcharts = Highcharts;
  constructor(private plantService: PlantServiceService) {
    this.flag = true
  }

  ngOnInit(): void {
    this.startDate =this.start
    this.endDate=this.end
    this.notifier.subscribe(data => {
      if (data) {
        this.plants = data
        this.KnuData();
      }
    });
    this.knunotifier.subscribe(id => {
      if (id) {
        this.knuid = id
      }
    });
    this.statusnotifier.subscribe(status => {
      if (status) {
        this.statusname = status
      }
    });
    this.botnotifier.subscribe(bot => {
      if (bot) {
        this.botid = bot
      }
    });
    this.startdatenotifier.subscribe(start => {
      if (start) {
        this.startDate = start
      }
    });
    this.enddatenotifier.subscribe(end => {
      if (end) {
        this.endDate = end
      }
    });

  }

  KnuData() { 
    this.plantData = []
    this.plantService.getKNUStatus(this.plants, this.knuid, this.statusname, this.botid,this.startDate,this.endDate).subscribe(res => {
      this.plantData = []
      this.plantKnuData=[]
      this.plantKnuData = res
      this.data = this.plantKnuData.data
      for (let i = 0; i < this.plantKnuData.data.length; i++) {
        this.plantData.push({
          ic_pad_no: this.plantKnuData.data[i].ic_pad_no,
          knuid: this.plantKnuData.data[i].knuid,
          value: this.plantKnuData.data[i].avguptime,
          no_of_bots_connected: this.plantKnuData.data[i].no_of_bots_connected,
          no_of_alarms_raised_in_ncu: this.plantKnuData.data[i].no_of_alarms_raised_in_ncu,
        });

      }
      this.getColumn(this.plantData)

      this.show()
    })
  }

  getColumn(data: any) {
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
        cols = max + 1
        rows = min
      }
      this.getNCUPositions(data, cols)
    }

  }
  isInt(val: any): boolean {
    return val % 1 === 0
  }
  getNCUPositions(data: any, cols: number) {
    let k = 1;
    let i = 1; let j = 1
    data.forEach((element: { [x: string]: number; }) => {
      element['x'] = k
      element['y'] = j
      // if(this.ncuFlag){
      // this.addColor(element.avguptime)
      // }
      k++
      if (i % cols == 0) {
        k = 1
        j++
      }
      i++
    });
  }
  // addColor(element: number) {
  //   // let color=""
  //   //       switch(element.plantbcustatus){
  //   //         case "Normal at the docking station":             
  //   //             color="#bcf0ec"
  //   //             // position=1
  //   //             break
  //   //         case "Normal and cleaning":             
  //   //             color="#26a69a"
  //   //             // position=2
  //   //             break
  //   //         case "Strained and cleaning":              
  //   //             color="#ffd20a"
  //   //             // position=3
  //   //             break
  //   //         case "Breakdown":             
  //   //             color="#e57373"
  //   //             // position=4
  //   //             break
  //   //         case "Not communicating": 
  //   //             color="#ee2a41"
  //   //             // position=5
  //   //             break
  //   //         case "Aborted for emergency":              
  //   //             color="#8e101f"
  //   //             // position=6
  //   //             break
  //   //         }
  //   //       element['color']=color
  //   //       element['value']=85
  // }
  show(): void {
    const refreshChart = Highcharts.chart('container1', {
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
          return '<b>NCU Status </b> </br>  <span>NCU ID: ' + (this.point as any).knuid + ' </span> </br> <span>Average Uptime:</span> ' + this.point.value + '%' + ' </br><span>IC Connected: ' + (this.point as any).ic_pad_no + '</span> </br> <span>BOT installed: ' + (this.point as any).no_of_bots_connected + ' </span> </br> <span>No of Alarms: ' + (this.point as any).no_of_alarms_raised_in_ncu + '</span> ';
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
          data: this.plantData,
          dataLabels: {
            enabled: false,
            // color: '#000000',
          },

        },
      ],

    })
  }


}
