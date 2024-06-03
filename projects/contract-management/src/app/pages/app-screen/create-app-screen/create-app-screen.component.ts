import { Component, ElementRef, EventEmitter, OnInit } from '@angular/core'
import { Location, DatePipe } from '@angular/common';
import { FormBuilder } from '@angular/forms'
import { NzNotificationService } from 'ng-zorro-antd'
import * as _ from 'lodash'
import { AppScreenService } from '../../../../../src/app/services/app-screen.service'
import FileSaver from 'file-saver';
import { ViewChild } from '@angular/core';
import { select, Store } from '@ngrx/store'
import { ActivatedRoute, Router } from '@angular/router'
import { ScreenService } from '../../../../../src/app/services/screen.service';
import { APIService } from '../../../../../src/app/services/api.service';
import { ColDef, GridOptions } from 'ag-grid-community';
import { UploadService } from '../../../../../src/app/services/upload.service'
import * as Reducers from '../../../../../src/app/store/reducers'
import * as moment from 'moment'
import { Validators } from '@angular/forms'
import { TriggerJobService } from '../../../../../src/app/services/trigger-job.service'
let _thi: any

@Component({
  selector: 'app-create-app-screen',
  templateUrl: './create-app-screen.component.html',
  styleUrls: ['./create-app-screen.component.scss'],
})

export class CreateAppScreenComponent implements OnInit {
  @ViewChild('myInput')
  myInputVariable: any
  columnDefs: ColDef[]
  schemaRes: any = []
  triggerDate: any = []
  triggerForm: any;
  paymentDate: any = []
  triggerSchedule: boolean = false
  paymentSchedule: boolean = false
  rowData: any = []
  csvUploadError: any = ""
  csvUploadError1: any = ""
  formatType: any = ""
  // csvUploadedModalFlag: any
  appScreenForm: any
  appScreenId: any = null
  appScreenCode: any = null
  appEditId: any = null
  appScreenName: string
  appScreenData: any
  selectedTypeValue: any
  isShow: boolean = false
  selectedFile: any = null
  isModalVisible: boolean = false
  isFileUplaodModalVisible: boolean = false
  isInstructionModal: boolean = false
  isTriggerVisible: boolean = false
  public form: any = { components: [] }
  public tempForm: any = { components: [] }
  gridApi: any;
  gridApi1: any;
  gridOptions: any;
  isVisible: boolean = false;
  screenSchemaConfig: any = [];
  screenCode: any = null;
  schemaConfig: any = [];
  trigger: any
  /*   filter_keys: any = []; */
  allChecked: boolean = false;
  screenConfig: any = [];
  configData: any = {}
  subForm: any;
  apiresData: any = []
  tblData: any = []
  screenResponse: any;
  listOfData: any;
  isClaimsSearch: boolean;
  isContact: boolean = false;
  contactForm: any
  isHideButton: boolean = false
  columnDefss = [
    { field: 'label', headerName: 'Field Label', sortable: true, filter: true, resizable: true },
    { field: 'key', headerName: 'Field Value', sortable: true, filter: true, resizable: true },
    { field: 'type', headerName: 'Field Type', sortable: true, filter: true, resizable: true },
    { field: 'format', headerName: 'Format', sortable: true, filter: true, resizable: true }
  ];
  refreshForm: any;

  constructor(
    private router: Router,
    private apiService: APIService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private appScreenService: AppScreenService,
    private notification: NzNotificationService,
    private screenService: ScreenService,
    private uploadService: UploadService,
    private location: Location,
    private datePipe: DatePipe,
    private store: Store<any>,
    private elementRef: ElementRef,
    private triggerJobService: TriggerJobService
  ) {
    _thi = this
    this.route.params.subscribe(params => {
      this.appScreenId = params['id']
      this.appScreenName = params['screenname']
      this.appScreenCode = params['code']
      this.appEditId = params['editId']
      this.form.components = []
      this.isShow = false
      this.listOfData = null
      if (this.appScreenId === "6053073f21ed7a40a1a3edcf") {
        this.isContact = true;
        this.contactForm = this.formBuilder.group({
          name: ['', Validators.required],
          email: ['', Validators.required],
          subject: [, Validators.required],
          message: ['',]
        })
      }
      else {
        this.isContact = false;
      }
      setTimeout(() => {
        this.getDataById();
      }, 100);
      this.rowData = [];
      const self = this
      this.gridOptions = <GridOptions>{
        pagination: false,
        onColumnMoved: function (params) {
          const disCols = []
          const allGridColumns = _.cloneDeep(params.columnApi.getAllGridColumns());
          _.each(allGridColumns, (col) => {
            disCols.push(col.colId);
          })

          const mainData = JSON.parse(localStorage.getItem('previousGridSchema'))
          let previousGridSchema: any = mainData ? mainData : [];
          _.remove(previousGridSchema, (n) => { return n.appScreenName === self.appScreenName; });
          const data = {
            appScreenName: self.appScreenName,
            disCols: disCols
          }
          previousGridSchema.push(data);
          localStorage.setItem('previousGridSchema', JSON.stringify(previousGridSchema));
        },
        context: {
          componentParent: this,
          tabName: 'app-screen',
          editPermission: [this.appScreenName + ':edit'],
          deletePermission: [this.appScreenName + ':delete']
        }
      };
    })
    this.store.pipe(select(Reducers.getSettings)).subscribe(state => {
      this.onFirstDataRendered(this.gridApi);
      this.onFirstDataRendered1(this.gridApi1);
    })
  }

  ngOnInit(): void {
    this.refreshForm = new EventEmitter();
    this.triggerForm = this.formBuilder.group({
      startdate: [''],
      enddate: [''],
      paymentSchedule: ['']
    })
  }

  changeForm() { }

  onChangeFOrm(e) {
    if (e && e.changed && e.changed.value && e.changed.component.dataSrc === "screen") {
      let cureentData = _.cloneDeep(e.data);
      const data = _.filter(e.changed.instance.defaultDownloadedResources, (o) => {
        return e.changed.value === o[e.changed.component.valueProperty];
      });
      if (data && data.length === 1) {
        const oldData = _.cloneDeep(data[0]);
        const oldDataKeys = _.keys(oldData)
        _.each(cureentData, (data, key) => {
          if (_.includes(oldDataKeys, key) && key !== e.changed.component.key) {
            cureentData[key] = oldData[key];
          }
        });
        this.refreshForm.emit({
          form: this.form,
          submission: {
            data: cureentData
          }
        });
      }
    }
  }

  getDataById() {
    if (this.appScreenId) {
      this.screenService.getDataById(this.appScreenId).subscribe(res => {
        this.screenResponse = res;
        this.isHideButton = false
        if (res.application_master === '6050605b1ad41034c109b1bf') {
          this.isHideButton = true
        }
        if (res) {
          if (this.appScreenCode && this.appEditId) {
            this.appScreenService.getDataById(this.appScreenCode, this.appEditId).subscribe(resp => {
              this.form.components.push(res.configuration[0])
              _.each(this.form.components[0].columns, (component) => {
                if (component.components && component.components.length > 0 && component.components[0].key) {
                  component.components[0].defaultValue = resp[component.components[0].key]
                }
              })

              this.apiresData = res.configuration[0].columns;
              if (this.apiresData && this.apiresData.length > 0) {
                for (var i = 0; i < this.apiresData.length; i++) {
                  this.tblData.push(this.apiresData[i].components[0]);
                }
              }
              this.form.components.push({
                'type': 'button',
                'label': 'Update',
                'key': 'submit',
                'disableOnInvalid': true,
                'input': true,
                'tableView': true,
              }, {
                'type': 'button',
                'action': 'event',
                'label': 'Cancel',
                'disableOnInvalid': true,
                'input': true,
                'tableView': true,
                'customClass': 'test'
              })
              this.isShow = true
              this.appScreenData = res
            })
          } else {
            this.apiService.getSchemaByCode(res.code).subscribe((schemaRes: any) => {
              this.schemaRes = schemaRes
              const previousGridSchema = JSON.parse(localStorage.getItem('previousGridSchema'));
              const avaiable = _.find(previousGridSchema, (o) => {
                return o.appScreenName === this.appScreenName;
              });
              if (avaiable) {
                this.setPreviousColumns(avaiable.disCols);
              } else {
                this.setColumns(schemaRes);
              }
              this.screenSchemaConfig = Object.keys(schemaRes.schema_config);
              _.each(this.screenSchemaConfig, (config) => {
                this.configData[config] = ''
              })
              this.apiresData = schemaRes.form_config[0].columns;
              this.tblData = [];
              if (this.apiresData && this.apiresData.length > 0) {
                for (var i = 0; i < this.apiresData.length; i++) {
                  if (this.apiresData[i].components[0].type === 'select') {
                    var data1 = [];
                    this.apiresData[i].components[0].data.values.map((data, i) => {
                      data1.push(data.value);
                    })
                    this.apiresData[i].components[0].format = data1.toString();
                  }
                  else if (this.apiresData[i].components[0].type === 'number') {
                    this.apiresData[i].components[0].format = 1234
                  }
                  this.tblData.push(this.apiresData[i].components[0]);
                }
              }
            });


            this.form = _.cloneDeep({ components: [] });
            this.tempForm = _.cloneDeep({ components: [] });
            _.each(res.configuration, (component) => {
              this.form.components.push(component)
              this.tempForm.components.push(component)
            })
            this.form.components.push({
              'type': 'button',
              'label': this.screenResponse.type !== 'search' ? 'Submit' : 'Search',
              'key': 'submit',
              'disableOnInvalid': true,
              'input': true,
              'tableView': false
            })
            this.subForm = _.cloneDeep(this.form);
            this.appScreenData = res
            this.isShow = true
          }
        }
      })

    }

  }
  showModal(): void {
    this.isVisible = true;
  }
  showTrigger() {
    this.isTriggerVisible = true;
    this.triggerDate = []
    this.paymentDate = []
    _.each(this.schemaRes.form_config[0].columns, (element) => {
      _.each(element.components, (key) => {
        if (key.type === "datetime") {
          this.triggerDate.push(key.key)
        }
        if (key.components) {
          _.each(key.components, (ele) => {
            if (ele.type === "datetime") {
              let fullname = key.key + "." + ele.key
              this.paymentDate.push(fullname)
            }
          })
        }
      })
    })


  }
  handleTriggerSave() {
    if (this.trigger === 'triggerSchedule') {
      this.isTriggerVisible = false;
      this.paymentSchedule = false
    } else {
      this.isTriggerVisible = false;
      this.triggerSchedule = false
    }
  }
  isradio(val) {
    if (val === "triggerSchedule") {
      this.triggerSchedule = true
      this.paymentSchedule = false
    }
    if (val === "paymentSchedule") {
      this.paymentSchedule = true
      this.triggerSchedule = false
    }


  }
  addTypeInEditor(type) {
    if (type === "By columns") {
      this.formatType = 'By columns'
    } else if (type === "As Multiple Rows") {
      this.formatType = 'As Multiple Rows'
    } else if (type === "By Rows-Columns") {
      this.formatType = 'By Rows-Columns'
    }
  }
  handleCancelTrigger() {
    this.isTriggerVisible = false;
    this.trigger = ''
    this.triggerSchedule = false
    this.paymentSchedule = false
  }
  handleCancelModal(): void {
    const _this = this
    _.each(this.schemaConfig, (config) => {
      const data = _.find(this.form.components[0].columns, (o) => {
        return o.components[0].key === config;
      });
      if (data) {
        document.getElementById(data.components[0].id + '-' + data.components[0].key).onchange = function (event) {
          setTimeout(() => {
            var inputValue = (<HTMLInputElement>document.getElementById(data.components[0].id + '-' + data.components[0].key)).value;
            _this.configData[data.components[0].key] = inputValue
            const filter_data = {
              data: {
                model_name: _this.appScreenData.code,
                screen_data: _this.configData,
                _id: _this.appScreenData._id,
                __v: _this.appScreenData.__v,
                filter_keys: _this.schemaConfig
              },
            }
            _this.filterData(filter_data);
          }, 100)
        };
      }
    })
    this.allChecked = false
    /*  this.filter_keys = [] */
    this.isVisible = false;
  }

  filterData(filter_data) {
    this.apiService.addFilters(filter_data).subscribe(async resp => {
      if (resp) {
        /* await this.setColumns(resp) */
        const tempRowData = [];
        resp.forEach(function (arrayItem) {
          tempRowData.push(arrayItem);
        });
        this.rowData = [];
        await setTimeout(() => {
          this.rowData = tempRowData;
        }, 1000);
      }
    })
  }

  selectFilter(e, value) {
    if (e.target.checked) {
      this.schemaConfig.push(value);
    }
    else {
      var index = this.schemaConfig.indexOf(value);
      if (index !== -1) {
        this.schemaConfig.splice(index, 1);
      }
    }
  }

  setColumns(column) {
    this.columnDefs = []
    const self = this
    const columns = column.schema_config
    Object.keys(columns).forEach(function (key, index) {
      if (key !== 'status') {
        let definition: ColDef = {}
        if (key === '_id' || key === '__v') {
          definition = { headerName: self.camelToTitleCase(key), field: key, hide: true }
        } else {
          if (columns[key].type === 'Date') {
            _.each(column.form_config[0].columns, (element) => {
              if (element.components[0].key === key) {
                definition = { headerName: self.camelToTitleCase(key), field: key, minWidth: 150, resizable: true, sortable: true, filter: 'agTextColumnFilter', filterParams: element.components[0].format, floatingFilter: true, cellRenderer: (data) => { return _thi.datePipe.transform(data.value, element.components[0].format.split(' ')[0]) } }
              }
            });
          }
          else {
            definition = { headerName: self.camelToTitleCase(key), field: key, minWidth: 150, resizable: true, sortable: true, filter: 'agTextColumnFilter', floatingFilter: true, cellRenderer: self.getColoumnValue }
          }
        }
        self.columnDefs.push(definition)
      }
    })
  }

  setPreviousColumns(data) {
    this.columnDefs = []
    const self = this
    _.each(data, (col) => {
      let definition: ColDef = {};
      definition = { headerName: self.camelToTitleCase(col), field: col, minWidth: 150, resizable: true, sortable: true, filter: 'agTextColumnFilter', floatingFilter: true, cellRenderer: self.getColoumnValue }
      self.columnDefs.push(definition)
    });
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


  getColoumnValue = (params) => {
    if (params.value) {
      if (typeof params.value === 'object') {
        return JSON.stringify(params.value)
      } else {
        return this.isDate(params.value) ? this.dateTranform(params.value) : params.value
      }
    }
  }

  isDate(dateStr) {
    if (isNaN(dateStr) && !isNaN(Date.parse(dateStr))) {
      return true
    } else {
      return false
    }
  }
  dateTranform(dateStr) {
    if (dateStr) {
      return this.datePipe.transform(dateStr, 'MM/dd/yyyy')
    } else {
      return null
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

  onFirstDataRendered1(params) {
    this.gridApi1 = params;
    setTimeout(() => {
      if (this.gridApi1 && this.gridApi1.api) {
        this.gridApi1.api.sizeColumnsToFit()
      }
    }, 100)
  }

  submitForm = (submission: any) => {

    if (this.screenResponse && this.screenResponse.type !== 'search') {
      const data = {
        name: this.appScreenData.code,
        configuration: submission.data
      }
      if (this.appScreenCode && this.appEditId) {
        this.apiService.updateMasterDetails(this.appEditId, data).subscribe(resp => {
          if (resp) {
            this.cancelEdit()
          }
        })
      } else {
        this.apiService.checkCollectionExists(this.appScreenData.code).subscribe(resp => {
          if (resp) {
            this.apiService.addMasterDetails(data).subscribe(async resp => {
              if (this.trigger) {
                const jobData = {}
                if (this.trigger === 'triggerSchedule') {
                  jobData['startDate'] = [data.configuration[this.triggerForm.value.startdate]],
                    jobData['endDate'] = data.configuration[this.triggerForm.value.enddate]
                  jobData['frequencyPaySchedule'] = this.triggerForm.value.paymentSchedule
                  jobData['type'] = 'frequency',
                    jobData['config'] = this.triggerForm.value
                } else {
                  jobData['type'] = 'fixed'
                  jobData['config'] = this.selectedTypeValue
                  let removeEqual = this.selectedTypeValue.split(".")
                  let fixedPaySchedule = []
                  _.each(data.configuration[removeEqual[0]], (element) => {
                    fixedPaySchedule.push(element[removeEqual[1]])
                  })
                  jobData['fixedPaySchedule'] = fixedPaySchedule
                }
                jobData['screen'] = this.appScreenData.code
                jobData['dataId'] = resp._id
                this.triggerJobService.saveScreenJob(jobData).subscribe(jobres => {
                  this.triggerForm.reset()
                  this.selectedTypeValue=null
                  this.trigger = ''
                  this.triggerSchedule = false
                  this.paymentSchedule = false
                  const filter_data = {
                    data: {
                      model_name: this.appScreenData.code,
                      screen_data: this.configData,
                      _id: this.appScreenData._id,
                      __v: this.appScreenData.__v,
                      filter_keys: this.schemaConfig
                    },
                  }
                  this.filterData(filter_data);
                  setTimeout(() => {
                    this.form = _.cloneDeep(this.subForm)
                  }, 700);

                  this.notification.success('sucessfull', 'data sucessfully save');

                })
              } else {
                const filter_data = {
                  data: {
                    model_name: this.appScreenData.code,
                    screen_data: this.configData,
                    _id: this.appScreenData._id,
                    __v: this.appScreenData.__v,
                    filter_keys: this.schemaConfig
                  },
                }
                this.filterData(filter_data);
                setTimeout(() => {
                  this.form = _.cloneDeep(this.subForm)
                }, 700);

                this.notification.success('sucessfull', 'data sucessfully save');

              }
            })

          } else {
            const formData = [];
            _.each(this.tempForm.components[0].columns, (column) => {
              if (column && column.components.length >= 1 && column.components[0]) {
                formData.push(column.components[0]);
              }
            })

            const obj = {
              modelName: this.appScreenData.code,
              formConfig: formData,
              uniqueKey: this.appScreenData.uniqueKey
            }
            this.apiService.registerSchema(obj).subscribe(response => {
              if (response) {
                this.apiService.addMasterDetails(data).subscribe(resp => {
                  if (resp) {
                    this.cancelEdit()
                  }
                })
              }
            })
          }
        })
      }
    } else {
      if (this.appScreenName === 'Search Claim') {
        this.isClaimsSearch = true;
        if (submission.data.value !== '' && submission.data.searchCategory !== '') {
          let data
          if (submission.data.dob) {
            data = {
              [submission.data.searchCategory]: submission.data.value,
              dob: moment(submission.data.dob).format('YYYY-MM-DD')
            }
          } else {
            data = {
              [submission.data.searchCategory]: submission.data.value
            }
          }

          this.appScreenService.getSerachDataByCliam(data).subscribe(resp => {
            if (resp && resp.length > 0) {
              this.listOfData = {
                claims: []
              }
              _.each(resp, (element) => {
                this.listOfData.claims.push(element);
              })

              this.listOfData.title = submission.data.searchCategory;
              this.listOfData.titleValue = submission.data.value
            } else {
              this.listOfData = null
              this.notification.error('Not Found', 'Record Not found');
            }
          })
        }
      } else {
        this.isClaimsSearch = false;
        if (submission.data.value !== '' && submission.data.searchCategory === 'Policy No') {
          const data = {
            policyNo: submission.data.value,
          }
          this.appScreenService.getSerachDataByPolicy(data).subscribe(resp => {
            if (resp && resp.length > 0) {
              this.listOfData = resp[0];
              this.listOfData.title = 'POLICY NUMBER';
              this.listOfData.titleValue = submission.data.value
            } else {
              this.listOfData = null
              this.notification.error('Not Found', 'Record Not found');
            }
          })
        } else {
          if (submission.data.value !== '' && submission.data.searchCategory === 'Policy Id') {
            const data = {
              rsaId: submission.data.value,
            }
            this.appScreenService.getSerachDataByPolicy(data).subscribe(resp => {
              if (resp) {
                this.listOfData = resp[0];
                this.listOfData.title = 'POLICY ID';
                this.listOfData.titleValue = submission.data.value
              } else {
                this.listOfData = null
                this.notification.error('Not Found', 'Record Not found');
              }
            })
          }
        }
      }
    }
  }

  templateInstruction() {
    this.isModalVisible = true;
    this.isInstructionModal = true;
  }

  handleInstructionOk() {
    this.isModalVisible = false;
    this.isInstructionModal = false;
  }


  generateFile = () => {
    this.appScreenService.generateTemplateFile('screen', this.appScreenData.code, this.appScreenId).subscribe(resp => {
      const blob = new Blob([resp], { type: 'text/csv' });
      FileSaver.saveAs(blob, this.appScreenData.code + '.csv');
      this.notification.success('Successfully', 'File Download Successfully')
    }, err => {
      this.notification.error('Download Error', 'Please try after sometime or check your internet connection')
    })
  }

  generateCSVFile = () => {
    this.gridOptions.api.exportDataAsCsv();
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
        'screenName',
        this.appScreenData.code
      );
      formData.append(
        'screenId',
        this.appScreenId
      )
      formData.append(
        'type',
        'screen'
      )
      // this.appScreenService.uplaodFile(formData).subscribe(resp => {
      this.appScreenService.uplaodFile(formData).subscribe(resp => {
        this.myInputVariable.nativeElement.value = "";
        this.selectedFile = null;
        this.isModalVisible = false;
        this.isFileUplaodModalVisible = false;
        // this.csvUploadedModalFlag = true
        this.csvUploadError = '';
        this.notification.success('Successfully', 'File uploaded Successfully' + JSON.parse(resp).reportData.successCount +
          ' Success and ' + JSON.parse(resp).reportData.failureCount + ' Failure ');
        // this.csvUploadError = 'File uploaded Successfully with '
        //   + JSON.parse(resp).reportData.successCount +
        //   ' Success and ' + JSON.parse(resp).reportData.failureCount + ' Failure ' +
        //   JSON.stringify(JSON.parse(resp).reportData.failureRecords);
        const blob = new Blob(['File uploaded Successfully with '
          + JSON.parse(resp).reportData.successCount +
          ' Success and ' + JSON.parse(resp).reportData.failureCount + ' Failure ' +
          JSON.stringify(JSON.parse(resp).reportData.failureRecords)], { type: 'text/txt' });
        FileSaver.saveAs(blob, this.appScreenData.code + 'Report' + '.txt');
        // this.cancelEdit();
      }, err => {
        this.notification.error('Upload Error', JSON.parse(err.error).error.message)
        this.csvUploadError = JSON.parse(err.error).error.message;
      })
    } else {
      this.csvUploadError = 'Please select file'
    }
  }


  handleOk2 = () => {
    if (this.selectedFile != null && this.selectedTypeValue != null) {

      this.csvUploadError = ""
      this.csvUploadError1 = ""
      var formData = new FormData();
      if (this.selectedTypeValue == 'By columns') {
        formData.append(
          'files',
          this.selectedFile,
          this.selectedFile.name
        );
        formData.append(
          'type',
          'CC'
        )
        formData.append(
          'screenName',
          this.appScreenData.code
        );
        formData.append(
          'screenId',
          this.appScreenId
        )
        formData.append(
          'key',
          'screen'
        )
      } else if (this.selectedTypeValue = 'As Multiple Rows') {
        formData.append(
          'files',
          this.selectedFile,
          this.selectedFile.name
        );
        formData.append(
          'type',
          'RR'
        )
        formData.append(
          'screenName',
          this.appScreenData.code
        );
        formData.append(
          'screenId',
          this.appScreenId
        )
        formData.append(
          'key',
          'screen'
        )
      } else if (this.selectedTypeValue == 'By Rows-Columns') {

        formData.append(
          'files',
          this.selectedFile,
          this.selectedFile.name
        );
        formData.append(
          'type',
          'RC'
        )
        formData.append(
          'screenName',
          this.appScreenData.code
        );
        formData.append(
          'screenId',
          this.appScreenId
        )
        formData.append(
          'key',
          'screen'
        )
      }

      this.uploadService.uploaddata(formData).subscribe(resp => {
        if (resp.Data) {
          this.notification.success('Successfully', 'File uploaded Successfully ' + resp.Data.successCount +
            ' Success, ' + resp.Data.failureCount + ' Failure and ' + resp.Data.ignoreCount + ' Ignore');
        } else if (resp.status == 500) {
          this.notification.error('Upload Error', 'File Failed to upload')
        }
        const blob = new Blob(['File uploaded Successfully with '
          + resp.Data.successCount +
          ' Success and ' + resp.Data.failureCount + ' Failure ' +
          JSON.stringify(resp.Data.failureRecords)], { type: 'text/txt' });
        if (this.appScreenData.code != 'S_ADD POLICY_Lv5NOS' && this.appScreenData.code != 'S_CLAIM_9uFT3y') {
          FileSaver.saveAs(blob, this.appScreenData.code + 'Report' + '.txt');
        }

        this.isFileUplaodModalVisible = false;
        this.isModalVisible = false;
      }, err => {
        this.notification.error('Upload Error', err.error.error.message)
        this.csvUploadError = err.error.error.message;
      })
    } else {
      this.csvUploadError = 'Please select file'
    }
  }

  trimpValue(value) {
    let string = value.replace(/([a-z])([A-Z])/g, '$1 $2');
    string = string.replace(/([A-Z])([A-Z][a-z])/g, '$1 $2')
    return _.upperFirst(string);
  }

  cancelEdit() {
    this.router.navigate(['/appscreen/all/' + this.appScreenName + '/' + this.appScreenId])
  }

  getDate(date) {
    return moment(date).format('YYYY-MM-DD')
  }
  onSubmit() {
    this.contactForm.reset()
  }
}
