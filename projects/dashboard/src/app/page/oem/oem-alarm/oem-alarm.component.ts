//@ts-nocheck
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatOption } from '@angular/material/core';
import { MatPaginator } from '@angular/material/paginator';
import { AfterViewInit } from '@angular/core';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { OembcuService } from '../../../services/oem/oem-bcu.serivce';

var jsonata = require('jsonata');
export interface PeriodicElement1 {
  ncuid: string;
  ncuCommunication: string;
  datetime: string;
  ticketNo: string;
  alarmDescription:string;
  component:string;
  // componentTrackingId:string;
  alertType:string;
  ncuErrorCode:string;
  potentialCauses:string;
  expectedtat: string; 
  // typeOfAction: string; 
  // actionTobeTaken:string
  accountablePerson: string; 
  personTakingAction: string; 
  status: string; 
  actionTaken:string
  expectedtat: string; 
  actualtat:string;
}
export interface PeriodicElement {
  botId: string;
  ncuid: string;
  ncuCommunication: string;
  datetime: string;
  ticketNo: string;
  alarmDescription:string;
  lastPosition: string;
  component:string;
  // componentTrackingId:string;
  alertType:string;
  bcuErrorCode:string;
  potentialCauses:string;
  expectedtat: string; 
  // typeOfAction: string; 
  // actionTobeTaken:string
  accountablePerson: string; 
  personTakingAction: string; 
  status: string; 
  actionTaken:string
  expectedtat: string; 
  actualtat:string;
}

const ELEMENT_DATA1: PeriodicElement1[] = [
]
@Component({
  selector: 'app-oem-alarm',
  templateUrl: './oem-alarm.component.html',
  styleUrls: ['./oem-alarm.component.scss']
})
export class OemAlarmComponent implements OnInit {

  displayedColumns1: string[] = ['ncuid', 'ncuCommunication', 'datetime','ticketNo','alarmDescription','component','alertType','ncuErrorCode','potentialCauses','accountablePerson','personTakingAction','status','actionTaken','expectedtat','actualtat'];
  displayedColumns: string[] = ['botId', 'ncuid', 'ncuCommunication', 'datetime','ticketNo','alarmDescription','lastPosition','component','alertType','bcuErrorCode','potentialCauses','accountablePerson','personTakingAction','status','actionTaken','expectedtat','actualtat'];
  // displayedColumns2: string[] = ['botId', 'ncuid', 'datetime','ticketNo','type','component','componentTrackingId','alertType','actionTobeTaken','accountablePerson','personTakingAction','status','actionTaken','actualtat'];

  dataSource :any =new MatTableDataSource();
  dataSource1:any =new MatTableDataSource();
  // dataSource2:any=[] 
  
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator; 

  constructor(
    private bcuService: OembcuService
  ) { }

  ngOnInit(): void {
    this.bcuService.getAlarmTableData().subscribe(res=>{
      console.log('hiiiiiiiiiiiiiii',res)
      this.dataSource1= new MatTableDataSource(res.data); 
      this.dataSource1.sort = this.sort;
          this.dataSource1.paginator = this.paginator; 
    })

    this.bcuService.getAlarmbotTableData().subscribe(res=>{
      console.log('hiiiiiiiiiiiiiii',res)
      this.dataSource= new MatTableDataSource(res.data); 
      this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator; 
    })

  }
  ngAfterViewInit() {
    
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;

      this.dataSource1.sort = this.sort;
      this.dataSource1.paginator = this.paginator;
/* 
      this.dataSource2.sort = this.sort;
      this.dataSource2.paginator = this.paginator; */
  }
  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }
}
