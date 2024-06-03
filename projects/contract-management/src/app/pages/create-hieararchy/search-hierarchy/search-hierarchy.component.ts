import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { GridOptions } from 'ag-grid-community';
import { NzDatePickerComponent } from 'ng-zorro-antd';
import { APIService } from '../../../services/api.service';
import * as moment from 'moment'
import * as _ from 'lodash'
import { GridActionComponent } from '../../../constants/grid-action/grid-action.component';
import { Router } from '@angular/router';
@Component({
  selector: 'app-search-hierarchy',
  templateUrl: './search-hierarchy.component.html',
  styleUrls: ['./search-hierarchy.component.scss']
})
export class SearchHierarchyComponent implements OnInit {
  hierarcyForm:any
  startValue: Date | null = null;
  endValue: Date | null = null;
 
  gridOptions:any
  uploadData:any=[]
  uploadDataBack:any=[]
  gridApi:any
  @ViewChild('endDatePicker') endDatePicker!: NzDatePickerComponent;

  constructor(private router :Router, private formBuilder: FormBuilder, private apiService: APIService,) { 
    this.gridOptions = <GridOptions>{
      columnDefs : [
        { field: 'root', headerName: 'Root', sortable: true, filter: 'agTextColumnFilter', floatingFilter: true },
        { field: 'created_ts', headerName: 'Date', sortable: true, filter: 'agTextColumnFilter', floatingFilter: true },
        {
          field: 'action',
          headerName: 'Action',
          lockPinned: true,
          pinned: 'right',
          maxWidth: 100,
          cellRendererFramework: GridActionComponent,
        }
      ],
      pagination:true,
      overlayLoadingTemplate: `
      <div class="ag-custom-loading-cell" >  
      <i style="font-size:18px" class="fas fa-spinner fa-pulse"></i> 
      <span style="font-size:16px; margin-left:3px">Loading ... </span>
      </div>`,
        overlayNoRowsTemplate:
          `<span style="font-size:16px">No Rows To Show</span>`,  
      context: {
        componentParent: this,
        tabName: 'hiearachySearch',
      }
    };
  }
  optionList:any=["Date Select",""]
  ngOnInit(): void {
    this.hierarcyForm = this.formBuilder.group({
     
      // dataSet: [null, Validators.required],
    })
    let user = localStorage.getItem('user')
    let data:any=[]
    this.apiService.getHierarchyAllData().subscribe(res=>{
      this.uploadData=res
      this.gridOptions.api!.setRowData(this.uploadData);
      this.onFirstDataRendered(res)
      this.uploadDataBack=res
    })
  }
  
  disabledStartDate = (startValue: Date): boolean => {
    if (!startValue || !this.endValue) {
      return false;
    }
    return startValue.getTime() > this.endValue.getTime();
  };

  disabledEndDate = (endValue: Date): boolean => {
    if (!endValue || !this.startValue) {
      return false;
    }
    return endValue.getTime() <= this.startValue.getTime();
  };

  handleStartOpenChange(open: boolean): void {
    if (!open) {
      this.endDatePicker.onOpenChange;
    }
  
  }

  handleEndOpenChange(open: boolean): void {
    
  }
  create(){
    this.router.navigate(['/drone/create-hierarchy/create'])
  }
  submitForm(){
    if(this.startValue!=null && this.startValue!=undefined)
    {
      let startDate=moment(this.startValue).format("yyyy-MM-DD")
      let endDate:any=''
      if(this.endValue!=null && this.endValue!=undefined)
      {
        endDate=moment(this.endValue).format("yyyy-MM-DD")
      }else{
        endDate=moment(this.startValue).add(1,'days').format("yyyy-MM-DD")
      }
      this.apiService.getAllHierarchy(startDate,endDate).subscribe(res=>{
        this.uploadData=res
        _.map(this.uploadData,(obj)=>{
          obj.created_ts=moment(obj.created_ts).utcOffset(330).format("yyyy-MM-DD HH:mm:ss")
        })
        this.onFirstDataRendered(res)
      })
    }
  }
reset(){
  this.startValue=null
  this.endValue=null
  this.uploadData=this.uploadDataBack
}
  onFirstDataRendered(params) {
    this.gridApi = params;
    setTimeout(() => {
      if (this.gridApi && this.gridApi.api) {
        this.gridApi.api.sizeColumnsToFit()
      }
    }, 100)
  }
}

