import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CompactType, DisplayGrid, Draggable, GridsterConfig, GridsterItem, GridType, PushDirections, Resizable } from 'angular-gridster2';
import { NzNotificationService } from 'ng-zorro-antd';
import { APIService } from '../../../../../src/app/services/api.service';
import { AppMasterService } from '../../../../../src/app/services/app-master.service';
import { DashboardService } from '../../../../../src/app/services/dashboard.service';
import { ScreenService } from '../../../../../src/app/services/screen.service';
import { VisualService } from '../../../../../src/app/services/visual.service';
import * as _ from 'lodash'

interface Safe extends GridsterConfig {
  draggable: Draggable;
  resizable: Resizable;
  pushDirections: PushDirections;
}
let _this: any;

@Component({
  selector: 'app-app-dashboard',
  templateUrl: './app-dashboard.component.html',
  styleUrls: ['./app-dashboard.component.scss']
})
export class AppDashboardComponent implements OnInit {
  options: Safe;
  dashboard: Array<GridsterItem> = [];
  graphModal: any = { data: [], layout: {} };
  isVisible: boolean = false;
  allVisuals: any;
  graph: any = { data: [] };
  isShowGrap: boolean = false;
  selectedVisual: any;
  selectedIndex: any;
  dashBoardForm: any;
  dashboardId: null;
  listOfApplicationMaste: any = [];

  constructor(
    private apiService: APIService,
    private visualService: VisualService,
    private dashboardService: DashboardService,
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private notification: NzNotificationService,
    private screenService: ScreenService,
    private appMasterService: AppMasterService,
  ) {
    this.route.params.subscribe(params => {
      this.dashboardService.getDasbhoardById(params['id']).subscribe((res) => {
        this.dashboard = res.data;
        /*  _.each(res.data, (dash) => {
           if (dash.layout && dash.layout.xaxis) {
             dash.layout.xaxis.automargin = true;
             dash.layout.yaxis.automargin = true;
           }
           this.dashboard.push(dash);
         }); */
      });
    });
    _this = this;
  }

  ngOnInit(): void {
    /*  this.dashBoardForm = this.formBuilder.group({
       name: [null, Validators.required],
       applicationMaster: ['', Validators.required],
     }); */

    /*   this.dashboard = []; */
    /*    this.visualService.getGraphs().subscribe(response => {
         this.allVisuals = response;
         this.appMasterService.getAllAppMasterData().subscribe(res => {
           this.listOfApplicationMaste = res;
           
         })
       }); */



    this.options = {
      gridType: GridType.Fixed,
      compactType: CompactType.None,
      margin: 5,
      outerMargin: false,
      outerMarginTop: null,
      outerMarginRight: null,
      outerMarginBottom: null,
      outerMarginLeft: null,
      useTransformPositioning: true,
      mobileBreakpoint: 640,
      minCols: 1,
      maxCols: 100,
      minRows: 1,
      maxRows: 100,
      maxItemCols: 100,
      minItemCols: 1,
      maxItemRows: 100,
      minItemRows: 1,
      maxItemArea: 2500,
      minItemArea: 1,
      defaultItemCols: 1,
      defaultItemRows: 1,
      fixedColWidth: 105,
      fixedRowHeight: 105,
      keepFixedHeightInMobile: false,
      keepFixedWidthInMobile: false,
      scrollSensitivity: 10,
      scrollSpeed: 20,
      enableEmptyCellClick: false,
      enableEmptyCellContextMenu: false,
      enableEmptyCellDrop: false,
      enableEmptyCellDrag: false,
      enableOccupiedCellDrop: false,
      emptyCellDragMaxCols: 50,
      emptyCellDragMaxRows: 50,
      ignoreMarginInRow: false,
      draggable: {
        enabled: false,
      },
      resizable: {
        enabled: false,
      },
      swap: false,
      pushItems: false,
      disablePushOnDrag: false,
      disablePushOnResize: false,
      pushDirections: { north: true, east: true, south: true, west: true },
      pushResizeItems: false,
      displayGrid: DisplayGrid.None,
      disableWindowResize: false,
      disableWarnings: false,
      scrollToNewItems: false,
      /*  itemResizeCallback: this.itemResize, */
    };
  }

  /* submit() {
    this.markFormGroupDirty(this.dashBoardForm);
    if (this.dashBoardForm.valid) {
      if (this.dashboardId) {
        const data = {
          name: this.dashBoardForm.value.name,
          appName: this.dashBoardForm.value.applicationMaster,
          data: this.dashboard,
          _id: this.dashboardId,
        }
        this.dashboardService.updateDashboard(data).subscribe((response) => {
          this.notification.success('Successfully', 'You have successfully Update dashboard!')
          this.router.navigate(['/dashboard/all']);
        });
      } else {
        const data = {
          name: this.dashBoardForm.value.name,
          appName: this.dashBoardForm.value.applicationMaster,
          data: this.dashboard
        }
        this.dashboardService.saveDashboard(data).subscribe((response) => {
          this.notification.success('Successfully', 'You have successfully Save dashboard!');
          this.dashBoardForm.reset();
          this.dashboard = [];
        });
      }
    }
  } */

  /* changedOptions(): void {
    if (this.options.api && this.options.api.optionsChanged) {
      this.options.api.optionsChanged();
    }
  } */

  /*  removeItem($event: MouseEvent | TouchEvent, item): void {
     $event.preventDefault();
     $event.stopPropagation();
     this.dashboard.splice(this.dashboard.indexOf(item), 1);
   }
 
   changeVisual(selectedVisual) {
     const data = _.find(this.allVisuals, (o) => { return o._id === selectedVisual });
     this.graph.data = data.dataConfig.graph.data;
     this.graph.layout = { height: 350, title: data.dataConfig.graph.layout.title.text }
     this.isShowGrap = false
     setTimeout(() => {
       this.isShowGrap = true
     }, 100)
   } */

  /*   addItem(): void {
      this.dashboard.push({ x: 0, y: 0, cols: 1, rows: 1, graphData: null, selectedVisual: null });
    }
   */
  /*   showModal(index): void {
      this.selectedIndex = index;
      if (this.dashboard[this.selectedIndex].graphData) {
        this.graph.data = this.dashboard[this.selectedIndex].graphData;
        this.selectedVisual = this.dashboard[this.selectedIndex].selectedVisual;
        this.graph.layout = { height: 350, title: this.dashboard[this.selectedIndex].layout.title }
        this.isShowGrap = true;
      } else {
        this.graph = { data: [] };
        this.selectedVisual = null;
      }
      this.isVisible = true;
    } */
  /* 
    handleOk(): void {
      this.dashboard[this.selectedIndex].graphData = this.graph.data
      this.dashboard[this.selectedIndex].selectedVisual = this.selectedVisual;
      this.dashboard[this.selectedIndex].layout.title = this.graph.layout.title.text;
      this.isVisible = false;
      setTimeout(() => {
        this.graph = { data: [] };
        this.selectedVisual = null;
        this.isShowGrap = false;
      }, 200);
  
    }
  
    handleCancel(): void {
      this.isVisible = false;
      setTimeout(() => {
        this.graph = { data: [] };
        this.selectedVisual = null;
        this.isShowGrap = false;
      }, 200);
    } */

  /* markFormGroupDirty(form) {
    (<any>Object).values(form.controls).forEach(control => {
      control.markAsDirty()
      control.updateValueAndValidity()
      if (control.controls) {
        this.markFormGroupDirty(control)
      }
    })
  } */

  /* itemResize(item, itemComponent) {
    const tempItem = _.cloneDeep(item);
    if (_this.graph) {
      item.layout = {
        title: tempItem.layout && tempItem.layout.title ? tempItem.layout.title.text : '',
        height: itemComponent.height - 20, width: itemComponent.width, xaxis: {
          tickangle: -60,
          automargin: true,
        },
        yaxis: {
          tickangle: -20,
          automargin: true,
        },
        font: {
          size: 10
        },
      }
      _this.isShowGrap = false
      setTimeout(() => {
        this.isShowGrap = true
      }, 100)
    }
  } */

  showModal(index, item) {
    this.isVisible = true;
    setTimeout(() => {
      this.graphModal.data = _.cloneDeep(item.graphData);
      this.graphModal.layout = _.cloneDeep(item.layout);
      delete this.graphModal.layout.width;
      delete this.graphModal.layout.height;
    }, 10)

  }

  handleCancel(): void {
    this.isVisible = false;
    this.graphModal = { data: [], layout: {} };
  }
}
