import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { select, Store } from '@ngrx/store'
import * as Reducers from '../../../../../src/app/store/reducers'
import { dateFormats } from 'highcharts';
import { dateFormat } from 'highcharts/highcharts.src';
import { NzNotificationService } from 'ng-zorro-antd';
import { UploadService } from '../../../../../src/app/services/upload.service';
import { GridOptions } from 'ag-grid-community';

@Component({
  selector: 'app-template-upload',
  templateUrl: './template-upload.component.html',
  styleUrls: ['./template-upload.component.scss']
})
export class TemplateUploadComponent implements OnInit {

  templateForm: any
  selectedFile: any
  visible: boolean = false
  uploadData: any = [];
  gridApi: any;
  gridOptions: any;
  columnDefs = [
    { field: 'fileName', headerName: 'Template Name', sortable: true, filter: 'agTextColumnFilter', floatingFilter: true },
    // {
    //   field: 'action', headerName: 'Action', lockPinned: true, maxWidth: 100, pinned: 'right', cellRendererFramework: GridActionComponent,

    // }
  ]
  constructor(private formBuilder: FormBuilder, private uploadService: UploadService,
    private route: ActivatedRoute, private notification: NzNotificationService,
    private router: Router,
    private store: Store<any>,) {
    this.store.pipe(select(Reducers.getSettings)).subscribe(state => {
    
      this.onFirstDataRendered(this.gridApi);
    })
    this.gridOptions = <GridOptions>{
      context: {
        componentParent: this,
        tabName: 'all-template',
        // editPermission: ['application master:edit', 'admin', 'superadmin'],
        // deletePermission: ['application master:delete', 'admin', 'superadmin']
      }
    };
  }

  ngOnInit(): void {
    this.templateForm = this.formBuilder.group({
      file: ['', Validators.required],
    })
    this.allGrid();
  }
  allGrid() {
    this.uploadService.getAllTemplate().subscribe(res => {

      this.uploadData = res
    })
  }
  onFirstDataRendered(params) {
    
    this.gridApi = params;
    setTimeout(() => {
      if (this.gridApi && this.gridApi.api) {
        this.gridApi.api.sizeColumnsToFit()
      }
    }, 100)
  }

  onFileSelect(file) {
    if (
      file.files[0].name
        .split('.').pop()
        .toLowerCase() != 'xlsx'
    ) {
      this.notification.error('Error', "Invalid file format")
      this.templateForm.reset()
    } else {
      this.selectedFile = file.files[0]
      this.visible = true
    }
  }
  submit() {
    const formData = new FormData();
    let file = this.templateForm.file
    formData.append('file', this.selectedFile);
    
    this.uploadService.templateUpload(formData).subscribe((res : any)=>{
      this.allGrid()
      this.templateForm.reset()
      this.notification.success('Successfully', 'You have successfully save template!')
    },err=>{
      this.notification.error('Error', err.error.errorMessage)
    })
    // this.uploadService.templateUpload(formData).subscribe(res => {
    //   console.log('2222222222')
    //   this.allGrid()
    //   this.templateForm.reset()
    //   this.notification.success('Successfully', 'You have successfully save template!')
    // },err=>{
    //   console.log('eroor', err)
    //   this.notification.error('Error', err.error.errorMessage)
    // })
  }
}
