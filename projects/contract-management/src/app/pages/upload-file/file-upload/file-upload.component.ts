import { Component, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms'
import{UploadService} from '../../../../../src/app/services/upload.service'
import { ActivatedRoute, Router } from '@angular/router';
import { select, Store } from '@ngrx/store'
import { DatePipe } from '@angular/common';
import * as Reducers from '../../../../../src/app/store/reducers'
import { ColDef, GridOptions } from 'ag-grid-community';
import { NzModalService, NzNotificationService } from 'ng-zorro-antd';

let _this: any;
// mport { AppMasterService } from 'src/app/services/app-master.service'
@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss']
})
export class FileUploadComponent implements OnInit {
  uplaodForm:any
  selectedFile:any
  tabs:any
  rowData:any
  columnDefs: any = [];
  gridApi: any;
  gridOptions: any;
  selectedIndex: number = 0;
  isViewed:Boolean=false
  json:any
  isButtonEnabled:Boolean=true
  constructor(private modalService: NzModalService,
    private notification: NzNotificationService,
    private formBuilder: FormBuilder, private router: Router,
    private route: ActivatedRoute,private datePipe: DatePipe,
    private store: Store<any>,private uploadService:UploadService) {
      this.store.pipe(select(Reducers.getSettings)).subscribe(state => {
        this.onFirstDataRendered(this.gridApi);
      })
      this.gridOptions = <GridOptions>{
        pagination: true,
      };
     }
  
  ngOnInit(): void {

    this.uplaodForm = this.formBuilder.group({
     
      file: ['', Validators.required],
      
    })
  }
  onFileSelect(file:HTMLInputElement){
    if ( file.files[0].name
        .split('.')
        .pop()
        .toLowerCase() != 'xlsx')
        {
          this.notification.error('Error', "Invalid file format")
          this.uplaodForm.reset()
          this.isViewed=false
          this.isButtonEnabled=true
        }
        else{
          this.selectedFile = file.files[0]
          const formData = new FormData();
      
          formData.append('file',this.selectedFile);
          
          this.uploadService.fileUpload(formData).subscribe(res=>{
            this.isViewed=true
            this.isButtonEnabled=false
            this.json=res
            this.tabs=Object.keys(this.json)
          const report= this.json[this.tabs[0]]
          this.setColumns(report[0])
          this.rowData = this.json[this.tabs[0]];
          },err=>{
            this.notification.error('Error', err.error.errorMessage)
          })
        }
  }
  log(item){
    
    const report= this.json[item[0].tab.nzTitle]
    
    this.setColumns(report[0])
    this.onFirstDataRendered(this.gridApi);
    this.rowData = this.json[item[0].tab.nzTitle]
  }
  setColumns(columns) {
    this.columnDefs = []
    const self = this
    Object.keys(columns).forEach(function (key) {
      let definition: ColDef = {}
      if (key === '_id' || key === '__v') {
        definition = { headerName: self.camelToTitleCase(key), field: key, hide: true }
      } else {
        definition = { headerName: self.camelToTitleCase(key), field: key, minWidth: 150, resizable: true, sortable: true, filter: 'agTextColumnFilter', floatingFilter: true, cellRenderer: self.getColoumnValue }
      }
      self.columnDefs.push(definition)
    })
  }

  camelToTitleCase(str) {
    return str
      .replace(/[0-9]{2,}/g, match => ` ${match} `)
      .replace(/[^A-Z0-9][A-Z]/g, match => `${match[0]} ${match[1]}`)
      .replace(/[A-Z][A-Z][^A-Z0-9]/g, match => `${match[0]} ${match[1]}${match[2]}`)
      .replace(/[ ]{2,}/g, match => ' ')
      .replace(/\s./g, match => match.toUpperCase())
      .replace(/^./, match => match.toUpperCase())
      .trim()
  }

  getColoumnValue(params) {
    if (params.value) {
      if (typeof params.value === 'object') {
        return JSON.stringify(params.value)
      } else {
        return _this.isDate(params.value) ? _this.dateTranform(params.value) : params.value
      }
    }
  }

  dateTranform(dateStr) {
    if (dateStr) {
      return this.datePipe.transform(dateStr, 'MM/dd/yyyy')
    } else {
      return null
    }
  }

  isDate(dateStr) {
    if (isNaN(dateStr) && !isNaN(Date.parse(dateStr))) {
      return true
    } else {
      return false
    }
  }

  onFirstDataRendered(params) {
    this.gridApi = params;
    setTimeout(() => {
      if (this.gridApi && this.gridApi.api) {
        this.gridApi.api.sizeColumnsToFit()
      }
    }, 100)
  }

  submit() {
    this.modalService.confirm({
      nzTitle: 'Confirm',
      nzContent: "Are you sure you want submit. You can't undo this action",
      nzOkText: 'OK',
      nzOnOk: () =>this.confirmed(),
      nzOnCancel: () =>this.cancel(),
      nzCancelText: 'Cancel'
    });
  }
    confirmed(){
      this.uploadService.createFileData(this.json).subscribe(res =>{
      
      })
      this.isButtonEnabled=true
    }
  
    cancel(){
      this.uplaodForm.reset();
      this.isViewed=false
      this.isButtonEnabled=true
      this.json={}
    }
}
