// @ts-nocheck
import { Component, Input, OnInit } from '@angular/core';
import * as  Highcharts1 from 'highcharts';
import More from 'highcharts/highcharts-more';
More(Highcharts1);
import Tree from 'highcharts/modules/treemap';
Tree(Highcharts1);
import Heatmap from 'highcharts/modules/heatmap';
Heatmap(Highcharts1);
import Exporting from 'highcharts/modules/exporting';
import HighchartsPatternFill from "highcharts/modules/pattern-fill";
Exporting(Highcharts1);
HighchartsPatternFill(Highcharts1);
import { Router, ActivatedRoute } from '@angular/router';
import { DataService } from '../../../data.service';
import { Subject } from 'rxjs';
@Component({
    selector: 'app-treemap',
    templateUrl: './treemap.component.html',
    styleUrls: ['./treemap.component.scss']
})
export class TreemapComponent implements OnInit {
    flag: Boolean = false
    plantData:any=[];
    newPlantData:any= [];
    @Input() notifier: Subject<any>;
    @Input() startDNotifier: Subject<any>;
    @Input() endDNotifier: Subject<any>;
    @Input() daynotify:Subject<any>;
    @Input() start :any
    @Input() end :any
    dayFilter:any
    startDate:any
    endDate:any 
    plants:string="" 
    constructor(public router: Router,private service :DataService ) {
    }
   
    ngOnInit(): void {
        this.newPlantData=[]
        this.startDate = this.start
        this.endDate = this.end
        this.daynotify.subscribe(data => {
          this.dayFilter=data
        })
        this.notifier.subscribe(data => {
           
          if(data){
            this.plants=data
            this.getData(data)
          }else{
            this.getData(false)
          }
        }        
    );
    this.startDNotifier.subscribe(startD => { 
      if(startD){
      this.startDate = startD
         }
    }        
);
this.endDNotifier.subscribe(endD => {  
  if(endD){
    this.endDate = endD
   } 
}        
);
    }
    getData(flag){
        this.newPlantData=[]
       if(flag){ 
        this.service.getPlantsData1(this.plants,this.startDate,this.endDate).subscribe(res =>{
            this.plantData=[];
            this.newPlantData=[]
            this.plantData = res;
            let data=this.plantData['data']
            for(let i=0;i<data.length;i++){
                this.newPlantData.push({
                    name:data[i].plantname,
                    value: parseInt(data[i].noofbots),
                    colorValue:data[i].avguptime,
                    type: data[i].type,
                    events: {
                        click: () => { 
                            this.router.navigate([`/front/portfolio/renewSolarForm/`+data[i].plantuid+`/`+data[i].plantname+`/`+data[i].type +`/`+data[i].region +`/`+data[i].country +`/`+data[i].state+`/`+data[i].incharge+`/`+this.startDate+`/`+this.endDate+`/`+this.dayFilter]);
                        }
                    }
                });
                this.show()
            }  
        }) 
       }else{ 
        this.service.getPlantsData1(this.plants,this.startDate,this.endDate).subscribe(res =>{
            this.plantData=[];
            this.newPlantData=[]
            this.plantData = res;
            let data=this.plantData['data'] 
            for(let i=0;i<data.length;i++){
                this.newPlantData.push({
                    name:data[i].plantname,
                    value: parseInt(data[i].noofbots),
                    colorValue: data[i].avguptime,
                    type: data[i].type,
                    events: {
                        click: () => { 
                            this.router.navigate([`/front/portfolio/renewSolarForm/`+data[i].plantuid+`/`+data[i].plantname+`/`+data[i].type +`/`+data[i].region +`/`+data[i].country +`/`+data[i].state+`/`+data[i].incharge+`/`+this.startDate+`/`+this.endDate+`/`+this.daynotify]);
                        }
                    }
                });
                    this.show()
            }  
        }) 

       }
        
    }
    show(): void {
      
        (function(H) {
            H.Series.prototype.translateColors = function() {
                var series = this,
                    points = this.data.length ? this.data : this.points,
                    nullColor = this.options.nullColor,
                    colorAxis = this.colorAxis,
                    colorKey = this.colorKey;
        
                points.forEach(function(point) {
                    var value = point[colorKey],
                        color;
        
                    color = point.options.color ||
                        (point.isNull ?
                            nullColor :
                            (colorAxis && typeof value !== 'undefined') ?
        
                            (
                                point.type == "Without AMC"? {
                                    pattern: {
                                        backgroundColor: colorAxis.toColor(value, point),
                                        path: {
                                            d: 'M 0 0 L 6 6 M 5 -1 L 7 1 M -1 5 L 1 7',
                                            stroke: "white",
                                            strokeWidth: 3
                                        },
                                        height: 6,
                                        width: 6,
                                        r: 4,
                                    }
                                }:

                                colorAxis.toColor(value, point) 
                            ) :
        
                            point.color || series.color);
        
                    if (color) {
                        point.color = color;
                    }
                });
            }
        }(Highcharts1));
        let data = this.plantData['data']
        const refreshChart = Highcharts1.chart('container1', {
            colorAxis: [
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
                    ],
                    formatter: function () {
                        return this.point.value + ' %';
                    }
                },

            ],
            // formatter: (data: any) => { return data + '%' },
            legend: {
                title: {
                    text: 'Uptime'
                },
                align: 'right',
                layout: 'vertical',
                margin: 25,
                verticalAlign: 'top',
                y: 25,
                symbolHeight: 220,
                formatter: function () {
                    return + this.point.value + ' %';
                }
            },
            chart: {
                spacingBottom: 0,
                spacingTop: 0,
              /*   spacingLeft: 10,
                spacingRight: 10, */
                height: 300,
                style: {
                    fontFamily: 'Lato Bold'
                }
            },
            exporting: { enabled: false },
            tooltip: { 
                style: {
                    color: '#FFFFFF',
                    fontSize: "14px"
                },
                backgroundColor: '#626262',
                borderColor: '#626262',
                formatter: function () {
                   /*  if (this.point.name == 'Plant8') {
                        console.log(this.point)
                    return '<b>Renew Solar Farm, Australia </b> </br> <span>BOT installed: 236 </span> </br> <span>Plant: 237 MWp</span> </br> <span>Average Uptime:</span> ' + this.point.value + ' %' + '</br><span>Average soiling loss: 3.1%</span>';
                    } */ 
                 
                    for(let i=0;i<data.length;i++){
                        if (this.point.name == data[i].plantname) {
                            // console.log(this.point)
                             return '<b>'+ data[i].plantname+' </b> </br> <span>BOT Installed: '+data[i].noofbots+' </span> </br> <span>Plant: '+data[i].plantpower+'</span> </br> <span>Average Uptime:</span> ' + parseFloat(data[i].avguptime).toFixed(2)  + ' %' + '</br><span>Average Soiling Loss:'+ parseFloat( data[i].avgsoiling).toFixed(2) +' %</span>';
                        }
                    }
                }
            },
            series: [{
                type: 'treemap',
                crisp: false,
                layoutAlgorithm: 'squarified',
                data:this.newPlantData,

              /*   data: [{
                    name: 'Plant 1',
                    value: 100,
                    colorValue: 100,
                    color: '#BCF0EC',
                    events: {
                        click: () => {
                            this.router.navigate(['/renewSolarForm/plant1']);
                        }
                    }
                }, {
                    name: 'Plant 2',
                    value: 99.7,
                    colorValue: 99.3,
                    color: {
                        pattern: {
                            backgroundColor: "#26A69A",
                            path: {
                                d: 'M 0 0 L 6 6 M 5 -1 L 7 1 M -1 5 L 1 7',
                                stroke: "white",
                                strokeWidth: 3
                            },
                            height: 6,
                            width: 6,
                            r: 4,
                        }
                    },
                    events: {
                        click: () => {
                            this.router.navigate(['/renewSolarForm/plant2']);
                        }
                    },
                }, {
                    name: 'Plant 3',
                    value: 99.3,
                    colorValue: 99.3,
                    color: '#BCF0EC',
                    events: {
                        click: () => {
                            this.router.navigate(['/renewSolarForm/plant3']);
                        }
                    }
                }, {
                    name: 'Plant 4',
                    value: 99,
                    colorValue: 99,
                    color: '#FFF0AD',
                    events: {
                        click: () => {
                            this.router.navigate(['/renewSolarForm/plant4']);
                        }
                    }
                }, {
                    name: 'Plant 5',
                    value: 99.2,
                    colorValue: 99.2,
                    color: {
                        pattern: {
                            backgroundColor: "#FF9D00",
                            path: {
                                d: 'M 0 0 L 6 6 M 5 -1 L 7 1 M -1 5 L 1 7',
                                stroke: "white",
                                strokeWidth: 3
                            },
                            height: 6,
                            width: 6,
                            r: 4,
                        }
                    },
                    events: {
                        click: () => {
                            this.router.navigate(['/renewSolarForm/plant5']);
                        }
                    }
                }, {
                    name: 'Plant 6',
                    value: 99.1,
                    colorValue: 99.1,
                    color: '#FFF0AD',
                    events: {
                        click: () => {
                            this.router.navigate(['/renewSolarForm/plant6']);
                        }
                    }
                }, {
                    name: 'Plant 7',
                    value: 98.8,
                    colorValue: 98.8,
                    color: '#FAC7CD',
                    events: {
                        click: () => {
                            this.router.navigate(['/renewSolarForm/plant7']);
                        }
                    }
                }, {
                    name: 'Plant 8',
                    value: 98.56,
                    colorValue: 98.9,
                    color: '#FFF0AD',
                    events: {
                        click: () => {
                            this.router.navigate(['/renewSolarForm/plant8']);
                        }
                    }
                }, {
                    name: 'Plant 9',
                    value: 98.1,
                    colorValue: 98.1,
                    color: '#FAC7CD',
                    events: {
                        click: () => {
                            this.router.navigate(['/renewSolarForm/plant9']);
                        }
                    }
                }, {
                    name: 'Plant 10',
                    value: 99.6,
                    colorValue: 98.2,
                    color: {
                        pattern: {
                            backgroundColor: "#EE2A41",
                            path: {
                                d: 'M 0 0 L 6 6 M 5 -1 L 7 1 M -1 5 L 1 7',
                                stroke: "white",
                                strokeWidth: 3
                            },
                            height: 6,
                            width: 6,
                            r: 4,
                        }
                    },
                    events: {
                        click: () => {
                            this.router.navigate(['/renewSolarForm/plant10']);
                        }
                    }
                },], */
                dataLabels: {
                    enabled: true,
                    align: 'left',
                    verticalAlign: 'top',
                    style: {
                      fontSize: '14px',
                      fontWeight: 'bold',
                      fontFamily: 'Lato sans-serif',
                      color:'#000000'
                    },
                    /* formatter() {
                      return '<span style="color: ' + this.color + ';">' + this.key + '</span>'
                    } */
                  }
            }],
            title: {
                text: undefined
            },
            credits: {
                enabled: false
            },

        })
        refreshChart.reflow()
        refreshChart.setSize(document.getElementById('chartTreeMap')?.offsetWidth, 300)
        this.flag = true
    }


}
