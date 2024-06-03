//@ts-nocheck
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {FormControl} from '@angular/forms';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {AfterViewInit} from '@angular/core';
import {MatSort, Sort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {LiveAnnouncer} from '@angular/cdk/a11y';
import { MatOption } from '@angular/material/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSelect } from '@angular/material/select';
import { PlantServiceService} from '../../../services/plants/plant-service.service'
import { ActivatedRoute } from '@angular/router';
import * as moment from 'moment'
import { DataService } from '../../../data.service'
import { ToastrService } from 'ngx-toastr';
import FileSaver from 'file-saver';

interface Food {
  value: string;
  viewValue: string;
}

export interface PeriodicElement {
  bot_id: string;
  knuip: string;
  table_no: string;
  inspection_of: string;  
  priority: string;
  assignee: string;
  status: string;
}


const ELEMENT_DATA: PeriodicElement[] = [
 ];
@Component({
  selector: 'app-plant-service',
  templateUrl: './plant-service.component.html',
  styleUrls: ['./plant-service.component.scss']
})
export class PlantServiceComponent implements OnInit {
  calendar ='7';
  priority='';
  flag:Boolean=false
  status='';
  allStatus = new FormControl();
  allPriority = new FormControl();
  allSelected = false;
  allSelected1 = false;
  paramaterType:any
  maxDate=new Date()
  allPriorityList = [
    {
        key: 1, value: 'High',
    },
    {
        key: 2, value: 'Medium',
    },
    {
        key: 3, value: 'Low',
    },
];
allStatusList = [
    {
        key: 1, value: 'Resolved',
    },
    {
        key: 2, value: 'Open',
    },
    {
      key: 3, value: 'New',
  },
];
plantsid:any
knuid:any
botstatus:any
botid:any
startDate:any
endDate:any
@ViewChild('select') select: MatSelect;
@ViewChild('select1') select1: MatSelect;

toggleAllSelection() {
  if (this.allSelected) {
    this.select.options.forEach((item: MatOption) => item.select());
  } else {
    this.select.options.forEach((item: MatOption) => item.deselect());
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
  reset() {
    this.calendar ='7';
    this.priority = '';
    this.status = '';
    this.getSummary()
    }/* 'knu_ip', */
  displayedColumns: string[] = ['bot_id',  'table_no', 'inspection_of','priority','assignee','status'];
  dataSource = new MatTableDataSource();

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  /* ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  } */
 
  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }
  constructor(public dialog: MatDialog,private _liveAnnouncer: LiveAnnouncer,private plantServiceService:PlantServiceService,private route: ActivatedRoute,private toastr: ToastrService, private service: DataService) {
    this.route.params.subscribe(params => {
     
      if(!(_.isEmpty(params))){
      this.flag=true
      this.paramaterType = params['type']
      this.plantsid=params['plantid']
      this.knuid=params['knuid']
      this.botstatus=params['status']
      this.botid=params['botid']
      this.startDate=params['startdate']
      this.endDate=params['enddate']
      }
    })
   }

  ngOnInit() {
    if(this.flag){
      let filterpriority ='';
      let filterStatus=''
      if(this.priority.length>0){
        for(let i=0;i<this.priority.length;i++){
          if(this.priority.length===1||filterpriority===''){
            filterpriority=this.priority[i] 
          }else{
            filterpriority=filterpriority+","+this.priority[i] 
          }
         
        }
      }
      if(this.status.length>0){
        for(let i=0;i<this.status.length;i++){
          if(this.status.length===1||filterStatus===''){
            filterStatus=this.status[i]
          }else{
          filterStatus=filterStatus+","+this.status[i]
          }
        }
      }
      let params='&startdate='+this.startDate+'&'+'enddate='+this.endDate+'&botid='+this.botid+'&knuid='+this.knuid+'&botstatus='+this.botstatus+'&plant='+this.plantsid+'&paramaterType='+this.paramaterType+'&priority='+filterpriority+'&status='+filterStatus
      this.plantServiceService.getServiceNotifiactions(params).subscribe(res=>{
        this.dataSource=[]
        // this.dataSource=res.data
        this.dataSource= new MatTableDataSource(res.data);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator; 
     })}else{
      this.endDate=moment().format("DD-MM-YYYY")
      this.startDate=moment().subtract(7, 'days').format("DD-MM-YYYY") 
        this.getSummary()
     }
  }
  getSummary(){
    let filterpriority ='';
    let filterStatus=''
    if(this.priority.length>0){
      for(let i=0;i<this.priority.length;i++){
        if(this.priority.length===1||filterpriority===''){
          filterpriority=this.priority[i] 
        }else{
          filterpriority=filterpriority+","+this.priority[i] 
        }
       
      }
    }
    if(this.status.length>0){
      for(let i=0;i<this.status.length;i++){
        if(this.status.length===1||filterStatus===''){
          filterStatus=this.status[i]
        }else{
        filterStatus=filterStatus+","+this.status[i]
        }
      }
    }
    let params='&startdate='+this.startDate+'&'+'enddate='+this.endDate+'&priority='+filterpriority+'&status='+filterStatus
    this.plantServiceService.getServiceNotifiactions(params).subscribe(res=>{
      this.dataSource=[]
      // this.dataSource=res.data
      this.dataSource= new MatTableDataSource(res.data);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
     })
  }
  selectedCustomStartDate(days){ 
    this.startDate=moment(days.value).format("DD-MM-YYYY")
      
    }
    selectedCustomEndDate(days){
    this.endDate=moment(days.value).format("DD-MM-YYYY") 
    this.getSummary()
    }

  filterByDate(date){
    
    this.startDate=moment().format("DD-MM-YYYY")
    this.endDate=moment().subtract(date, 'days').format("DD-MM-YYYY")
    this.getSummary()
  }
  filterByPriority(priority){ 
  //this.priority=priority
  this.getSummary()
  }
  filterByStatus(status){
   // this.status=status
    this.getSummary()
  }
  downloadPdf(){
    
    let formData = new FormData()
    if(this.dataSource.filteredData === null){
      this.dataSource.filteredData=[]
    }
    let data = {
      data:this.dataSource.filteredData,
      column:['BOT ID', 'Table No.', 'Inspection Of','Priority','Assignee','Status'],
      reporttitle:"Service Notification",
      logo:localStorage.getItem('logo')?.toString() == null ?  '' : localStorage.getItem('logo')?.toString() 
    }
    formData.set('json', JSON.stringify(data));
    this.service.generatePdf(formData).subscribe(resp => {
      let blob = new Blob([resp], { type: 'application/pdf' })
      FileSaver.saveAs(blob, 'service' + '.pdf')
      this.toastr.success('PDF Download Successfully')
    }, err => {
      this.toastr.error('Please try after sometime or check your internet connection')
    });
  }
  foods: Food[] = [
    {value: 'steak-0', viewValue: 'Steak'},
    {value: 'pizza-1', viewValue: 'Pizza'},
    {value: 'tacos-2', viewValue: 'Tacos'},
  ];

} 