import { Component, OnInit, AfterViewInit } from '@angular/core';
import { NzNotificationService } from 'ng-zorro-antd'
import { ColDef, GridOptions } from 'ag-grid-community';
import * as Reducers from '../../../../../src/app/store/reducers'
import { select, Store } from '@ngrx/store'
import { Location, DatePipe } from '@angular/common';
import { ScreenService } from '../../../../../src/app/services/screen.service'
import { APIService } from '../../../../../src/app/services/api.service';
import { MenuService } from '../../../../../src/app/services/menu'
import { GridActionComponent } from '../../../../../src/app/constants/grid-action/grid-action.component'
import * as _ from 'lodash'
declare var $: any;

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})
export class ProjectComponent implements OnInit, AfterViewInit {
  screenData: any = [];
  selectedIndex: Number = 0;
  subSelectedIndex: Number = 0;
  rowData: any = [];
  screens: any;
  dropFileData: any;
  dropedFileData: any;
  undropedFileData: any;
  dataSet: any = [];
  tempDataSet: any = [];
  radioValue: any;
  radioValue1: any;
  gridApi: any;
  /* isVisible: boolean = false; */
  isShowEditor: boolean = false;
  editorOptions = { theme: 'vs-dark', language: 'typescript' };
  editorValue: any = { name: '', map: '', rule: '', query: [], defultValue: '' };
  value1: string = ''
  value2: string = '';
  filterData: any;
  schema_config: any;
  fileName: string;
  dataSetSearch: string;
  fileSearch: string;
  tempUndropedFileData: any;
  ruleTransform: any;
  monocoValue: any;
  subDefultValue: any;
  columnDefs = [
    { field: 'name', headerName: 'Parameters', sortable: true, filter: 'agTextColumnFilter', floatingFilter: true },
    { field: 'map', headerName: 'Map', sortable: true, filter: 'agTextColumnFilter', floatingFilter: true },
    {
      field: 'updatedAt', headerName: 'Action', maxWidth: 160,
      cellRenderer: (params) => {
        const eDiv = document.createElement('div')
        eDiv.className = "text-center";
        const eSpan = document.createElement('span')
        eSpan.innerHTML = '<button type="button" class="btn btn-outline-secondary set-trasform">Set Transform</button>'
        eSpan.addEventListener('click', (e) => {
          if (params.data) {

          }
        });
        eDiv.appendChild(eSpan);
        return eDiv
      }
    },

  ]
  gridOptions: GridOptions;
  /*  public records: any[] = [];
   editorOptions = { theme: 'vs-dark', language: 'typescript' };
   value: string = ' '
   value1: string = ' '
   value2: string = ' ';
   val: any
   
   schema_config: any;
   dataset: any = []
   parameter: any = []
   tabs: any = ['Rule', 'Configuration']
   gridApi: any;
   rowData: any = []
   isShow: Boolean = false
   monacodata: any = {}
   fileData: any = []
   defultValues: any = [];
   screens: null
   radioValue: any
   searchText: any
   searchParameters: any
   parameterNumber: Number = 0
   fileNumber: Number = 0
   
   radioValue1: any
   isShowFilter: boolean = false
   isShowDrop: boolean = false
   isShowQueryBuilder: boolean = false
   dropFileData: any;
   defultValue: any = '';
   columnDefs = [
     { field: 'name', headerName: 'Parameter name', sortable: true, filter: 'agTextColumnFilter', floatingFilter: true },
   ]
   gridOptions: any;
   rules_basic = {
     condition: 'AND',
     rules: [
       {
         id: 'date',
         operator: 'equal',
         value: '1991/11/17'
       },
       {
         id: 'name',
         operator: 'equal',
         value: 'test'
       },
     ]
   };
   csvContent: string; */
  constructor(private datePipe: DatePipe,
    private screenService: ScreenService,
    private store: Store<any>,
    private apiService: APIService,
    private notification: NzNotificationService,
  ) {
    this.gridOptions = <GridOptions>{
      pagination: true,
      rowHeight: 33,
    };
  }

  ngOnInit(): void {
    this.screenService.getAllScreenData().subscribe(res => {
      this.screenData = res
    });
  }

  ngAfterViewInit(): void {
    //   this.getQueryBuilder()
    // $('#builder').on('afterUpdateRuleValue.queryBuilder', function(e, rule) {
    //   if (rule.filter.plugin === 'datepicker') {
    //     rule.$el.find('.rule-value-container input').datepicker('update');
    //   }
    // });

  }

  /* getQueryBuilder() {
    $('#builder').queryBuilder({
      // plugins: ['bt-tooltip-errors'],
      filters: [{
        id: 'name',
        label: 'Name',
        type: 'string'
      },
      {
        id: 'date',
        label: 'Datepicker',
        type: 'date',
        validation: {
          format: 'YYYY/MM/DD'
        },
        plugin: 'datepicker',
        plugin_config: {
          format: 'yyyy/mm/dd',
          todayBtn: 'linked',
          todayHighlight: true,
          autoclose: true
        }
      },],

      rules: this.rules_basic
    });
  }

  onFirstDataRendered(params) {
    this.gridApi = params;
    setTimeout(() => {
      if (this.gridApi && this.gridApi.api) {
        this.gridApi.api.sizeColumnsToFit()
      }
    }, 100)
  }

  onFileSelect(input: HTMLInputElement) {
    const files = input.files;
    var content = this.csvContent;

    if (files && files.length) {
      const fileToRead = files[0];
      const fileReader = new FileReader();
      fileReader.readAsText(fileToRead, "UTF-8");
      fileReader.onload = () => {
        let csvData = fileReader.result;
        let csvRecordsArray = (<string>csvData).split(/\r\n|\n/);

        this.records = this.getHeaderArray(csvRecordsArray);

        //this.records = this.getDataRecordsArrayFromCSVFile(csvRecordsArray, headersRow.length);  
      };
    }
  }

  selectScreens(item) {
    this.apiService.getSchemaByCode(item.code).subscribe((res: any) => {
      this.dataset = []
      const schema = res.schema_config
      monaco.editor.getModels().forEach(model => {
        if (model['_associatedResource'].path === "filename/facts.d.ts") { model.dispose() }
      })
      let libs = {}
      if (!_.isEmpty(monaco.languages.typescript.javascriptDefaults.getExtraLibs())) {
        //console.log("hiiiiiiiii",monaco.languages.typescript.javascriptDefaults.getExtraLibs())
      }
      this.schema_config = _.cloneDeep(res.schema_config)
      var valu = this.schema_config
      var libSource = [
        'declare class Spark {',
        '    static current_date():string',
        '    static date_sub(current_date,arg:number):string',
        '    static date_add(current_date,arg:number):string',
        '    static add_months(current_date,arg:number):string',
        '    static year(arg:any):string',
        '    static quarter(arg:any):string',
        '    static month(arg:any):string',
        '    static dayofweek(arg:any):string',
        '    static dayofmonth(arg:any):string',
        '    static dayofyear(arg:any):string',
        '    static weekofyear(arg:any):string',
        '    static last_day(arg:any):string',
        '    static datediff(current_date,arg:any):string',
        '    static months_between(current_date,arg:any,True):string',
        '    static next_day(current_date,day:string):string',
        '    static trunc(current_date,year:string):string',
        '    static date_trunc(month:string,current_date):string',
        '    static date_sub(arg:any,arg:number):string',
        '    static hour(arg:any):string',
        '    static minute(arg:any):string',
        '    static second(arg:any):string',
        '    static to_timestamp(arg:any):string',
        '    static initcap(arg:any):string',
        '    static upper(arg:any):string',
        '    static lower(arg:any):string',
        '    static trim(arg:any):string',
        '    static lpad(arg:any,arg:number,arg:string):string',
        '    static regexp_replace(arg:any,arg:any,arg:any):string',
        '    static instr(arg:any,arg:any:string):string',
        '    static translate(arg:any,arg:string,arg:string):string',
        '}',
        'var dataset =' + JSON.stringify(valu)
      ].join('\n');
      var libUri = 'ts:filename/facts.d.ts';
      monaco.editor.createModel(libSource, 'typescript', monaco.Uri.parse(libUri));
      monaco.languages.typescript.typescriptDefaults.setExtraLibs([{
        content: libSource,
        filePath: libUri
      }]);
      let type: any
      let filter = []
      const key = Object.keys(res.schema_config)
      _.each(key, (element) => {
        const data = { name: element, map: "", rule: '', query: [] }
        this.dataset.push(data)
      })
      this.parameterNumber = this.dataset.length
      this.parameter = this.dataset
    })
  }

  mapDataset(item) {
    this.defultValue = '';
  }

  mapping(item) {
    _.each(this.dataset, (element) => {
      if (element === this.radioValue) {
        element.map = item
      }
    })
    this.radioValue.map = item
  }

  getHeaderArray(csvRecordsArr: any) {
    this.selectedIndex = 0
    let headers = (<string>csvRecordsArr[0]).split(',');
    let headerArray = [];
    for (let j = 0; j < headers.length; j++) {
      let obj = {}
      obj['name'] = headers[j]
      this.monacodata[headers[j]] = obj
      headerArray.push(obj);

      //headerArray.push(headers[j]);  
    }
    this.rowData = headerArray
    this.fileNumber = this.rowData.length
    this.fileData = this.rowData
    var valu = this.monacodata
    var libSources = [
      ' var file = ' + JSON.stringify(valu),

    ].join('\n');
    var libUri = 'ts:file/facts.d.ts';
    monaco.languages.typescript.javascriptDefaults.addExtraLib(libSources, libUri);
    monaco.editor.createModel(libSources, 'typescript', monaco.Uri.parse(libUri));
    return headerArray;
  }
  setTransform(item) {
    //this.flag=true
    // const rule=JSON.stringify(item.rule)
    setTimeout(() => {
      _.forEach(this.defultValues, (value) => {
        const key = Object.keys(value)
        if (key[0] === item.name) {
          this.defultValue = value[item.name];
        }
      });
    }, 700)

    this.val = item
    this.value = item.rule
    this.isShow = true
    this.selectedIndex = 0
  }
  saveRule(item) {
    const rule = $('#builder').queryBuilder('getRules')
    const editorT = this.value1
    const editorF = this.value2
    const data = {
      rule: rule,
      trueVal: editorT,
      falseVal: editorF,
    }
    item.query.push(data)
    this.value1 = ''
    this.value2 = ''
    $('#builder').queryBuilder('reset')
  }
  onchange(editor, value) {
    // let line = editor.getPosition();
    _.each(this.dataset, (element) => {
      if (element === value) {
        element.rule = editor
      }
    })
  }
  removeItem(index) {
    this.dataset[index].map = ""
  }

  searchFile() {
    this.rowData = this.fileData
    if (!this.rowData) return [];
    if (!this.searchText) return this.rowData;
    this.rowData = this.rowData.filter(item => {
      return Object.keys(item).some(key => {
        return String(item[key]).toLowerCase().includes(this.searchText.toLowerCase());
      });
    });
  }

  searchParameter() {
    this.dataset = this.parameter
    if (!this.dataset) return [];
    if (!this.searchParameters) return this.dataset;
    this.dataset = this.dataset.filter(item => {
      return String(item['name']).toLowerCase().includes(this.searchParameters.toLowerCase());
    });
  }

  log(event, item) {
    if (event[0].tab.nzTitle === 'Query builder') {
      this.selectedIndex = 1
      let type: any
      let filter = []
      let rule_basic = {}
      this.isShow = false
      this.isShowQueryBuilder = true
      if (this.dataset.length > 0) {
        if (item.query.length > 0) {
          rule_basic = item.query[0].rule
          this.value1 = item.query[0].trueVal
          this.value2 = item.query[0].falseVal
        } else {
          this.value1 = ' '
          this.value2 = ' '
        }
        $('#builder').queryBuilder('destroy');
        _.each(this.dataset, (element) => {
          filter.push({
            id: element.name,
            label: element.name,
            type: 'string'
          })
        })
        $('#builder').on('afterUpdateRuleValue.queryBuilder', function (e, rule) {
          if (rule.filter.plugin === 'datepicker') {
            rule.$el.find('.rule-value-container input').datepicker('update');
          }
        });
        $('#builder').queryBuilder({
          plugins: [

          ],
          filters: filter,
          //rules:rule_basic
        })
        if (item.query.length > 0) {
          $('#builder').queryBuilder('setRules', rule_basic)
        }

      } else {
        this.notification.info('Info', 'Add File')
      }
    }

    if (event[0].tab.nzTitle === 'Editor') {
      this.isShow = true
    }
    if (event[0].tab.nzTitle === 'Configuration') {
      _.forEach(this.defultValues, (value) => {
        const key = Object.keys(value)
        if (key[0] === this.val.name) {
          this.defultValue = value[this.val.name];
          console.log('11111111111', value);
          console.log('2222222222', this.val.name);
          console.log('33333333',  value[this.val.name])
          return true;
        } else {
          console.log('44444444444');
          this.defultValue = '';
        }
      });
    }
  }
  add() {
    if (this.fileData.length > 0) {
      let filter = []
      this.isShowFilter = true;
      this.isShowDrop = false
      setTimeout(() => {
        $('#filter').queryBuilder('destroy');
        _.each(this.fileData, (element) => {
          filter.push({
            id: element.name,
            label: element.name,
            type: 'string'
          })
        })
        $('#filter').on('afterUpdateRuleValue.queryBuilder', function (e, rule) {
          if (rule.filter.plugin === 'datepicker') {
            rule.$el.find('.rule-value-container input').datepicker('update');
          }
        });
        $('#filter').queryBuilder({
          plugins: [

          ],
          filters: filter,
        })
      }, 200);
    } else {
      this.notification.info('Info', 'Add File')
    }
  }
  submitForm() {
    var result = $('#filter').queryBuilder('getRules')
    let DropUnusedFields = []
    let map = []
    let Transform = []
    _.each(this.dropFileData, (element) => {
      if (element.checked) {
        DropUnusedFields.push(element.name)
      }
    })
    _.each(this.dataset, (element) => {
      if (element.rule.length > 0) {
        let removeDataset = element.rule.replace(/dataset.\b/g, " ");
        let removeSpark = removeDataset.replace(/Spark.\b/g, " ");
        let removeEqual = removeSpark.split("=")
        let obj = {}
        obj[removeEqual[0]] = removeEqual[1]
        Transform.push(obj)
      }
    })
    _.each(this.dataset, (element) => {
      if (element.map.length > 0) {
        let obj = {}
        obj[element.name] = element.map
        map.push(obj)
      }
    })
    const data = {
      filter: result,
      DropUnusedFields: DropUnusedFields,
      Map: map,
      DefaultVaue: this.defultValues,
      Transform: Transform,
    }
    console.log('22222222222222', data);
    console.log("data", JSON.stringify(data))
  }

  dropFields() {
    if (this.fileData.length > 0) {
      this.dropFileData = _.cloneDeep(this.rowData);
      this.isShowDrop = true;
      this.isShowFilter = false;
    } else {
      this.notification.info('Info', 'Add File')
    }
  }

  dropFile() {
    const tempData = [];
    this.isShowDrop = false
    _.each(this.dropFileData, (data) => {
      if (!data.checked) {
        tempData.push(data);
      }
    });
    this.rowData = tempData;
  }

  setDefultValue() {
    _.forEach(this.defultValues, (value, index) => {
      const key = Object.keys(value)
      if (key[0] === this.val.name) {
        this.defultValues.splice(index, 1);
      }
    });
    if (this.val.name && this.defultValue) {
      const data = {};
      data[this.val.name] = this.defultValue;
      this.defultValues.push(data);
    }
  } */

  tabSetLog(event) {
    if (event[0].tab.nzTitle === 'Query builder') {
    }

    if (event[0].tab.nzTitle === 'Step 3 : Filter') {
      let filter = [];
      setTimeout(() => {
        $('#filter').queryBuilder('destroy');
        _.each(this.rowData, (element) => {
          filter.push({
            id: element.name,
            label: element.name,
            type: 'string'
          })
        })
        $('#filter').on('afterUpdateRuleValue.queryBuilder', function (e, rule) {
          if (rule.filter.plugin === 'datepicker') {
            rule.$el.find('.rule-value-container input').datepicker('update');
          }
        });
        $('#filter').queryBuilder({
          plugins: [],
          filters: filter,
        })
      }, 200);
    }

    if (event[0].tab.nzTitle === 'Step 5 : Apply Mapping') {
      /*  this.apiService.getSchemaByCode(this.screens.code).subscribe((res: any) => {
         this.dataSet = [];
         this.tempDataSet = [];
         this.schema_config = res.schema_config;
         const key = Object.keys(res.schema_config)
         _.each(key, (element) => {
           const data = { name: element, map: '', rule: '', query: [], defultValue: '' }
           this.dataSet.push(data);
           this.tempDataSet.push(data);
         });
       }) */
    }
  }

  onScreenChange() {
    this.apiService.getSchemaByCode(this.screens.code).subscribe((res: any) => {
      this.dataSet = [];
      this.tempDataSet = [];
      this.schema_config = res.schema_config;
      const key = Object.keys(res.schema_config)
      _.each(key, (element) => {
        const data = { name: element, map: '', rule: '', query: [], defultValue: '' }
        this.dataSet.push(data);
        this.tempDataSet.push(data);
      });
    })
  }

  onFileSelect(input: HTMLInputElement) {
    const files = input.files;
    this.fileName = files[0].name;
    if (files && files.length > 0) {
      const fileToRead = files[0];
      const fileReader = new FileReader();
      fileReader.readAsText(fileToRead, "UTF-8");
      fileReader.onload = () => {
        let csvData = fileReader.result;
        let csvRecordsArray = (<string>csvData).split(/\r\n|\n/);
        this.getHeaderArray(csvRecordsArray);
      };
    }
  }

  getHeaderArray(csvRecordsArr: any) {
    // this.selectedIndex = 0
    let headers = (<string>csvRecordsArr[0]).split(',');
    let headerArray = [];
    _.each(headers, (header) => {
      let obj = {};
      obj['name'] = header;
      headerArray.push(obj);
    });
    /*  for (let j = 0; j < headers.length; j++) {
       let obj = {}
       obj['name'] = headers[j]
         this.monacodata[headers[j]] = obj
       headerArray.push(obj);
       headerArray.push(headers[j]);  
     } */
    this.rowData = headerArray
    /* this.fileNumber = this.rowData.length
    this.fileData = this.rowData
    var valu = this.monacodata */
    /*   var libSources = [
        ' var file = ' + JSON.stringify(valu),
   
      ].join('\n'); */
    /*  var libUri = 'ts:file/facts.d.ts';
     monaco.languages.typescript.javascriptDefaults.addExtraLib(libSources, libUri);
     monaco.editor.createModel(libSources, 'typescript', monaco.Uri.parse(libUri)); */
    // return headerArray;
  }

  searchParameter(value) {
    this.tempDataSet = _.filter(this.dataSet, (o) => {
      return _.includes(o.name, value);
    });
  }

  searchFile(value) {
    this.tempUndropedFileData = _.filter(this.undropedFileData, (o) => {
      return _.includes(o.name, value);
    });
  }

  nextStep(index: number) {
    switch (index) {
      case 1:
        if (this.rowData.length > 0) {
          this.selectedIndex = index;
        } else {
          this.notification.error('File?', 'please select CSV. file');
        }
        break;
      case 2:
        if (this.screens) {
          this.selectedIndex = index;
        } else {
          this.notification.error('File?', 'please select dataset');
        }
        break;
      case 3:
        this.selectedIndex = index;
        this.dropFileData = _.cloneDeep(this.rowData);
        this.filterData = $('#filter').queryBuilder('getRules');
        break;
      case 4:
        const undropData = [];
        const dropData = [];
        _.each(this.dropFileData, (data) => {
          if (!data.checked) {
            undropData.push(data);
          } else {
            dropData.push(data);
          }
        });
        this.undropedFileData = undropData;
        this.tempUndropedFileData = undropData
        this.dropedFileData = dropData;
        this.selectedIndex = index;
        break;
      case 5:
        this.selectedIndex = index;
        setTimeout(() => {
          monaco.editor.getModels().forEach(model => {
            if (model['_associatedResource'].path === "filename/facts.d.ts") { model.dispose() }
          })

          var valu = _.cloneDeep(this.schema_config);
          var libSource = [
            'declare class Spark {',
            '    static current_date():string',
            '    static date_sub(current_date,arg:number):string',
            '    static date_add(current_date,arg:number):string',
            '    static add_months(current_date,arg:number):string',
            '    static year(arg:any):string',
            '    static quarter(arg:any):string',
            '    static month(arg:any):string',
            '    static dayofweek(arg:any):string',
            '    static dayofmonth(arg:any):string',
            '    static dayofyear(arg:any):string',
            '    static weekofyear(arg:any):string',
            '    static last_day(arg:any):string',
            '    static datediff(current_date,arg:any):string',
            '    static months_between(current_date,arg:any,True):string',
            '    static next_day(current_date,day:string):string',
            '    static trunc(current_date,year:string):string',
            '    static date_trunc(month:string,current_date):string',
            '    static date_sub(arg:any,arg:number):string',
            '    static hour(arg:any):string',
            '    static minute(arg:any):string',
            '    static second(arg:any):string',
            '    static to_timestamp(arg:any):string',
            '    static initcap(arg:any):string',
            '    static upper(arg:any):string',
            '    static lower(arg:any):string',
            '    static trim(arg:any):string',
            '    static lpad(arg:any,arg:number,arg:string):string',
            '    static regexp_replace(arg:any,arg:any,arg:any):string',
            '    static instr(arg:any,arg:any:string):string',
            '    static translate(arg:any,arg:string,arg:string):string',
            '}',
            'var dataset =' + JSON.stringify(valu)
          ].join('\n');
          var libUri = 'ts:filename/facts.d.ts';
          monaco.editor.createModel(libSource, 'typescript', monaco.Uri.parse(libUri));
          monaco.languages.typescript.typescriptDefaults.setExtraLibs([{
            content: libSource,
            filePath: libUri
          }]);
        }, 10000);
        break;
      case 6:
    }
  }

  previousStep(index: number) {
    this.selectedIndex = index;
    if (index === 2) {
      setTimeout(() => {
        $('#filter').queryBuilder('setRules', this.filterData);
      }, 700);

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

  mapping(item) {
    _.each(this.dataSet, (element) => {
      if (element === this.radioValue) {
        element.map = item.name;
        setTimeout(() => {
          this.radioValue = null;
          this.radioValue1 = null;
        }, 200);
      } else {
        setTimeout(() => {
          this.radioValue = null;
          this.radioValue1 = null;
        }, 200);
      }
    })
  }

  removeItem(index) {
    this.dataSet[index].map = '';
  }

  subLog(event, item) {
    if (event[0].tab.nzTitle === 'Query builder') {
      let filter = [];
      $('#builder').queryBuilder('destroy');
      _.each(this.dataSet, (element) => {
        filter.push({
          id: element.name,
          label: element.name,
          type: 'string'
        })
      })
      $('#builder').on('afterUpdateRuleValue.queryBuilder', function (e, rule) {
        if (rule.filter.plugin === 'datepicker') {
          rule.$el.find('.rule-value-container input').datepicker('update');
        }
      });
      $('#builder').queryBuilder({
        plugins: [

        ],
        filters: filter,
        //rules:rule_basic
      });
      if (item.query && item.query.length > 0) {
        $('#builder').queryBuilder('setRules', item.query[0].rule);
        this.value1 = item.query[0].trueVal;
        this.value2 = item.query[0].falseVal;
      } else {
        // $('#builder').queryBuilder('setRules', '');
        this.value1 = '';
        this.value2 = '';
      }
    }
  }

  /* handleOk(): void {
    console.log('Button ok clicked!');
    const data = {
      rule: $('#builder').queryBuilder('getRules'),
      trueVal: this.value1,
      falseVal: this.value2
    }
    this.editorValue.query.push(data);
    this.isVisible = false;
    this.isShowEditor = false;
  }

  handleCancel(): void {
    console.log('Button cancel clicked!');
    this.isVisible = false;
    this.isShowEditor = false;
  } */

  addRule() {
    console.log('222');
  }

  setTransform() {
    this.subSelectedIndex = 0;
    setTimeout(() => {
      this.isShowEditor = true;
    }, 100);
    this.editorValue = this.ruleTransform;
    this.monocoValue = this.editorValue.rule;
    this.subDefultValue = this.editorValue.defultValue;

  }

  saveEditorValue(name, index) {
    this.subSelectedIndex = index;
    if (name === 'rule') {
      this.editorValue.rule = this.monocoValue;
    }

    if (name === 'defult') {
      this.editorValue.defultValue = this.subDefultValue;
    }

    if (name === 'builder') {
      this.editorValue.query = [];
      const data = {
        rule: $('#builder').queryBuilder('getRules'),
        trueVal: this.value1,
        falseVal: this.value2
      }
      this.editorValue.query.push(data);
    }
  }


  submit() {
    console.log('dataSet', this.dataSet);
    let map = [];
    let transform = [];
    let defultValue = [];
    _.each(this.dataSet, (element) => {
      if (element.map.length > 0) {
        let obj = {}
        obj[element.name] = element.map
        map.push(obj)
      }
    });

    _.each(this.dataSet, (element) => {
      if (element.rule.length > 0) {
        let removeDataset = element.rule.replace(/dataset.\b/g, " ");
        let removeSpark = removeDataset.replace(/Spark.\b/g, " ");
        let removeEqual = removeSpark.split("=")
        let obj = {}
        obj[removeEqual[0]] = removeEqual[1]
        transform.push(obj);
      }
    });

    _.each(this.dataSet, (element) => {
      if (element.defultValue.length > 0) {
        let obj = {}
        obj[element.name] = element.defultValue
        defultValue.push(obj)
      }
    });

    const data = {
      filter: this.filterData,
      DropUnusedFields: this.dropedFileData,
      Map: map,
      DefaultVaue: defultValue,
      Transform: transform,
    }
    console.log('22222222222222', data);
    console.log("data", JSON.stringify(data))
  }
}
