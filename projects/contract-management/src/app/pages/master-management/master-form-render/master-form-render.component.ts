import { Component, OnInit, ViewChild } from '@angular/core';
import { APIService } from '../../../../../src/app/services/api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AppScreenService } from '../../../../../src/app/services/app-screen.service';
import FileSaver from 'file-saver';
import { NzNotificationService } from 'ng-zorro-antd';

@Component({
  selector: 'app-master-form-render',
  templateUrl: './master-form-render.component.html',
  styleUrls: ['./master-form-render.component.scss']
})
export class MasterFormRenderComponent implements OnInit {
  @ViewChild('myInput')
  myInputVariable: any

  selectedData: any = { components: [] }
  item: any = []
  masterData: any = { name: '' }
  appMasterId: any = null
  isUpdate: boolean = false
  updatedRecord: any = {}
  selectedFile: any = null
  isModalVisible: boolean = false
  isFileUplaodModalVisible: boolean = false
  isInstructionModal: boolean = false
  csvUploadError: any = ""
  constructor(private apiService: APIService, private route: ActivatedRoute,
    private router: Router, private appScreenService: AppScreenService,
    private notification: NzNotificationService) {
    this.route.params.subscribe(params => {
      this.appMasterId = params['id']
    })
    if (this.route.snapshot.params['id'] && !this.route.snapshot.params['masterName']) {
      this.apiService.getMaster(this.route.snapshot.params['id']).subscribe(res => {
        if (res) {
          this.masterData = res
          this.openComponentsData(res, null)
          this.isUpdate = false
        }
      })
    }
    if (this.route.snapshot.params['id'] && this.route.snapshot.params['masterName'] && this.route.snapshot.params['masterId']) {
      this.apiService.getMaster(this.route.snapshot.params['masterId']).subscribe(res => {
        if (res) {
          this.masterData = res
          this.apiService.getMasterDetailsByNameAndID(this.route.snapshot.params['masterName'], this.route.snapshot.params['id']).subscribe(resp => {
            if (resp) {
              this.isUpdate = true
              this.openComponentsData(res, resp)
              this.updatedRecord = resp
            }
          })
        }
      })
    }
  }

  ngOnInit(): void { }

  openComponentsData(data: any, obj: any): void {
    data.configuration.forEach(element => {
      if (obj) {
        element.defaultValue = obj[element.key]
      }
      this.item.push(element)
    })
    if (data.configuration.length === this.item.length) {
      this.item.push({
        'type': 'button',
        'label': this.isUpdate ? 'Update' : 'Save',
        'key': 'submit',
        'disableOnInvalid': true,
        'input': true,
        'tableView': true,
      })
    }
    const item = {
      'components': this.item
    }
    this.selectedData = item
  }


  generateFile() {
    this.appScreenService.generateTemplateFile1(this.masterData.code).subscribe(resp => {
      const blob = new Blob([resp], { type: 'text/csv' });
      FileSaver.saveAs(blob, this.masterData.code + '.csv');
      this.notification.success('Successfully', 'File Download Successfully')
    }, err => {
      this.notification.error('Download Error', 'Please try after sometime or check your internet connection')
    })
  }

  templateInstruction() {
    this.isModalVisible = true;
    this.isInstructionModal = true;
  }

  handleInstructionOk() {
    this.isModalVisible = false;
    this.isInstructionModal = false;
  }

  onFileChange = (event: any) => {
    this.selectedFile = event.target.files[0];
    this.csvUploadError = '';
  }

  uploadFile() {
    this.isModalVisible = true;
    this.isFileUplaodModalVisible = true;
    this.csvUploadError = '';
  }
  handleCancel = () => {
    this.myInputVariable.nativeElement.value = "";
    this.selectedFile = null;
    this.isModalVisible = false;
    this.isFileUplaodModalVisible = false;
    this.csvUploadError = '';
  }

  handleOk = () => {
    if (this.selectedFile != null) {
      const formData = new FormData();
      // Update the formData object
      formData.append(
        'files',
        this.selectedFile,
        this.selectedFile.name
      );
      formData.append(
        'masterName',
        this.masterData.code
      );
      formData.append(
        'masterId',
        this.appMasterId
      )
      formData.append(
        'type',
        'master'
      )
      this.appScreenService.uplaodFile(formData).subscribe(resp => {
        this.myInputVariable.nativeElement.value = "";
        this.selectedFile = null;
        this.isModalVisible = false;
        this.isFileUplaodModalVisible = false;
        this.csvUploadError = '';
        this.notification.success('Successfully', 'File uploaded Successfully');
        this.goBack();
      }, err => {
        this.notification.error('Upload Error', JSON.parse(err.error).error.message)
        this.csvUploadError = JSON.parse(err.error).error.message;
      })
    } else {
      this.csvUploadError = 'Please select file'
    }
  }

  submitForm(submission: any) {
    const data = {
      name: this.masterData.code,
      uniqueKey:this.masterData.uniqueKey,
      configuration: submission.data
    }
    if (this.isUpdate) {
      // console.log('update',data,this.updatedRecord.eimUUId)
      this.apiService.updateMasterDetails(this.updatedRecord.eimUUId, data).subscribe(resp => {
        if (resp) {
          this.goBack()
        }
      },
      (error) => {
        this.notification.error('Error', error.error.errorMessage)
      })
    } else {
      this.apiService.addMasterDetails(data).subscribe(resp => {
        if (resp) {
          this.goBack()
        }
      },
      (error) => {
        this.notification.error('Error', error.error.errorMessage)
      })
    }
  }

  goBack() {
    this.router.navigate(['/drone/masters/details', this.masterData.name ,this.masterData._id])
  }
}
