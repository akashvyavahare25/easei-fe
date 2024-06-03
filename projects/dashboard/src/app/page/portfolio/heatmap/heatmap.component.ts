// @ts-nocheck
import { Component, Input, OnInit } from '@angular/core';
import * as  Highcharts from 'highcharts';
import More from 'highcharts/highcharts-more';
More(Highcharts);
import Tree from 'highcharts/modules/treemap';
Tree(Highcharts);
import Heatmap from 'highcharts/modules/heatmap';
Heatmap(Highcharts);
import Exporting from 'highcharts/modules/exporting';
import HighchartsPatternFill from "highcharts/modules/pattern-fill";
Exporting(Highcharts);
HighchartsPatternFill(Highcharts);
import { Router, ActivatedRoute } from '@angular/router';
import { DataService } from '../../../../../src/app/data.service';
import { Subject } from 'rxjs';

@Component({
    selector: 'app-heatmap',
    templateUrl: './heatmap.component.html',
    styleUrls: ['./heatmap.component.scss']
})
export class HeatmapComponent implements OnInit {

    flag: Boolean = false
    plantData: any = [];
    newPlantData: any = [];
    @Input() data: any;
    value1: boolean;
    plants: string = ""
    @Input() startDNotifier: Subject<any>;
    @Input() endDNotifier: Subject<any>;
    @Input() start: any
    @Input() end: any
    startDate: any
    endDate: any
    constructor(public router: Router, private service: DataService) {
    }

    ngOnInit(): void {

        this.startDate = this.start
        this.endDate = this.end
        this.newPlantData = []
        this.getData(this.data) 
        this.startDNotifier.subscribe(startD => {
            if (startD) {
                this.startDate = startD
                // this.getData(this.data) 
            }
        }
        );
        this.endDNotifier.subscribe(endD => {
            if (endD) {
                this.endDate = endD
                this.getData(this.data) 
            }
        }
        );
    }
    getData(id) {
        this.newPlantData = [] 
        this.service.getKNUStatus1(id,this.startDate,this.endDate).subscribe(res => {
            this.plantData = res;
            let data = this.plantData['data']
            for (let i = 0; i < data.length; i++) {
                this.newPlantData.push({
                    value: parseInt(data[i].no_of_bots_connected),
                    colorValue: parseInt(data[i].avguptime),
                    knuId:data[i].knuid
                });
                this.show()
            }
        })


    }
    show(): void {
        let data = this.plantData['data']
        const refreshChart = Highcharts.chart('container1', {
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
                y: -10,
                symbolHeight: 80,
                formatter: function () {
                    return + this.point.value + ' %';
                }
            },
            chart: {
                spacingBottom: 0,
                spacingTop: 0,
                /* spacingLeft: 10,
                spacingRight: 10, */
                height: 130,
                style: {
                    fontFamily: 'Lato sans-serif'
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
                    for (let i = 0; i < data.length; i++) {
                        if (this.point.knuId == data[i].knuid) {
                            return '<b>NCU Status </b> </br>  <span>NCU ID:' + data[i].knuid + '</span> </br> <span>Average Uptime:</span> ' + parseFloat(data[i].avguptime).toFixed(2) + '%' + ' </br><span>IC Connected: ' + data[i].ic_pad_no + '</span> </br> <span>BOT Installed: ' + data[i].no_of_bots_connected + ' </span> </br> <span>No Of Alarms:' + data[i].no_of_alarms_raised_in_ncu + '</span> ';
                        }
                    }
                }
            },
            series: [{
                type: 'treemap',
                crisp: false,
                layoutAlgorithm: 'squarified',
                data: this.newPlantData,
                dataLabels: {
                    enabled: true,
                    align: 'left',
                    verticalAlign: 'top',
                    style: {
                        fontSize: '14px',
                        fontWeight: 'bold',
                        fontFamily: 'Lato sans-serif',
                        color: '#000000'
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
        refreshChart.setSize(document.getElementById('chartTreeMap')?.offsetWidth, 130)
        this.flag = true
    }


}
