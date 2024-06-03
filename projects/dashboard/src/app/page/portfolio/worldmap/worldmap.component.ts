//@ts-nocheck
import { Component, Input, OnInit } from '@angular/core';
import * as  Highcharts from "highcharts/highmaps";
const worldMap = require('@highcharts/map-collection/custom/world.geo.json');
import proj4 from 'proj4';
import { Subject } from 'rxjs';
import { DataService } from '../../../data.service';

@Component({
  selector: 'app-worldmap',
  templateUrl: './worldmap.component.html',
  styleUrls: ['./worldmap.component.scss']
})

export class WorldmapComponent implements OnInit {
  Highcharts: typeof Highcharts = Highcharts;
  chartConstructor = "mapChart";
  chartOptions: any
  worldMapData: any = [];
  newWorldMapData: any = [];
  newWorldMapDataWith: any = [];
  newWorldMapDataWithout: any = [];
  chartFlag: boolean = false
  flag: Boolean = false
  newPlantData: any = [];
  @Input() notifier: Subject<any>;
  @Input() startDNotifier: Subject<any>;
  @Input() endDNotifier: Subject<any>;
  @Input() id :any
  @Input() start :any
  @Input() end :any
  startDate:any
  endDate:any 
  
  plants: string = ""
  newPositionData: any = []
  type: any = []
  country: any = []
  mydata = [
    {
      name: 'Random data',
      states: {
        hover: {
          color: '#BADA55',
        },
      },
      dataLabels: {
        enabled: false,
        format: '{point.name}',
      },
      allAreas: true,
    } as Highcharts.SeriesMapOptions,
    {
      // Specify points using lat/lon
      type: 'mappoint',
      name: 'Canada cities',
      marker: {
        radius: 5,
        fillColor: 'tomato',
      },
      data: [
        {
          name: 'Vancouver',
          lat: 49.246292,
          lon: -123.116226,
        },
        {
          name: 'Quebec City',
          lat: 46.829853,
          lon: -71.254028,
        },
        {
          name: 'Yellowknife',
          lat: 62.454,
          lon: -114.3718,
        },
      ],
    },
  ]
  constructor(private service: DataService) {
  }
  ngOnInit() {
    this.startDate = this.start
    this.endDate = this.end
    this.notifier.subscribe(data => { 
      if (data) {
        this.plants = data
        this.getData(data)
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
    this.getData(false)
  }
  getData(flag) {
    if (flag) {
      this.newWorldMapData =[]
      this.newWorldMapDataWith = []
      this.newWorldMapDataWithout = [] 
      this.service.getWorldData1(this.plants,this.startDate,this.endDate).subscribe(res => {
        this.worldMapData = res
        let allData = this.worldMapData['data']
        for (let i = 0; i < allData.length; i++) {
          if (allData[i].type === "With AMC") {
            this.newWorldMapDataWith.push(
              {
                plantName:allData[i].plantname,
                name: allData[i].plantname+' - '+allData[i].data[0].state,
                lat: parseFloat(allData[i].data[0].latitude),
                lon: parseFloat(allData[i].data[0].longitude),
                value: parseFloat(allData[i].data[0].avgUptime).toFixed(2)
              }
            )
          }
          else {
            this.newWorldMapDataWithout.push(
              {
                plantName:allData[i].plantname,
                name: allData[i].plantname+' - '+allData[i].data[0].state,
                lat: parseFloat(allData[i].data[0].latitude),
                lon: parseFloat(allData[i].data[0].longitude),
                value: parseFloat(allData[i].data[0].avgUptime).toFixed(2)
              }
            )
          }
        }
        this.newWorldMapData.push(
          {
            name: 'Random data',
            states: {
              hover: {
                color: '#BADA55',
              },
            },
            dataLabels: {
              enabled: false,
              format: '{point.name}',
            },
            allAreas: true,
          },{
            type: 'mappoint',
            name: "With AMC",
            marker: {
              radius: 5,
              fillColor: '#F68D5D',
            },
            data: this.newWorldMapDataWith
          },{
            type: 'mappoint',
            name: "Without AMC",
            marker: {
              radius: 5,
              fillColor: '#8183EA',
            },
            data: this.newWorldMapDataWithout
          }
          )
          this. myChart()
      })
    } else {
      this.newWorldMapDataWith = []
      this.newWorldMapDataWithout = []
      this.newWorldMapData =[] 
      this.service.getWorldData1(this.id,this.startDate,this.endDate).subscribe(res => {
        this.worldMapData = res
        this.worldMapData = res
        let allData = this.worldMapData['data']
        for (let i = 0; i < allData.length; i++) {
          if (allData[i].type === "With AMC") {
            this.newWorldMapDataWith.push(
              {
                plantName:allData[i].plantname,
                name:allData[i].plantname+' - '+allData[i].data[0].state,
                lat: parseFloat(allData[i].data[0].latitude),
                lon: parseFloat(allData[i].data[0].longitude),
                value: parseFloat(allData[i].data[0].avgUptime).toFixed(2)
              }
            )
          }
          else {
            this.newWorldMapDataWithout.push(
              {
                plantName:allData[i].plantname,
                name: allData[i].plantname+' - '+allData[i].data[0].state,
                lat: parseFloat(allData[i].data[0].latitude),
                lon: parseFloat(allData[i].data[0].longitude),
                value: parseFloat(allData[i].data[0].avgUptime).toFixed(2)
              }
            )
          }
        }
        this.newWorldMapData.push(
          {
            name: 'Random data',
            states: {
              hover: {
                color: '#BADA55',
              },
            },
            dataLabels: {
              enabled: false,
              format: '{point.name}',
            },
            allAreas: true,
          },{
            type: 'mappoint',
            name: "With AMC",
            marker: {
              radius: 5,
              fillColor: '#F68D5D',
            },
            data: this.newWorldMapDataWith
          },{
            type: 'mappoint',
            name: "Without AMC",
            marker: {
              radius: 5,
              fillColor: '#8183EA',
            },
            data: this.newWorldMapDataWithout
          }
          )
          this. myChart()
      })

    }

  }

  myChart() {

    let data = this.worldMapData['data']
    let chart: Highcharts.Options = {
      chart: {
        map: worldMap,
        proj4: proj4,
        style: {
          fontFamily: 'Lato Bold'
        }
      },
      title: {
        text: undefined
      },
      legend: {
        enabled: false
      },
      tooltip: {
        style: {
          color: '#FFFFFF',
          fontSize: "14px"
        },
        backgroundColor: '#626262',
        borderColor: '#626262',
        formatter: function () {
          for (let i = 0; i < data.length; i++) {
            for (let j = 0; j < data[i].data.length; j++) {
              if (this.point.plantName == data[i].plantname) {
                return '<b>' + this.point.name + ' </b> </br> <span>BOT Installed: ' + data[i].noofbots + ' </span> </br> <span>Plant: ' + data[i].plantpower + '</span> </br> <span>Average Uptime:</span> ' + parseFloat(this.point.value).toFixed(2) + ' %' + '</br><span>Average Soiling Loss:' + parseFloat(data[i].avgsoiling).toFixed(2) + ' %</span>';
              }
            }
          }
        }
      },
      mapNavigation: {
        enabled: true,
        buttonOptions: {
          verticalAlign: "bottom"
        }
      },
      credits: {
        enabled: false
      },
      series: this.newWorldMapData,
    };

    this.chartOptions = chart
    this.chartFlag = true
  }

}
