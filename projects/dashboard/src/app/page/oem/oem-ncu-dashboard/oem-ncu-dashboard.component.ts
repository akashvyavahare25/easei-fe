
//@ts-nocheck
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatOption } from '@angular/material/core';
import { MatPaginator } from '@angular/material/paginator';
import { AfterViewInit } from '@angular/core';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { OemNcuService } from '../../../services/oem/oem-ncu.service';
import { ActivatedRoute } from '@angular/router';
import { PlantServiceService } from '../../../services/plants/plant-service.service';
import { DataService } from '../../../data.service';
import { Subject } from 'rxjs';
var jsonata = require('jsonata');

export interface PeriodicElement {
  ticketid: string;
  ncuid: string;
  date: string;
  time: string;
  component: string;
  description: string;
  expectedtat: string;
}

export interface PeriodicElement1 {
  ticketid: string;
  ncuid: string;
  date: string;
  time: string;
  component: string;
  description: string;
  expectedtat: string; 
}
const ELEMENT_DATA: PeriodicElement[] = [
  ]
  const ELEMENT_DATA1: PeriodicElement1[] = [
    ]
@Component({
  selector: 'app-oem-ncu-dashboard',
  templateUrl: './oem-ncu-dashboard.component.html',
  styleUrls: ['./oem-ncu-dashboard.component.scss']
})
export class OemBcuDashboardComponent implements OnInit {
  displayedColumns1: string[] =['ticketid', 'ncuid', 'date', 'time','component','description','expectedtat'];
  ncuNotificationData  :any =new MatTableDataSource();
  displayedColumns: string[] = ['ticketid', 'ncuid', 'date', 'time','component','description','expectedtat'];
  ncuAlramData  :any =new MatTableDataSource();
  ncuSummary:any 
  paramaterType:any
  NcuBcuJsonId:any 
  ncuList: any = []
  bcuList: any = []
  plantList: any = []
  plantId: any
  ncuId: any
  bcuId: any
  plantnewid:any=[]
  plantName:any
  ncuSummaryFromAdminService:any
  idchildNotifier: Subject<any> = new Subject<any>(); 
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator; 
  constructor(private _liveAnnouncer:LiveAnnouncer,private oemService : OemNcuService,private service : DataService,private route: ActivatedRoute, private plantService: PlantServiceService) { 
    this.route.params.subscribe(params => {
      this.paramaterType = params['type']
    })
  }

  ngOnInit(): void { 
    this.ncuId=''
    this.summaryData(this.ncuId)
    if(this.paramaterType){
      let type='&type='+this.paramaterType+'&knu='+this.ncuId
      this.getncuAlarmDetails(type);
      // console.log("PARAM TYPE ",this.paramaterType)
    }else{
      let id='&knu='+this.ncuId
      this.getncuAlarmDetails(id)
    }
    this.getncuNotificationDwtials(this.ncuId)    
    this.plantService.getPlantHierachyData().subscribe(res => {
      this.NcuBcuJsonId = res
      this.getNcuBcuID(this.NcuBcuJsonId);
    }) 
  }
  getNcuBcuID(data) {
    let NcuData: any = []
    this.plantnewid = localStorage.getItem('plant').split(',')
    let plant:any = this.plantnewid[0] 
    let id = "id= '" + plant + "'"
    let plantData:any=[]
    plantData = jsonata("data["+ id +"]").evaluate(data);
    this.plantName=plantData.name
    NcuData = jsonata("data["+ id +"].knu").evaluate(data);
    this.ncuId = ''
    NcuData.forEach(element => {
      if (this.ncuId == undefined || this.ncuId == null || this.ncuId == '') {
        this.ncuList.push({
          name: element.name,
          id: element.id
        })
      }
    });
  }
  summaryData(id :any){
    this.oemService.getncuSummary(id).subscribe(res =>{
          this.ncuSummary =res.data[0]
    }) 
    let plant :any = localStorage.getItem('plant')
    this.service.getSummary1(plant).subscribe(res => {
      this.ncuSummaryFromAdminService = res.data
    })
  }

  getncuAlarmDetails(id){
    this.oemService.getncuAlarmDetails(id).subscribe(res =>{ 
      this.ncuAlramData=[] 
      this.ncuAlramData= new MatTableDataSource(res.data);
      this.ncuAlramData.sort = this.sort;
      this.ncuAlramData.paginator = this.paginator; 
    })
  }

  getncuNotificationDwtials(id){
    this.oemService.getncuNotificationDetails(id).subscribe(res =>{
      this.ncuNotificationData= new MatTableDataSource(res.data);
      this.ncuNotificationData.sort = this.sort;
      this.ncuNotificationData.paginator = this.paginator; 
    })
  }
 

  ngAfterViewInit() {
    /*   this.ncuAlramData.sort = this.sort;
      this.ncuAlramData.paginator = this.paginator;
      this.ncuNotificationData.sort = this.sort;
      this.ncuNotificationData.paginator = this.paginator; */
  }
  selectNcuId(event){
    this.ncuId=event
    this.idchildNotifier.next(this.ncuId); 
    this.summaryData(this.ncuId);
    let id='&knu='+this.ncuId
    this.getncuAlarmDetails(id)
    this.getncuNotificationDwtials(this.ncuId)
  }
  announceSortChange(sortState: Sort) {
      if (sortState.direction) {
          this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
      } else {
          this._liveAnnouncer.announce('Sorting cleared');
      }
  }
  
}
