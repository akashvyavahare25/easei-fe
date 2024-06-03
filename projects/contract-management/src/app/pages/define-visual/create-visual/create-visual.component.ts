import { AfterViewInit, Component, OnChanges, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ReportService } from '../../../../../src/app/services/report.service';
import { VisualService } from '../../../../../src/app/services/visual.service';
import { NzNotificationService } from 'ng-zorro-antd'
import { ActivatedRoute, Router } from '@angular/router'
import * as _ from 'lodash'
@Component({
  selector: 'app-create-visual',
  templateUrl: './create-visual.component.html',
  styleUrls: ['./create-visual.component.scss']
})
export class CreateVisualComponent implements OnInit, AfterViewInit {
  basicCharts = ['bar_charts.PNG', 'bubble_charts.PNG', 'line_chats.PNG', 'pai_charts.PNG', 'scatter_plots.PNG']
  graph: any = {
    data: [],
    layout: {},
    config: { resposive: true }
  };
  parameterId: boolean = false;
  isShowGrap: boolean = false;
  visualData: any
  defineMarker: boolean = false;
  reportData: any;
  chartForm: any
  disabledButton: boolean = false;
  type: any
  isPie:boolean=true;
  xyData: any = []
  xyKeys: any = []
  X: any = []
  Y: any = []
  xData: any = { name: '', value: [] }
  yData: any = { name: '', value: [] }
  barMode = ['group', 'stack']
  lineMode = ['markers', 'lines', 'lines+markers']
  scatterMode = ['markers', 'lines', 'lines+markers']
  pieMode: any = []
  bubbleMode: any = ['markers']
  graphMode: any = []
  coordinate: any = []
  constructor(
    private router: Router,
    private reportService: ReportService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private visualService: VisualService,
    private notification: NzNotificationService,

  ) {
    this.route.params.subscribe(params => {
      this.parameterId = params['id']
    })
  }

  ngOnInit(): void {
    this.reportService.getReports().subscribe(res => {
      this.reportData = res;
    })
    this.chartForm = this.formBuilder.group({
      name: ['', Validators.required],
      report: ['', Validators.required],
      mode: [''],
      x: [''],
      y: [''],
      type: [''],
      title: [''],
      xlable: [''],
      ylable: [''],
      size: [''],
      steps: this.formBuilder.array([]),
    })
    if (this.parameterId) {
      this.visualService.getGraphs().subscribe(res => {
        this.visualData = _.filter(res, { _id: this.parameterId })[0]
        const app = _.filter(this.reportData, { name: this.visualData.report })
        if(this.visualData.type==="pie")
        { 
          //  this.isPie=false;
          this.chartForm.patchValue({
            name: this.visualData.name,
            report: app[0],
            type: this.visualData.type,
            title: this.visualData.dataConfig.graph.layout.title ? this.visualData.dataConfig.graph.layout.title.text : '',
            xlable: this.visualData.dataConfig.graph.layout.labels.title ? this.visualData.dataConfig.graph.layout.labels.title.text : '',
            ylable: this.visualData.dataConfig.graph.layout.values.title ? this.visualData.dataConfig.graph.layout.values.title.text : ''
          })
          _.each(this.visualData.dataConfig.coordinate, (data) => {
            this.xData = data.labels,
              this.yData = data.values
            this.addNewStep()
          })

        }else{
          this.chartForm.patchValue({
            name: this.visualData.name,
            report: app[0],
            type: this.visualData.type,
            mode: this.visualData.dataConfig.graph.data[0].mode,
            title: this.visualData.dataConfig.graph.layout.title ? this.visualData.dataConfig.graph.layout.title.text : '',
            xlable: this.visualData.dataConfig.graph.layout.xaxis.title ? this.visualData.dataConfig.graph.layout.xaxis.title.text : '',
            ylable: this.visualData.dataConfig.graph.layout.yaxis.title ? this.visualData.dataConfig.graph.layout.yaxis.title.text : '',
            size: this.visualData.dataConfig.graph.data[0].marker.size,
          })
          _.each(this.visualData.dataConfig.coordinate, (data) => {
            this.xData = data.x,
              this.yData = data.y
            this.addNewStep()
          })
        }
        
       
        // this.graph=this.visualData.dataConfig.graph
       
      })
    }
  }

  ngAfterViewInit(): void {

  }

  getImage(value) {
    return '/assets/images/' + value;
  }
  addType(item) {
    this.type = item
  }

  changeReport(data) {
    if (data) {
      delete data._id;
      delete data.__v;
      delete data.updatedAt;
      delete data.createdAt;
      if (data.queryType === "aggregate+field") {
        if (!data.config) {
          data.config = {}
        }
        if (!data.projectFields) {
          data.projectFields = {}
        }
        if (!data.lookupFields) {
          data.lookupFields = {}
        }
        if (!data.groupFields) {
          data.groupFields = {}
        }
      }
      else {
        if (data.config) {
          data.config = JSON.parse(data.config)
        }
      }
      this.xyData = []
      this.xyKeys = []
      this.reportService.find(data).subscribe(res => {
        delete res[0]._id;
        delete res[0].__v;
        this.xyData = res
        this.xyKeys = Object.keys(res[0])
      });
    }
  }

  chooseX(item) {
    this.xData.value=[]
    if (item) {
      this.xData.name = item
      _.each(this.xyData, (data) => {
        this.xData.value.push(data[item])
      })
    }
  }

  chooseY(item) {
    this.yData.value=[]
    if (item) {
      this.yData.name = item
      _.each(this.xyData, (data) => {
        this.yData.value.push(data[item])
      })
    }
  }

  chooseGraph(item) {
    if (item) {
      if (item === 'bar') {
        this.graphMode = this.barMode
        this.defineMarker = false
      }
      else if (item === 'bubble') {
        this.graphMode = this.bubbleMode
        this.defineMarker = true
      }
      else if (item === 'line') {
        this.graphMode = this.lineMode
        this.defineMarker = true
      }
      else if (item === 'pie') {
        this.graphMode = this.pieMode
        this.defineMarker = false
        this.isPie=false;
      }
      else if (item === 'scatter') {
        this.graphMode = this.scatterMode
        this.defineMarker = true
      }
      //this.graphMode=item
    } this.graph.data=[]
  }

  addSize() {
    if (this.chartForm.value.size) {
      if (this.graph.data.length < 1) {
      }
      else {
        _.each(this.graph.data, (graphData) => {
          if (this.chartForm.value.type === 'bar') {
          }
          else {
            graphData.marker.size = this.chartForm.value.size
          }
          //graphData.type:      
        })
        this.isShowGrap = false
        setTimeout(() => {
          this.isShowGrap = true
        }, 400)
      }
    }
  }

  chooseMode(item) {
    if (item) {
      if (this.graph.data.length < 1) {
      }
      else {
        _.each(this.graph.data, (graphData) => {
          if (this.chartForm.value.type === 'bar') {
            graphData.type = this.chartForm.value.type
            this.graph.layout.barmode = this.chartForm.value.mode
          }
          else {
            graphData.type = this.chartForm.value.type
            graphData.mode = this.chartForm.value.mode
          }
          //graphData.type:      
        })
        this.isShowGrap = false
        setTimeout(() => {
          this.isShowGrap = true
        }, 400)
      }
    }
  }

  changeField() {
    this.disabledButton = false
  }

  removeField(index) {
    this.graph.data.splice(index, 1)
    this.coordinate.splice(index, 1)
    this.chartForm.controls.steps.controls.splice(index, 1)
  }

  getChart(value) {
    this.isShowGrap = true;
    _.each(this.graph.data, (graphData) => {
      if (value === 'bar_charts.PNG') {
        //graphData.type='bar'
        //graphData.mode='group'
        this.chartForm.value.mode = 'group'
        this.chartForm.value.type = 'bar'
        this.chartForm.patchValue({
          type: 'bar',
          mode: 'group'
        })
        this.defineMarker = false
        graphData.marker.size = ''
        // this.graph.layout.barmode="group"
        // this.graph.layout.bargap="0.15"
        // this.graph.layout.bargroupgap="0.1"       
      }

      if (value === 'bubble_charts.PNG') {
        // graphData.mode='markers'
        // graphData.type=''
        this.defineMarker = true
        this.chartForm.value.mode = 'markers'
        this.chartForm.value.type = 'markers'
        this.chartForm.patchValue({
          type: 'markers',
          mode: 'markers'
        })
      }

      if (value === 'line_chats.PNG') {
        this.defineMarker = true
        this.chartForm.value.mode = 'markers'
        this.chartForm.value.type = 'line'
        this.chartForm.patchValue({
          type: 'line',
          mode: 'markers'
        })
        // graphData.mode='lines'
        // graphData.type=''
        // graphData.connectgaps=true     
      }

      if (value === 'pai_charts.PNG') {
        this.chartForm.value.mode = ''
        this.chartForm.value.type = 'pie'
        this.chartForm.patchValue({
          type: 'pie',
          mode: ''
        })
        this.defineMarker = false
        graphData.marker.size = ''
      }

      if (value === 'scatter_plots.PNG') {
        this.defineMarker = true
        this.chartForm.value.mode = 'markers'
        this.chartForm.value.type = 'scatter'
        this.chartForm.patchValue({
          type: 'scatter',
          mode: 'markers'
        })
      }
    })
  }

  addNewStep() {
    this.disabledButton = true
    var trace5 = {
      x: this.xData.value,
      y: this.yData.value,
      mode: this.chartForm.value.mode,
      type: this.chartForm.value.type,
      text:this.yData.value.map(String),
      textposition: 'auto',
      hoverinfo: 'none',
      marker: { size: this.chartForm.value.size,
        color: 'rgb(49,130,189)',
        opacity: 0.5 }
    };

    var data = {
      x: this.xData,
      y: this.yData,
    }
    if (this.xData.name.length < 1 || this.yData.name.length < 1) {
      var layout = {
        xaxis: {
          // range: [ 0.75, 5.25 ],
          title: this.chartForm.value.xlable
        },
        yaxis: {
          // range: [0, 8],
          title: this.chartForm.value.ylable
        },
        title: this.chartForm.value.title
      };
      this.graph.layout = layout
      this.isShowGrap = false
      setTimeout(() => {
        this.isShowGrap = true
      }, 400)
    }
    else {
      var layout = {
        xaxis: {
          // range: [ 0.75, 5.25 ],
          title: this.chartForm.value.xlable
        },
        yaxis: {
          // range: [0, 8],
          title: this.chartForm.value.ylable
        },
        title: this.chartForm.value.title
      };
      if(this.chartForm.value.type==='pie'){
        let layout={ 
          labels: {
          title: this.chartForm.value.x
        },
        values: {
          title: this.chartForm.value.y
        },
          title: this.chartForm.value.title
        }
        var config={
          values: this.yData,
          labels:  this.xData,
        }
        var data1 = {
          values: this.yData.value,
          labels:  this.xData.value,
          type: 'pie'
        };
        this.graph.data=[data1]
        this.graph.layout = layout
        this.coordinate=[config]
        this.isShowGrap = false
        setTimeout(() => {
          this.isShowGrap = true
        }, 400)
      }else{
        this.coordinate.push(data)
        this.graph.data.push(trace5)
        this.graph.layout = layout
        const approvalArray = this.chartForm.get('steps') as FormArray
        const blockFormGroup = new FormGroup({});
        blockFormGroup.addControl('x', new FormControl({ value: this.xData.name, disabled: true }, Validators.required,));
        blockFormGroup.addControl('y', new FormControl({ value: this.yData.name, disabled: true }, Validators.required,));
        approvalArray.push(blockFormGroup);
        this.isShowGrap = false
        setTimeout(() => {
          this.isShowGrap = true
        }, 400)
        this.xData = { name: '', value: [] }
        this.yData = { name: '', value: [] }
        this.chartForm.controls['x'].reset()
        this.chartForm.controls['y'].reset()
      
     
      }
    }
  }

  submitForm() {
    let graphName: any
    if (this.chartForm.value.type === 'bar') {
      graphName = 'bar_charts.PNG'
    }
    if (this.chartForm.value.type === 'bubble') {
      graphName = 'bubble_charts.PNG'
    }
    if (this.chartForm.value.type === 'line') {
      graphName = 'line_chats.PNG'
    }
    if (this.chartForm.value.type === 'pie') {
      graphName = 'pai_charts.PNG'
    }
    if (this.chartForm.value.type === 'scatter') {
      graphName = 'scatter_plots.PNG'
    }
    const dataConfig = { graph: this.graph, coordinate: this.coordinate }
    const data = {
      name: this.chartForm.value.name,
      type: this.chartForm.value.type,
      report: this.chartForm.value.report.name,
      dataConfig: dataConfig,
      graphName: graphName
      //xyKeys:this.xyKeys,
    }
    if (this.parameterId) {
      data['_id'] = this.parameterId
      this.visualService.updateGraph(data).subscribe(res => {
        this.notification.success('sucessfull', 'data sucessfully updated');
        this.router.navigate(['/visual/all'])
      })
    }
    else {
      this.visualService.saveGraph(data).subscribe(res => {
        this.notification.success('sucessfull', 'data sucessfully save');
        this.chartForm.reset()
        this.chartForm.controls.steps.controls = []
        this.graph = {
          data: [],
          layout: {}
        };
        this.xyKeys = []
        this.xyData = []
      })
    }
  }
}
