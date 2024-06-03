//@ts-nocheck
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { AfterViewInit } from '@angular/core';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import * as html2canvas from 'html2canvas';
import { ToastrService } from 'ngx-toastr';
import FileSaver from 'file-saver';
declare var require: any;
var moment = require('moment');
var jsonata = require('jsonata');
export type ChartOptions4 = {
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
  annotation: ApexAnnotations;
};

export interface PeriodicElement {
  avguptime: string;
  date: string;
  avgsoilingloss: string;
  co2saved: string;
  water: string,
  healthybot: string,
  unhealthybot: string
}
export type ChartOptions3 = {
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
  annotation: ApexAnnotations;
};
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
import { MatOption } from '@angular/material/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSelect } from '@angular/material/select';
import { DataService } from '../../data.service';
import { APIService } from '../../../../../contract-management/src/app/services/api.service'
import * as _ from 'lodash';
import { Subject } from 'rxjs';
import { type } from 'os';
import { Router } from '@angular/router';
interface Food {
  value: string;
  viewValue: string;
}

const ELEMENT_DATA: PeriodicElement[] = [];

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss']
})
export class ReportComponent implements OnInit, AfterViewInit {
  dataSource :any =new MatTableDataSource();

  jsonData: any = []
  calendar = "7";
  startDate: any
  endDate: any
  allIncharge1 = '';
  allRegion1 = '';
  allCountry1 = '';
  allState1 = '';
  allkpis1 = '';
  amcStatus1 = '';
  pdfFormat1 = '';
  plantsId = '';
  allPlants1 = '';
  allPlants = new FormControl();
  allIncharge = new FormControl();
  allRegion = new FormControl();
  allCountry = new FormControl();
  allState = new FormControl();
  allkpis = new FormControl();
  amcStatus = new FormControl();
  pdfFormat = new FormControl();
  count: any;
  maxDate = new Date()
  overview = false;
  heatmap = true;
  allSelected = false;
  allSelected1 = false;
  allSelected2 = false;
  allSelected3 = false;
  allSelected4 = false;
  allSelected5 = false;
  allSelected6 = false;
  allSelected7 = false;
  allselectedregionstatus = { selected: false, disselected: false }
  allselectedcountrystatus = { selected: false, disselected: false }
  allselectedstatestatus = { selected: false, disselected: false }
  allselectedplantstatus = { selected: false, disselected: false }
  allselectedinchargestatus = { selected: false, disselected: false }
  allselectedamcstatus = { selected: false, disselected: false }
  allselectedkpistatus = { selected: false, disselected: false }
  avguptime: any;
  uptimeSeries: any = [];
  uptimeXaxis: any = [];
  avgsoiling: any;
  soilingSeries: any = [];
  soilingXaxis: any = [];
  allAvgUptime: any = [];
  allAvgSoilloss: any = [];
  uptimeColors: any
  soilingLoassColors: any
  uptimeStrok: any
  soilingStrok: any
  uptimeMarker: any
  soilingMarkers: any
  reportData: any = []
  reportPdfCsv: any
  plantCapcity: any
  allReportTabledata: any = [{date: '', avguptime: '', avgsoilingloss: '', co2saved: '', water: '', healthybot: '', unhealthybot: '' }]
  waterVisible: boolean = false
  allPlantsList: any = [];
  allInchargeList: any = [];
  allRegionList: any = [];
  allCountryList: any = [];
  allStateList: any = [];
  allkpisList = [
    {
      key: 1, value: 'Average Uptime',
    },
    {
      key: 2, value: 'Average Soiling',
    },
    {
      key: 3, value: 'BOT Operation Status',
    },
    {
      key: 4, value: 'CO2 Saved',
    },
    {
      key: 5, value: 'Water Saved',
    },
  ];
  amcStatusList: any = [];
  pdfFormatList = [{
    key: 1, value: 'PDF Format',
  },
  {
    key: 2, value: 'CSV Format',
  },
  {
    key: 2, value: 'Excel Format',
  }
  ];
  routerUrl: any
  reportStatus: any = "Portfolio"
  @ViewChild('select') select: MatSelect;
  @ViewChild('select1') select1: MatSelect;
  @ViewChild('select2') select2: MatSelect;
  @ViewChild('select3') select3: MatSelect;
  @ViewChild('select4') select4: MatSelect;
  @ViewChild('select5') select5: MatSelect;
  @ViewChild('select6') select6: MatSelect;
  @ViewChild('select7') select7: MatSelect;

  @ViewChild("chart") chart: ChartComponent;
  public chartOptions3: Partial<ChartOptions3> | any;
  public chartOptions4: Partial<ChartOptions4> | any;

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(private router: Router, private _liveAnnouncer: LiveAnnouncer, private toastr: ToastrService, private service: DataService, private droneapiService: APIService) {
    this.routerUrl = router.url;
    if (this.routerUrl.includes("/front/plant/report")) {
      this.reportStatus = "Plant"
    }
  }
  ngOnInit() {
    this.endDate = moment().format("DD-MM-YYYY")
    this.startDate = moment().subtract(7, 'days').format("DD-MM-YYYY")
    this.allCountryList = []
    this.allStateList = []
    this.region = []
    this.service.getAPIData1().subscribe(res => {
      this.jsonData = res;
      this.getPlants(this.jsonData.data)
    })
  }

  selectedDate(days) {
    if (days != "custom") {
      this.endDate = moment().format("DD-MM-YYYY")
      this.startDate = moment().subtract(days, 'days').format("DD-MM-YYYY")
      this.allAPIDate()
    }
  }
  selectedCustomDateStart(days) {
    this.startDate = moment(days.value).format("DD-MM-YYYY")
    this.allAPIDate()
  }
  selectedCustomDateEnd(days) {
    this.endDate = moment(days.value).format("DD-MM-YYYY")
    this.allAPIDate()
  }

  allAPIDate() {
    this.getavgUptimeData()
    this.getavgSoilingData()
    this.allReportTabledata = [{date: '', avguptime: '',  avgsoilingloss: '', co2saved: '', water: '' }]
    this.service.getReportData1(this.plantsId, this.startDate, this.endDate).subscribe(res => {
      this.reportData = res.data;
      this.service.getSummary1(this.plantsId, this.startDate, this.endDate).subscribe(res => {
        this.dataSource = this.reportData
        this.plantCapcity = res.data['capacity']
        // this.dataSource[0]['co2saved'] = res.data['co2-saved']
        this.dataSource[0]['water'] = res.data['water-saved']
        this.service.getBotStatus(this.plantsId, this.startDate, this.endDate).subscribe(res => {
          this.dataSource[0].healthybot = res.data[0]['healthybot']
          this.dataSource[0].unhealthybot = res.data[0]['unhealthybot']
          this.allReportTabledata = this.dataSource
        })
      })
    })

  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

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
      this.select1.options.forEach((item: MatOption) => item.select());
    } else {
      this.select1.options.forEach((item: MatOption) => item.deselect());
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
        this.allselectedregionstatus.selected = true
        this.allselectedregionstatus.disselected = false
        item.select()
      });
    } else {
      this.select2.options.forEach((item: MatOption) => {
        this.allselectedregionstatus.selected = false
        this.allselectedregionstatus.disselected = true
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
        this.allselectedcountrystatus.selected = true
        this.allselectedcountrystatus.disselected = false
        item.select()
      });
    } else {
      this.select3.options.forEach((item: MatOption) => {
        this.allselectedcountrystatus.selected = false
        this.allselectedcountrystatus.disselected = true
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

  toggleAllSelection4() {
    if (this.allSelected4) {
      this.select4.options.forEach((item: MatOption) => {
        this.allselectedstatestatus.selected = true
        this.allselectedstatestatus.disselected = false
        item.select()
      });
    } else {

      this.select4.options.forEach((item: MatOption) => {
        this.allselectedstatestatus.selected = false
        this.allselectedstatestatus.disselected = true
        item.deselect()
      });
    }
  }
  optionClick4() {
    let newStatus = true;
    this.select4.options.forEach((item: MatOption) => {
      if (!item.selected) {
        newStatus = false;
      }
    });
    this.allSelected4 = newStatus;
  }

  toggleAllSelection5() {
    if (this.allSelected5) {
      this.select5.options.forEach((item: MatOption) => {
        this.allselectedkpistatus.selected = true
        this.allselectedkpistatus.disselected = false
        item.select()
      });
    } else {
      this.select5.options.forEach((item: MatOption) => {
        this.allselectedkpistatus.selected = false
        this.allselectedkpistatus.disselected = true
        item.deselect()
      }
      );
    }
  }
  optionClick5() {
    let newStatus = true;
    this.select5.options.forEach((item: MatOption) => {
      if (!item.selected) {
        newStatus = false;
      }
    });
    this.allSelected5 = newStatus;
  }
  toggleAllSelection6() {
    if (this.allSelected6) {
      this.select6.options.forEach((item: MatOption) => {
        this.allselectedamcstatus.selected = true
        this.allselectedamcstatus.disselected = false
        item.select()
      });
    } else {
      this.select6.options.forEach((item: MatOption) => {
        this.allselectedamcstatus.selected = false
        this.allselectedamcstatus.disselected = true
        item.deselect()
      });
    }
  }
  optionClick6() {
    let newStatus = true;
    this.select6.options.forEach((item: MatOption) => {
      if (!item.selected) {
        newStatus = false;
      }
    });
    this.allSelected6 = newStatus;
  }

  toggleAllSelection7() {
    if (this.allSelected7) {
      this.select7.options.forEach((item: MatOption) => item.select());
    } else {
      this.select7.options.forEach((item: MatOption) => item.deselect());
    }
  }
  optionClick7() {
    let newStatus = true;
    this.select7.options.forEach((item: MatOption) => {
      if (!item.selected) {
        newStatus = false;
      }
    });
    this.allSelected7 = newStatus;
  }
  reset() {
    this.calendar = '7';
    this.allIncharge1 = '';
    this.allRegion1 = '';
    this.allCountry1 = '';
    this.allState1 = '';
    this.allkpis1 = '';
    this.amcStatus1 = '';
    this.pdfFormat1 = '';
    this.allPlants1 = '';
    this.allSelected2 = false;
    this.allSelected = false;
    this.allSelected1 = false;
    this.allSelected3 = false;
    this.allSelected4 = false;
    this.allSelected5 = false;
    this.allSelected6 = false;
    this.allSelected7 = false;
    this.allCountryList=[]
    this.allStateList=[]
    this.amcStatusList=[]
    this.endDate = moment().format("DD-MM-YYYY")
    this.startDate = moment().subtract(7, 'days').format("DD-MM-YYYY")
    this.service.getAPIData1().subscribe(res => {
      this.jsonData = res;
      this.getPlants(this.jsonData.data)
    })
  }
  displayedColumns: string[] = ['date', "avgsoilingloss", "avguptime", "co2saved", "water", "healthybot", "unhealthybot"]
  getPlants(regions: any, countries: any, states: any) {
    this.plantsId = ""
    this.allPlantsList = []
    this.allInchargeList = []
    this.allRegionList = []
    let regionsPredicateQuery = "*"
    let countriesPredicateQuery = "*"
    let statesPredicateQuery = "*"
    let plantPredicateQuery = "*"
    let inchrgesPredicateQuery = "*"
    let regionsPredicateList = [];
    let inchargePredicateList = [];
    let countriesPredicateList = [];
    let statesPredicateList = [];
    let plantsPredicateList = [];
    if (regions != undefined && regions.length > 0) {

      regions.forEach(id => {
        regionsPredicateList.push("uuid=" + "'" + id.uuid + "'");
      })


      regionsPredicateQuery = regionsPredicateList.join(" or ");

    }
    if (countries != undefined && countries.length > 0) {
      countries.forEach(id => {
        countriesPredicateList.push("uuid=" + "'" + id.uuid + "'");
        countriesPredicateQuery = countriesPredicateList.join(" or ");
      })
    }
    if (states != undefined && states.length > 0) {
      states.forEach(id => {
        statesPredicateList.push("uuid=" + "'" + id.uuid + "'");
        statesPredicateQuery = statesPredicateList.join(" or ");
      })
    }
    // let arrayData2: any = []
    // if (countries === undefined) {
    //   arrayData2 = jsonata("data[" + regionsPredicateQuery + "].countries").evaluate(this.jsonData)
    //   if (arrayData2 != null) {
    //     if (arrayData2.length) {
    //       this.allCountryList = arrayData2
    //     }
    //     else {
    //       this.allCountryList.push(arrayData2)
    //     }
    //   }
    // }
    let arrayData: any = []
    let amcarrayData: any = []
    let filterAmcData: any = []
    arrayData = jsonata("data[" + regionsPredicateQuery + "].countries[" + countriesPredicateQuery + "].states[" + statesPredicateQuery + "].plants").evaluate(this.jsonData)

    arrayData.forEach(id => {
      if (id.plant_amc == 'With AMC') {
        amcarrayData.push({
          plant_amc: id.plant_amc
        })
      }
    })
    arrayData.forEach(id => {
      if (id.plant_amc == 'Without AMC') {
        amcarrayData.push({
          plant_amc: id.plant_amc
        })
      }
    })
    filterAmcData = _.sortedUniqBy(amcarrayData, (o) => {
      return o.plant_amc;
    })
    if (arrayData != null) {
      this.allPlantsList = arrayData
      this.amcStatusList = filterAmcData
      this.allPlantsList.forEach(id => {
        if (this.plantsId == undefined || this.plantsId == null || this.plantsId == '') {
          this.plantsId = id.uuid
        }
        else {

          this.plantsId = this.plantsId + "," + id.uuid
        }
      })
    }
    if (this.allPlantsList.length > 0) {

      this.allPlantsList.forEach(id => {
        plantsPredicateList.push("uuid=" + "'" + id.uuid + "'");
        plantPredicateQuery = plantsPredicateList.join(" or ");
        inchargePredicateList.push("name=" + "'" + id.incharges.name + "'");
        inchrgesPredicateQuery = inchargePredicateList.join(" or ");
      })
      let regionData: any = [];
      regionData = jsonata("data[*]").evaluate(this.jsonData);
      if (regionData != null) {
        if (regionData.length) {

          this.allRegionList = regionData
        }
        else {
          this.allRegionList.push(regionData)
        }


      }
      let arrayData1: any = []
      //arrayData=jsonata("Data["+regionsPredicateQuery+"].countries["+countriesPredicateQuery+"].states["+statesPredicateQuery+"].plants["+inchrgesPredicateQuery+"].incharge").evaluate(this.jsonData)
      arrayData1 = jsonata("data[" + regionsPredicateQuery + "].countries[" + countriesPredicateQuery + "].states[" + statesPredicateQuery + "].plants[" + plantPredicateQuery + "].incharges").evaluate(this.jsonData)
      let newData = Array.isArray(arrayData1) ? arrayData1 : [arrayData1];
      arrayData1 = _.sortedUniqBy(newData, (o) => {
        return o.name;
      })

      if (arrayData1 != null) {
        if (arrayData1.length) {

          this.allInchargeList = arrayData1
        }
        else {
          this.allInchargeList.push(arrayData1)
        }


      }
    }
    this.getavgUptimeData()
    this.getavgSoilingData()
    this.service.getReportData1(this.plantsId, this.startDate, this.endDate).subscribe(res => {
      this.reportData = res.data;
    })
    setTimeout(() => this.service.getSummary1(this.plantsId, this.startDate, this.endDate).subscribe(resp => {
      this.plantCapcity = resp.data['capacity']
      this.dataSource = this.reportData
      // this.dataSource[0]['co2saved'] = res.data['co2-saved']
      if(resp){
        this.dataSource[0].water = resp.data['water-saved']
      }
      this.service.getBotStatus(this.plantsId, this.startDate, this.endDate).subscribe(res => {
        this.dataSource[0].healthybot = res.data[0]['healthybot']
        this.dataSource[0].unhealthybot = res.data[0]['unhealthybot']
        this.allReportTabledata = this.dataSource
      })

    }), 1500)

    
  }
  
  getCountry(regions) {
    //  if(this.allCountryList.length=1 && regions.length==0)  {
    //   this.allSelected3=false
    //   this.allCountry.value=''
    //   this.allState.value=''
    //   this.allCountryList=[]
    //   this.allStateList=[]
    //  }
    this.allPlants.reset()
    this.allIncharge.reset()
    this.allSelected=false
    this.allSelected1=false
    if (regions[0] != null) {
      this.region = regions
      this.allCountryList = []
      let regionsPredicateQuery = '*';
      let regionsPredicateList = [];
      regions.forEach(id => {
        regionsPredicateList.push("uuid=" + "'" + id.uuid + "'");
      })
      if (regionsPredicateList.length > 0) {
        regionsPredicateQuery = regionsPredicateList.join(" or ");
      }
      let arrayData: any = []
      arrayData = jsonata("data[" + regionsPredicateQuery + "].countries").evaluate(this.jsonData)
      if (arrayData != null) {
        this.allCountryList = arrayData
      }
    }
    else {
      this.allCountryList = []
      this.region = []
      this.allSelected3 = false
      this.allCountry1 = false
      // this.allCountry=false
    }
    if (this.allselectedregionstatus.selected) {
      if (this.allRegionList.length == regions.length) {
        this.getPlants(this.region)
      }
    } else if (this.allselectedregionstatus.disselected) {
      if (this.allRegionList.length == 0) {
        this.getPlants(this.region)
      }
    }
    else {
      this.getPlants(this.region)
    }
    this.allselectedregionstatus.selected = false
    this.allselectedregionstatus.disselected = false
  }
  getState(country) {
    this.allPlants.reset()
    this.allIncharge.reset()
    this.allSelected=false
    this.allSelected1=false
    if (this.allStateList.length == 0) {
      this.allSelected4 = ''
    }
    if (country[0] != null) {
      this.country = country
      this.allStateList = []
      this.country = country
      let statesPredicateQuery = '*';
      let statesPredicateList = [];
      let countriesPredicateList = [];
      let countriesPredicateQuery = "*";

      country.forEach(id => {
        countriesPredicateList.push(id.name);
      })
      if (countriesPredicateList.length > 0) {
        countriesPredicateQuery = countriesPredicateList.join(" or ");
      }
      // let countryData:any=[]
      // let countryData1:any=[]
      //  countryData=jsonata("Data[*]").evaluate(this.jsonData);
      //  let newData = Array.isArray(countryData) ? countryData : [countryData];
      //  countryData1 = _.filter(newData, (o) => {
      //   return o.countries[0].name == countriesPredicateQuery;
      // })
      // if(countryData1 !=null){
      //    this.allRegionList=countryData1
      //    if (this.allSelected2 =true) {
      //     this.select2.options.forEach((item: MatOption) => item.select());
      //   } else {
      //     this.select2.options.forEach((item: MatOption) => item.deselect());
      //   }
      //   }
      // console.log("!!!!!!!!!!!!",countryData1);

      country.forEach(id => {
        statesPredicateList.push("uuid=" + "'" + id.uuid + "'");
      })
      if (statesPredicateList.length > 0) {
        statesPredicateQuery = statesPredicateList.join(" or ");
      }
      let arrayData: any = []
      arrayData = jsonata("data[*].countries[" + statesPredicateQuery + "].states").evaluate(this.jsonData)
      if (arrayData != null) {
        this.allStateList = arrayData
      }
    }
    else {
      this.allRegionList = []
      this.allStateList = []
      this.country = []

      // allSelected4 = false
    }
    if (this.allselectedcountrystatus.selected) {
      if (this.allCountryList.length == country.length) {
        this.getPlants(this.region, this.country)
      }
    } else if (this.allselectedcountrystatus.disselected) {
      if (this.allCountryList.length == 0) {
        this.getPlants(this.region, this.country)
      }
    }
    else {
      this.getPlants(this.region, this.country)
    }
    this.allselectedcountrystatus.selected = false
    this.allselectedcountrystatus.disselected = false
  }
  getPlant(states) {
    this.allPlants.reset()
    this.allIncharge.reset()
    this.allSelected=false
    this.allSelected1=false
    if (states[0] != null) {
      this.state = states
      this.allPlantsList = []
    }
    else {
      this.allPlantsList = []
      this.state = []
    }
    if (this.allselectedstatestatus.selected) {
      if (this.allStateList.length == states.length) {
        this.getPlants(this.region, this.country, states)
      }
    } else if (this.allselectedstatestatus.disselected) {
      if (this.allStateList.length == 0) {
        this.getPlants(this.region, this.country, states)
      }
    }
    else {
      this.getPlants(this.region, this.country, states)
    }
    this.allselectedstatestatus.selected = false
    this.allselectedstatestatus.disselected = false
  }
  getamcPlant(amc) {
    this.plantsId = ""
    if (amc.length == 0) {
      let arrayData1: any = []
      arrayData1 = jsonata("data[*].countries[*].states[*].plants").evaluate(this.jsonData)
      let newData1 = Array.isArray(arrayData1) ? arrayData1 : [arrayData1];
      if (newData1 != null) {
        this.allPlantsList = newData1
      }
    }
    if (amc[0] != null) {
      this.allPlantsList = []
      let amcPredicateQuery = '*';
      let amcPredicateList = [];
      amc.forEach(id => {
        amcPredicateList.push("plant_amc=" + "'" + id.plant_amc + "'");
      })
      if (amcPredicateList.length > 0) {
        amcPredicateQuery = amcPredicateList.join(" or ");
      }
      let arrayData: any = []
      arrayData = jsonata("data[*].countries[*].states[*].plants[" + amcPredicateQuery + "]").evaluate(this.jsonData)
      let newData = Array.isArray(arrayData) ? arrayData : [arrayData];
      if (arrayData != null) {
        this.allPlantsList = newData
      }
    } else {
    }
    this.plantsId = ""
    this.allPlantsList.forEach(id => {

      if (this.plantsId == undefined || this.plantsId == null || this.plantsId == '') {
        this.plantsId = id.uuid
      }
      else {

        this.plantsId = this.plantsId + "," + id.uuid
      }
    })
    if (this.allselectedamcstatus.selected) {
      if (this.allPlantsList.length == amc.length) {
        this.getavgUptimeData()
        this.getavgSoilingData()
        this.service.getReportData1(this.plantsId, this.startDate, this.endDate).subscribe(res => {
          this.reportData = res.data;
        })
        this.service.getSummary1(this.plantsId, this.startDate, this.endDate).subscribe(resp => {
          this.dataSource = this.reportData
          this.plantCapcity = resp.data['capacity']
          // this.dataSource[0]['co2saved'] = resp.data['co2-saved']
          this.dataSource[0].water = resp.data['water-saved']
          // this.allReportTabledata = this.dataSource
          this.service.getBotStatus(this.plantsId, this.startDate, this.endDate).subscribe(res => {
            this.dataSource[0].healthybot = res.data[0]['healthybot']
            this.dataSource[0].unhealthybot = res.data[0]['unhealthybot']
            this.allReportTabledata = this.dataSource
          })

        })
      }
    } else if (this.allselectedamcstatus.disselected) {

    } else {
      this.getavgUptimeData()
      this.getavgSoilingData()
      this.service.getReportData1(this.plantsId, this.startDate, this.endDate).subscribe(res => {
        this.reportData = res.data;
      })
      this.service.getSummary1(this.plantsId, this.startDate, this.endDate).subscribe(resp => {
        this.dataSource = this.reportData
        this.plantCapcity = resp.data['capacity']
        // this.dataSource[0]['co2saved'] = resp.data['co2-saved']
        this.dataSource[0].water = resp.data['water-saved']
        // this.allReportTabledata = this.dataSource
        this.service.getBotStatus(this.plantsId, this.startDate, this.endDate).subscribe(res => {
          this.dataSource[0].healthybot = res.data[0]['healthybot']
          this.dataSource[0].unhealthybot = res.data[0]['unhealthybot']
          this.allReportTabledata = this.dataSource
        })
      })
    }
    this.allselectedamcstatus.selected = false
    this.allselectedamcstatus.disselected = false
  }
  getIncharge(plants: any) {
    this.plantsId = ""
    if (plants.length == 0) {
      let filterAmcDataAll: any = []
      let amcarrayDataAll: any = []
      this.allPlantsList.forEach(id => {

        if (this.plantsId == undefined || this.plantsId == null || this.plantsId == '') {
          this.plantsId = id.uuid
        }
        else {

          this.plantsId = this.plantsId + "," + id.uuid
        }
      })
      this.allPlantsList.forEach(id => {
        if (id.plant_amc == 'With AMC') {
          amcarrayDataAll.push({
            plant_amc: id.plant_amc
          })
        }
      })
      this.allPlantsList.forEach(id => {
        if (id.plant_amc == 'Without AMC') {
          amcarrayDataAll.push({
            plant_amc: id.plant_amc
          })
        }
      })

      filterAmcDataAll = _.sortedUniqBy(amcarrayDataAll, (o) => {
        return o.plant_amc;
      })
      this.amcStatusList = filterAmcDataAll
    }
    if (plants[0] != null) {
      this.amcStatusList = []
      this.allInchargeList = []
      let inchargePredicateQuery = '*';
      let inchargePredicateList = [];
      let amcarrayData: any = []
      let filterAmcData: any = []
      plants.forEach(id => {
        if (id.plant_amc == 'With AMC') {
          amcarrayData.push({
            plant_amc: id.plant_amc
          })
        }
      })
      plants.forEach(id => {
        if (id.plant_amc == 'Without AMC') {
          amcarrayData.push({
            plant_amc: id.plant_amc
          })
        }
      })
      filterAmcData = _.sortedUniqBy(amcarrayData, (o) => {
        return o.plant_amc;
      })
      this.amcStatusList = filterAmcData
      plants.forEach(id => {
        inchargePredicateList.push("uuid=" + "'" + id.uuid + "'");
      })
      if (inchargePredicateList.length > 0) {
        inchargePredicateQuery = inchargePredicateList.join(" or ");
      }
      let arrayData: any = []
      let arrayData1: any = []
      arrayData = jsonata("data[*].countries[*].states[*].plants[" + inchargePredicateQuery + "].incharges").evaluate(this.jsonData)
      let newData = Array.isArray(arrayData) ? arrayData : [arrayData];
      arrayData1 = _.sortedUniqBy(newData, (o) => {
        return o.name;
      })
      if (newData.length) {
        this.allInchargeList = arrayData1
      }
      else {
        this.allInchargeList.push(arrayData1)
      }
    }
    else {
      // this.allInchargeList = []
      this.allSelected1 = false
      this.select1 = false
    }
    plants.forEach(id => {

      if (this.plantsId == undefined || this.plantsId == null || this.plantsId == '') {
        this.plantsId = id.uuid
      }
      else {

        this.plantsId = this.plantsId + "," + id.uuid
      }
    })
    if (this.allselectedplantstatus.selected) {
      if (this.allPlantsList.length == plants.length) {
        this.getavgUptimeData()
        this.getavgSoilingData()
        this.service.getReportData1(this.plantsId, this.startDate, this.endDate).subscribe(res => {
          this.reportData = res.data;
        })
        this.service.getSummary1(this.plantsId, this.startDate, this.endDate).subscribe(resp => {
          this.dataSource = this.reportData
          this.plantCapcity = resp.data['capacity']
          // this.dataSource[0]['co2saved'] = resp.data['co2-saved']
          this.dataSource[0].water = resp.data['water-saved']
          // this.allReportTabledata = this.dataSource
          this.service.getBotStatus(this.plantsId, this.startDate, this.endDate).subscribe(res => {
            this.dataSource[0].healthybot = res.data[0]['healthybot']
            this.dataSource[0].unhealthybot = res.data[0]['unhealthybot']    
            this.allReportTabledata = this.dataSource
          })
        })
      }
    } else if (this.allselectedplantstatus.disselected) {

    } else {
      this.getavgUptimeData()
      this.getavgSoilingData()
      this.service.getReportData1(this.plantsId, this.startDate, this.endDate).subscribe(res => {
        this.reportData = res.data;
      })
      this.service.getSummary1(this.plantsId, this.startDate, this.endDate).subscribe(resp => {
        this.dataSource = this.reportData
        this.plantCapcity = resp.data['capacity']
        // this.dataSource[0]['co2saved'] = resp.data['co2-saved']
        this.dataSource[0].water= resp.data['water-saved']
        // this.allReportTabledata = this.dataSource
        this.service.getBotStatus(this.plantsId, this.startDate, this.endDate).subscribe(res => {
          this.dataSource[0].healthybot = res.data[0]['healthybot']
          this.dataSource[0].unhealthybot = res.data[0]['unhealthybot']
          this.allReportTabledata = this.dataSource
        })
      })
    }

    this.allselectedplantstatus.selected = false
    this.allselectedplantstatus.disselected = false



  }
  getavgUptimeData() {
    this.avgUptime = []
    this.uptimeSeries = []
    this.uptimeXaxis = []
    this.allAvgUptime = []
    this.uptimeXaxis = []
    this.service.getuptimedata1(this.plantsId, this.startDate, this.endDate).subscribe(res => {
      this.uptimeSeries=[]
      this.avgUptime=[]
      this.avgUptime = res;
      if (this.avgUptime.data[0].series) {
        let threasholdVal: any = this.avgUptime.data[0].threshold;
        let newData: any = this.avgUptime.data[0].series
        let uptimeData: any = _.filter(newData, { 'name': "With AMC" })[0];
        let uptimeDataWo: any = _.filter(newData, { 'name': "Without AMC" })[0];

        if (uptimeData && uptimeDataWo) {
          this.uptimeSeries.push({
            name: uptimeData.name,
            data: uptimeData.data,
            type: "line"
          })
          this.uptimeSeries.push({
            name: uptimeDataWo.name,
            data: uptimeDataWo.data,
            type: "line"
          })
          this.uptimeColors = ["#F68D5D80", "#6F6BF480", "#2D3047"]
          this.uptimeStrok = {
            width: [2, 2, 1],
            curve: "smooth",
            dashArray: [0, 0, 8]
          }
          this.uptimeMarker = {
            size: [3, 3, 0],
            colors: undefined,
            strokeColors: ["#F68D5D80", "#6F6BF480", "#000000"],
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
        else if (uptimeData && !uptimeDataWo) {
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
        }
        else if (uptimeDataWo && !uptimeData) {
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
        /*  let threashold: any = [];
         for (let i = 0; i < this.uptimeSeries[0].data.length; i++) {
           threashold.push(threasholdVal)
         }
         this.uptimeSeries.push({
           name: "",
           data: threashold,
           type: "line"
         })
    */
        let sum: number = 0
        let sum1: number = 0
        if (uptimeData && uptimeDataWo) {
          for (let i = 0; i < uptimeData.data.length; i++) {
            sum = sum + parseFloat(uptimeData.data[i])
          }
          for (let i = 0; i < uptimeDataWo.data.length; i++) {
            sum1 = sum1 + parseFloat(uptimeDataWo.data[i])
          }
          let avg = parseFloat(sum / uptimeData.data.length).toFixed(2)
          let avg1 = parseFloat(sum1 / uptimeDataWo.data.length).toFixed(2)
          let mean = +avg + +avg1
          this.allAvgUptime.push({
            name: uptimeData.name,
            average: avg
          }, {
            name: uptimeDataWo.name,
            average: avg1
          }, {
            averageMean: parseFloat(mean / 2).toFixed(2)
          })

        }
        else if (uptimeData && !uptimeDataWo) {
          for (let i = 0; i < uptimeData.data.length; i++) {
            sum = sum + parseFloat(uptimeData.data[i])
          }
          let avg = parseFloat(sum / uptimeData.data.length).toFixed(2)
          this.allAvgUptime.push({
            name: uptimeData.name,
            average: avg
          }, {
            averageMean: parseFloat(avg).toFixed(2)
          })
        } else if (uptimeDataWo && !uptimeData) {
          for (let i = 0; i < uptimeDataWo.data.length; i++) {
            sum1 = sum1 + parseFloat(uptimeDataWo.data[i])
          }
          let avg1 = parseFloat(sum1 / uptimeDataWo.data.length).toFixed(2)
          this.allAvgUptime.push({
            name: uptimeDataWo.name,
            average: avg1
          }, {
            averageMean: parseFloat(avg1).toFixed(2)
          })
        }

        let data: any = this.avgUptime.data[0]
        let data1: any = data['x-axis'];
        this.uptimeXaxis.push({
          categories: data1, tickPlacement: 'on', tickAmount: 19, axisBorder: {
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
            }
          }

        })
      } else {
        this.chartOptions4 = {}
      }
    })
  }
  getavgSoilingData() {
    this.avgsoiling = []
    this.soilingSeries = []
    this.soilingXaxis = []
    this.allAvgSoilloss = []
    this.soilingXaxis = []
    this.service.getsoilingloss1(this.plantsId, this.startDate, this.endDate).subscribe(res => {
      this.soilingSeries=[]
      this.avgsoiling=[]
      this.avgsoiling = res;
      if (this.avgsoiling.data[0].series) {
        let threasholdVal: any = this.avgsoiling.data[0].threshold;
        let newData: any = this.avgsoiling.data[0].series

        let soilingData: any = _.filter(newData, { 'name': "With AMC" })[0];
        let soilingDataWo: any = _.filter(newData, { 'name': "Without AMC" })[0];

        if (soilingData && soilingDataWo) {
          this.soilingSeries.push({
            name: soilingData.name,
            data: soilingData.data,
            type: "column"
          })
          this.soilingSeries.push({
            name: soilingDataWo.name,
            data: soilingDataWo.data,
            type: "line"
          })
          this.soilingLoassColors = ["#F68D5D80", "#6F6BF480", "#2D3047"]
          this.soilingStrok = {
            width: [2, 2, 1],
            curve: "smooth",
            dashArray: [0, 0, 8]
          }
          this.soilingMarkers = {
            size: [3, 3, 0],
            colors: undefined,
            strokeColors: ["#F68D5D80", "#6F6BF480", "#000000"],
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
        else if (soilingData && !soilingDataWo) {
          this.soilingSeries.push({
            name: soilingData.name,
            data: soilingData.data,
            type: "column"
          })
          this.soilingLoassColors = ["#F68D5D80", "#2D3047"]
          this.soilingStrok = {
            width: [2, 1],
            curve: "smooth",
            dashArray: [0, 8]
          }
          this.soilingMarkers = {
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
        }
        else if (soilingDataWo && !soilingData) {
          this.soilingSeries.push({
            name: soilingDataWo.name,
            data: soilingDataWo.data,
            type: "line"
          })
          this.soilingLoassColors = ["#6F6BF480", "#2D3047"]
          this.soilingStrok = {
            width: [2, 1],
            curve: "smooth",
            dashArray: [0, 8]
          }
          this.soilingMarkers = {
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
        /*  let threashold: any = [];
         for (let i = 0; i < this.soilingSeries[0].data.length; i++) {
           threashold.push(threasholdVal)
         }
         this.soilingSeries.push({
           name: "",
           data: threashold,
           type: "line"
         })
    */
        let sum: number = 0
        let sum1: number = 0
        if (soilingData && soilingDataWo) {

          for (let i = 0; i < soilingData.data.length; i++) {
            sum = sum + parseFloat(soilingData.data[i])
          }

          for (let i = 0; i < soilingDataWo.data.length; i++) {
            sum1 = sum1 + parseFloat(soilingDataWo.data[i])
          }

          let avg = parseFloat(sum / soilingData.data.length).toFixed(2)
          let avg1 = parseFloat(sum1 / soilingDataWo.data.length).toFixed(2)
          let mean = +avg + +avg1
          this.allAvgSoilloss.push({
            name: soilingData.name,
            average: avg
          }, {
            name: soilingDataWo.name,
            average: avg1
          }, {
            averageMean: parseFloat(mean / 2).toFixed(2)
          })
        }
        else if (soilingData && !soilingDataWo) {
          for (let i = 0; i < soilingData.data.length; i++) {
            sum = sum + parseFloat(soilingData.data[i])
          }
          let avg = parseFloat(sum / soilingData.data.length).toFixed(2)
          this.allAvgSoilloss.push({
            name: soilingData.name,
            average: avg
          }, {
            averageMean: parseFloat(avg).toFixed(2)
          })
        }
        else if (soilingDataWo && !soilingData) {
          for (let i = 0; i < soilingDataWo.data.length; i++) {
            sum1 = sum1 + parseFloat(soilingDataWo.data[i])
          }
          let avg1 = parseFloat(sum1 / soilingDataWo.data.length).toFixed(2)
          this.allAvgSoilloss.push({
            name: soilingDataWo.name,
            average: avg1
          }, {
            averageMean: parseFloat(avg1).toFixed(2)
          })
        }
        let data: any = this.avgsoiling.data[0]
        let data1: any = data['x-axis'];
        this.soilingXaxis.push({
          categories: data1, tickPlacement: 'on', tickAmount: 19, axisBorder: {
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
            }
          }
        })
        setTimeout(() => this.myCharts(), 1500)
      } else {
        this.chartOptions3 = {}
      }
    })
  }
  myCharts() {
    this.allReportTabledata[0].avguptime = this.allAvgUptime[0].average
    this.allReportTabledata[0].avgsoilingloss = this.allAvgSoilloss[0].average
    let soilingData: any
    if (this.allAvgSoilloss.length > 2) {
      soilingData = this.allAvgSoilloss[2]
    } else {
      soilingData = this.allAvgSoilloss[1]
    }
    if (soilingData) {
      //Mixed Chart
      this.chartOptions3 = {
        annotations: {
          yaxis: [
            {
              y: this.avgsoiling.data[0].threshold,
              borderColor: '#000000',
              strokeDashArray: 2,
              textAnchor: 'start',
              label: {
                text: "Threshold Value : " + this.avgsoiling.data[0].threshold+"%",
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
                  fontWeight: 600,
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
        stroke: this.soilingStrok,
        title: {
          text: undefined,
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
              if (cat == 0.50) {
                let lab = parseFloat(categories).toFixed(2) + '%'
                return lab
              } else {
                return parseFloat(categories).toFixed(2) + '%'
              }
            }
          },
        },

        colors: this.soilingLoassColors,
        grid: {
          yaxis: {
            lines: {
              show: false
            }
          }
        },
        markers: this.soilingMarkers,
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

    //Two Line Chart
    let uptimeData: any
    if (this.allAvgUptime.length > 2) {
      uptimeData = this.allAvgUptime[2]
    } else {
      uptimeData = this.allAvgUptime[1]
    }
    if (uptimeData) {
      this.chartOptions4 = {
        annotations: {
          yaxis: [
            {
              y: this.avgUptime.data[0].threshold,
              borderColor: '#000000',
              strokeDashArray: 2,
              textAnchor: 'start',
              label: {
                text: "Threshold Value : " + this.avgUptime.data[0].threshold+"%",
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
                  fontWeight: 600,
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
        colors: this.uptimeColors,
        dataLabels: {
          enabled: false
        },
        stroke: this.uptimeStrok,
        title: {
          text: undefined,
          align: "left"
        },

        markers: this.uptimeMarker,
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
          min: 0,
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
            formatter: (categories: any) => { return parseFloat(categories).toFixed(0) + '%' },
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
  getKpiValue(event) {
    this.displayedColumns = ['date']
    this.allReportTabledata = [{date: '',  avguptime: '', avgsoilingloss: '', co2saved: '', water: '', healthybot: '', unhealthybot: '' }]
    if (event.length == 0) {
      this.displayedColumns.push("avgsoilingloss", "avguptime", "co2saved", "water", "healthybot", "unhealthybot")
      this.allReportTabledata = this.dataSource
    }
    if (this.allselectedkpistatus.selected) {
      if (this.allkpisList.length == event.length) {
        for (let i = 0; i < event.length; i++) {
          if (event[i] == 'Average Uptime') {
            this.displayedColumns.push("avguptime")
            this.allReportTabledata[0].avguptime = this.allAvgUptime[0].average
            // if (this.allAvgUptime[0].name == 'With AMC') {
            //   this.dataSource[0]['avguptime'] = this.allAvgUptime[0].average
  
            // } else if(allAvgUptime[0].name == 'Without AMC'){
            //   this.dataSource[0]['avguptime']=this.allAvgUptime[0].average
            //   this.allReportTabledata.avguptime=this.allAvgUptime[0].average
            // }
            // else{
            //   this.dataSource[0]['avguptime']=this.allAvgUptime[1].average
            // }
  
          }
          if (event[i] == 'Average Soiling') {
            this.allReportTabledata[0].avgsoilingloss = this.allAvgSoilloss[0].average
            this.displayedColumns.push("avgsoilingloss")
  
            // if (this.allAvgSoilloss[0].name == 'With AMC') {
            //   this.dataSource[0]['avgsoilingloss'] = this.allAvgSoilloss[0].average
  
            // }
            // if(allAvgSoilloss[0].name == 'Without AMC'){
            //   this.dataSource[0]['avgsoilingloss']=this.allAvgSoilloss[0].average
            // }else{
            //   this.dataSource[0]['avgsoilingloss']=this.allAvgSoilloss[1].average
            // }
  
          } if (event[i] == 'BOT Operation Status') {
            this.service.getBotStatus(this.plantsId, this.startDate, this.endDate).subscribe(res => {
              this.displayedColumns.push('healthybot', 'unhealthybot')
              this.allReportTabledata[0].healthybot = res.data[0]['healthybot']
              this.allReportTabledata[0].unhealthybot = res.data[0]['unhealthybot']
              this.dataSource[0]['healthybot'] = res.data[0]['healthybot']
              this.dataSource[0]['unhealthybot'] = res.data[0]['unhealthybot']
            })
          } if (event[i] == "CO2 Saved") {
            this.service.getSummary1(this.plantsId, this.startDate, this.endDate).subscribe(res => {
              this.allReportTabledata[0].co2saved = res.data['co2-saved']
              this.dataSource[0]['co2saved'] = res.data['co2-saved']
              this.displayedColumns.push('co2saved')
  
            })
          } if (event[i] == "Water Saved") {
            this.service.getSummary1(this.plantsId, this.startDate, this.endDate).subscribe(res => {
              this.dataSource[0]['water'] = res.data['water-saved']
              this.allReportTabledata[0].water = res.data['water-saved']
              this.displayedColumns.push('water')
            })
  
          }
        }
      }
    } else if (this.allselectedkpistatus.disselected) {

    } else {
      for (let i = 0; i < event.length; i++) {
        if (event[i] == 'Average Uptime') {
          this.displayedColumns.push("avguptime")
          this.allReportTabledata[0].avguptime = this.allAvgUptime[0].average
          // if (this.allAvgUptime[0].name == 'With AMC') {
          //   this.dataSource[0]['avguptime'] = this.allAvgUptime[0].average

          // } else if(allAvgUptime[0].name == 'Without AMC'){
          //   this.dataSource[0]['avguptime']=this.allAvgUptime[0].average
          //   this.allReportTabledata.avguptime=this.allAvgUptime[0].average
          // }
          // else{
          //   this.dataSource[0]['avguptime']=this.allAvgUptime[1].average
          // }

        }
        if (event[i] == 'Average Soiling') {
          this.allReportTabledata[0].avgsoilingloss = this.allAvgSoilloss[0].average
          this.displayedColumns.push("avgsoilingloss")

          // if (this.allAvgSoilloss[0].name == 'With AMC') {
          //   this.dataSource[0]['avgsoilingloss'] = this.allAvgSoilloss[0].average

          // }
          // if(allAvgSoilloss[0].name == 'Without AMC'){
          //   this.dataSource[0]['avgsoilingloss']=this.allAvgSoilloss[0].average
          // }else{
          //   this.dataSource[0]['avgsoilingloss']=this.allAvgSoilloss[1].average
          // }

        } if (event[i] == 'BOT Operation Status') {
          this.service.getBotStatus(this.plantsId, this.startDate, this.endDate).subscribe(res => {
            this.displayedColumns.push('healthybot', 'unhealthybot')
            this.allReportTabledata[0].healthybot = res.data[0]['healthybot']
            this.allReportTabledata[0].unhealthybot = res.data[0]['unhealthybot']
            this.dataSource[0]['healthybot'] = res.data[0]['healthybot']
            this.dataSource[0]['unhealthybot'] = res.data[0]['unhealthybot']
          })
        } if (event[i] == "CO2 Saved") {
          this.service.getSummary1(this.plantsId, this.startDate, this.endDate).subscribe(res => {
            this.allReportTabledata[0].co2saved = res.data['co2-saved']
            this.dataSource[0]['co2saved'] = res.data['co2-saved']
            this.displayedColumns.push('co2saved')

          })
        } if (event[i] == "Water Saved") {
          this.service.getSummary1(this.plantsId, this.startDate, this.endDate).subscribe(res => {
            this.dataSource[0]['water'] = res.data['water-saved']
            this.allReportTabledata[0].water = res.data['water-saved']
            this.displayedColumns.push('water')
          })

        }
      }
    }
    this.allselectedkpistatus.selected = false
    this.allselectedkpistatus.disselected = false
  }
  getFormat(event) {
    this.reportPdfCsv = event
  }
  generateReport() {
    this.allReportTabledata[0].date = this.dataSource[0].date
      console.log('allPlants1',this.allPlants.value)
    if( this.allRegion.value == null || this.allRegion.value.length <= 0 ) {
    this.toastr.warning('Please select region')
  }else if( this.allCountry.value == null || this.allCountry.value.length <= 0 ) {
    this.toastr.warning('Please select country')
  }else if( this.allState.value == null || this.allState.value.length <= 0 ) {
    this.toastr.warning('Please select state')
  } else if( this.allPlants.value == null || this.allPlants.value.length <= 0   ) {
    this.toastr.warning('Please select plant')
}else if( this.allIncharge.value == null || this.allIncharge.value.length <= 0 ) {
  this.toastr.warning('Please select incharge')
}else if( this.allkpis.value == null || this.allkpis.value.length <= 0 ) {
  this.toastr.warning('Please select KPI')
}
else if( this.amcStatus.value == null || this.amcStatus.value.length <= 0 ) {
  this.toastr.warning('Please select AMC status')
}
  else{
    
    if (this.reportPdfCsv == 'PDF Format') {
      let formData = new FormData()
      let eimaster = this.service;
      let santizers = this.sanitizer;
      let reportData = this.allReportTabledata
      let th = this
      let toastr = this.toastr
      let plantString: any
      let inchareString: any
      let regionString: any
      let countryString: any
      let stateString: any
      let amcString: any

      if (this.allPlants.value) {
        this.allPlants.value.forEach(element => {
          if (plantString == undefined || plantString == null || plantString == '') {
            plantString = element.name
          }
          else {
            plantString = plantString + "," + element.name
          }
        });
      }
      if (this.allIncharge.value) {
        this.allIncharge.value.forEach(element => {
          if (inchareString == undefined || inchareString == null || inchareString == '') {
            inchareString = element.name
          }
          else {
            inchareString = inchareString + "," + element.name
          }
        });
      }
      if (this.allRegion.value) {
        this.allRegion.value.forEach(element => {
          if (regionString == undefined || regionString == null || regionString == '') {
            regionString = element.name
          }
          else {
            regionString = regionString + "," + element.name
          }
        });
      }
      if (this.allCountry.value) {
        this.allCountry.value.forEach(element => {
          if (countryString == undefined || countryString == null || countryString == '') {
            countryString = element.name
          }
          else {
            countryString = countryString + "," + element.name
          }
        });
      }
      if (this.allState.value) {
        this.allState.value.forEach(element => {
          if (stateString == undefined || stateString == null || stateString == '') {
            stateString = element.name
          }
          else {
            stateString = stateString + "," + element.name
          }
        });
      }
      if (this.amcStatus.value) {
        this.amcStatus.value.forEach(element => {
          if (amcString == undefined || amcString == null || amcString == '') {
            amcString = element.plant_amc
          }
          else {
            amcString = amcString + "," + element.plant_amc
          }
        });
      }

      // const filteredArray = reportData.map(obj => Object.fromEntries(
      //   Object.entries(obj).filter(([key]) => this.displayedColumns.includes(key))
      // ));
      // let columnHeader=[]
      // this.displayedColumns.forEach(col =>{
      //    if(col === 'date'){
      //     columnHeader.push('Date')
      //    }else if(col === 'avguptime'){
      //     columnHeader.push('Average Uptime')
      //    }else if(col === 'avgsoilingloss'){
      //     columnHeader.push('Average Soiling Loss')
      //    }else if(col === 'co2saved'){
      //     columnHeader.push('CO2 Saved')
      //    }else if(col === 'water'){
      //     columnHeader.push('Water Saved')
      //    }else if(col === 'healthybot'){
      //     columnHeader.push('Healthy Bot')
      //    }else if(col === 'unhealthybot'){
      //     columnHeader.push('UnHealthy Bot')
      //    }
      // })

// console.log(filteredKeys);
      // console.log('filteredArray',filteredArray)
      const data = {
        allPlants: plantString == null ? '' : plantString,
        allIncharge: inchareString == null ? '' : inchareString,
        allRegion: regionString == null ? '' : regionString,
        allCountry: countryString == null ? '' : countryString,
        allState: stateString == null ? '' : stateString,
        allkpis: this.allkpis.value.toString() == null ? '' : this.allkpis.value.toString(),
        amcStatus: amcString == null ? '' : amcString,
        plantcapacity: this.plantCapcity.toString() == null ? '' : this.plantCapcity.toString(),
        logo: localStorage.getItem('logo')?.toString() == null ? '' : localStorage.getItem('logo')?.toString(),
        reporttitle: this.reportStatus.toString(),
        data: reportData
      }
        // column:columnHeader
      // console.log('columnheader',columnHeader)
      // console.log('displycolumn',this.displayedColumns)

      console.log('reportdata',reportData)
      let element = document.getElementById("capture");
      let element1 = document.getElementById("capture1");
      html2canvas(element).then(function (canvas) {
        html2canvas(element1).then(function (canvas1) {
          var image1 = canvas1.toDataURL("image/png");
          var image = canvas.toDataURL("image/png");
          formData.set('file1', image1);
          formData.set('file', image);
          formData.set('json', JSON.stringify(data));
          eimaster.generateFile(formData).subscribe(resp => {

            let blob = new Blob([resp], { type: 'application/pdf' })
            FileSaver.saveAs(blob, 'report' + '.pdf')
            toastr.success('PDF Download Successfully')
          }, err => {
            toastr.error('Please try after sometime or check your internet connection')
          });
        });
      });
    } else if (this.reportPdfCsv == "CSV Format") {
      let data1 = {
        data: this.allReportTabledata
      }
      this.service.generateCSV(data1).subscribe(res => {
        let blob1 = new Blob([res], { type: 'text/csv' });
        FileSaver.saveAs(blob1, 'report' + '.csv');
        this.toastr.success("CSV Download Successfully")
      })
    } else if (this.reportPdfCsv == 'Excel Format') {

      let data1 = {
        data: this.allReportTabledata
      }
      this.service.generateExcle(data1).subscribe(res => {
        let blob1 = new Blob([res], { type: 'application/vnd.openxmlformats-ficedocument.spreadsheetml.sheet' });
        FileSaver.saveAs(blob1, 'report' + '.xlsx');
        this.toastr.success("Excle File Download Successfully")
      })
    } else {
      this.toastr.warning('Please Select Download Format')
    }
  }
  }

  foods: Food[] = [
    { value: 'steak-0', viewValue: 'Steak' },
    { value: 'pizza-1', viewValue: 'Pizza' },
    { value: 'tacos-2', viewValue: 'Tacos' },
  ];


}
