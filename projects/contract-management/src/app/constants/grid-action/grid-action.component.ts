import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { NzNotificationService } from 'ng-zorro-antd';
import { FormRenderService } from '../../../../src/app/services/form-render.service';
import * as _ from 'lodash'
import FileSaver from 'file-saver';
import { MasterService } from '../../../../src/app/services/master.service';
import { ScreenService } from '../../../../src/app/services/screen.service';
import { MenuService } from '../../../../src/app/services/menu';
import { AppMasterService } from '../../../../src/app/services/app-master.service';
import { AppScreenService } from '../../../../src/app/services/app-screen.service';
import { APIService } from '../../../../src/app/services/api.service';
import { ReportService } from '../../../../src/app/services/report.service'
import { HierarcyService } from '../../../../src/app/services/hierarcy.service'
import { UploadService } from '../../../../src/app/services/upload.service'
import { InterfaceService } from '../../../../src/app/services/interface.service'
import { JobService } from '../../../../src/app/services/job.service'
import { VisualService } from '../../../../src/app/services/visual.service';
import { DashboardService } from '../../../../src/app/services/dashboard.service';
import { RulesService } from '../../../../src/app/services/rules.service'
import {CustomerService} from '../../../../src/app/services/customer.service'
import { param } from 'jquery';
@Component({
  selector: 'app-grid-action',
  templateUrl: './grid-action.component.html',
  styleUrls: ['./grid-action.component.scss']
})
export class GridActionComponent implements ICellRendererAngularComp {
  private params: any;
  parentData: any;

  constructor(
    private router: Router,
    private formRenderService: FormRenderService,
    private notification: NzNotificationService,
    private masterService: MasterService,
    private screenService: ScreenService,
    private menuService: MenuService,
    private appMasterService: AppMasterService,
    private appScreenService: AppScreenService,
    private apiService: APIService,
    private reportService: ReportService,
    private hierarcyService: HierarcyService,
    private uploadService: UploadService,
    private interfaceService: InterfaceService,
    private jobService: JobService,
    private visualService: VisualService,
    private dashboardService: DashboardService,
    private rulesService:RulesService,
    private customerService:CustomerService
  ) { }

  agInit(params: any): void {
    this.params = params;
    this.parentData = this.params.context;
  }

  refresh(params: any): boolean {
    this.params = params;
    return true;
  }

  edit() {
    if (this.parentData.tabName === 'hiearachySearch') {
      this.router.navigate(['/drone/create-hierarchy/create', this.params.data.id]);
    }
    if (this.parentData.tabName === 'parameter') {
      this.router.navigate(['/drone/parameter/edit', this.params.data._id]);
    }
    if (this.parentData.tabName === 'define-master') {
      this.router.navigate(['/drone/master/edit', this.params.data._id])
    }
    if (this.parentData.tabName === 'define-screen') {
      this.router.navigate(['/drone/screen/edit', this.params.data._id])
    }
    if (this.parentData.tabName === 'app-master') {
      this.router.navigate(['/drone/appmaster/edit', this.params.data._id])
    }
    if (this.parentData.tabName === 'app-screen') {
      const mainData = this.parentData.componentParent;
      this.router.navigate(['/drone/appscreen/create/', mainData.screenData.name, mainData.screenData._id, mainData.screenData.code, this.params.data._id])
    }
    if (this.parentData.tabName === 'master-details') {
      const mainData = this.parentData.componentParent;
      this.router.navigate(['/drone/masters/details/update/', mainData.masterName, this.params.data.eimUUId, mainData.appMasterId])
    }
    if (this.parentData.tabName === 'all-report') {
      this.router.navigate(['/drone/report/edit', this.params.data._id])
    }
    if (this.parentData.tabName === 'all-hierarcy') {
      this.router.navigate(['/drone/hierarcy/edit', this.params.data._id])
    }
    if (this.parentData.tabName === 'all-upload') {
      this.router.navigate(['/drone/upload/edit', this.params.data._id])
    }
    if (this.parentData.tabName === 'all-interface') {
      this.router.navigate(['/drone/apiinterface/edit', this.params.data._id])
    }
    if (this.parentData.tabName === 'all-job') {
      this.router.navigate(['/drone/job/edit', this.params.data._id])
    }
    if (this.parentData.tabName === 'all-visual') {
      this.router.navigate(['/drone/visual/edit', this.params.data._id])
    }
    if (this.parentData.tabName === 'dashboard') {
      this.router.navigate(['/drone/dashboard/edit', this.params.data._id])
    }
    if (this.parentData.tabName === 'all-rules') {
      this.router.navigate(['/drone/rules/edit', this.params.data._id])
    }
    if (this.parentData.tabName === 'all-customer') {
      this.router.navigate(['/drone/customer/edit', this.params.data._id])
    }
    if (this.parentData.tabName === 'all-user') {
      this.router.navigate(['/drone/user/update', this.params.data.id])
    }
  }

  delete() {
    if (this.parentData.tabName === 'all-user') {
      this.apiService.deleteUser(this.params.data.id).subscribe(res => {
        this.notification.success('Successfully', 'You have successfully delete User')
        const data = _.remove(this.params.context.componentParent.rowData, (data) => {
          return data.id !== this.params.data.id
        })
        this.params.context.componentParent.rowData = data
      })
    }
    if (this.parentData.tabName === 'parameter') {
      this.formRenderService.parameterDelete(this.params.data._id).subscribe(res => {
        this.notification.success('Successfully', 'You have successfully delete parameter!')
        const data = _.remove(this.params.context.componentParent.rowData, (data) => {
          return data._id !== this.params.data._id
        })
        this.params.context.componentParent.rowData = data
      })
    }
    if (this.parentData.tabName === 'define-master') {
      this.masterService.deleteMasterData(this.params.data.tab_id).subscribe(res => {
        this.notification.success('Successfully', 'You have successfully delete master!')
        const data = _.remove(this.parentData.componentParent.mastersData, (data) => {
          return data._id !== this.params.data._id
        })
        this.parentData.componentParent.mastersData = data
      })
    }
    if (this.parentData.tabName === 'define-screen') {
      this.screenService.deleteScreenData(this.params.data._id).subscribe(res => {
        this.menuService.getMenuData();
        this.notification.success('Successfully', 'You have successfully delete screen!')
        const data = _.remove(this.parentData.componentParent.screensData, (data) => {
          return data._id !== this.params.data._id
        })
        this.parentData.componentParent.screensData = data
      })
    }

    if (this.parentData.tabName === 'app-master') {
      this.appMasterService.deleteAppMasterData(this.params.data._id).subscribe(res => {
        this.menuService.getMenuData();
        this.notification.success('Successfully', 'You have successfully delete Application Master!')
        const data = _.remove(this.parentData.componentParent.appMastersData, (data) => {
          return data._id !== this.params.data._id
        })
        this.parentData.componentParent.appMastersData = data
      })
    }
    if (this.parentData.tabName === 'app-screen') {
      const mainData = this.parentData.componentParent;
      this.appScreenService.deleteAppScreenData(mainData.screenData.code, this.params.data._id).subscribe(res => {
        this.notification.success('Successfully', 'You have successfully delete screen data!')
        const data = _.remove(mainData.rowData, (data) => {
          return data._id !== this.params.data._id
        })
        mainData.rowData = data
      })
    }

    if (this.parentData.tabName === 'master-details') {
      const mainData = this.parentData.componentParent;
    this.apiService.deleteSchemaRecord(this.params.data.eimUUId).subscribe(res =>{
      this.notification.success('Successfully', 'You have successfully delete function Master!')
     const data=_.remove(this.parentData.componentParent.rowData, (data)=>{
      return data.eimUUId !== this.params.data.eimUUId
     })
     this.parentData.componentParent.rowData = data
    })
    
    }
 
    if (this.parentData.tabName === 'all-report') {
      this.reportService.deleteReport(this.params.data._id).subscribe(res => {
        this.menuService.getMenuData();
        this.notification.success('Successfully', 'You have successfully delete function Master!')
        const data = _.remove(this.parentData.componentParent.reportData, (data) => {
          return data._id !== this.params.data._id
        })
        this.parentData.componentParent.reportData = data
      })
    }

    if (this.parentData.tabName === 'all-hierarcy') {
      this.hierarcyService.deleteHierarcy(this.params.data._id).subscribe(res => {
        this.menuService.getMenuData();
        this.notification.success('Successfully', 'You have successfully delete function Master!')
        const data = _.remove(this.parentData.componentParent.reportData, (data) => {
          return data._id !== this.params.data._id
        })
        this.parentData.componentParent.reportData = data
      })
    }

    if (this.parentData.tabName === 'all-upload') {
      this.uploadService.deleteUpload(this.params.data._id).subscribe(res => {
        this.menuService.getMenuData();
        this.notification.success('Successfully', 'You have successfully delete upload!')
        const data = _.remove(this.parentData.componentParent.uploadData, (data) => {
          return data._id !== this.params.data._id
        })
        this.parentData.componentParent.uploadData = data
      })
    }

    if (this.parentData.tabName === 'all-interface') {
      this.interfaceService.deleteInterfaceData(this.params.data._id).subscribe(res => {
        this.menuService.getMenuData();
        this.notification.success('Successfully', 'You have successfully delete interface!')
        const data = _.remove(this.parentData.componentParent.interfaceData, (data) => {
          return data._id !== this.params.data._id
        })
        this.parentData.componentParent.interfaceData = data
      })
    }

    if (this.parentData.tabName === 'all-job') {
      this.jobService.deleteJobData(this.params.data._id).subscribe(res => {
        this.menuService.getMenuData();
        this.notification.success('Successfully', 'You have successfully delete interface!')
        const data = _.remove(this.parentData.componentParent.jobData, (data) => {
          return data._id !== this.params.data._id
        })
        this.parentData.componentParent.jobData = data
      })
    }

    if (this.parentData.tabName === 'all-visual') {
      this.visualService.deleteGraph(this.params.data._id).subscribe(res => {
        this.menuService.getMenuData();
        this.notification.success('Successfully', 'You have successfully delete upload!')
        const data = _.remove(this.parentData.componentParent.visualData, (data) => {
          return data._id !== this.params.data._id
        })
        this.parentData.componentParent.visualData = data
      })
    }

    if (this.parentData.tabName === 'dashboard') {
      const mainData = this.parentData.componentParent;
      this.dashboardService.deleteDashboard(this.params.data._id).subscribe(res => {
        this.notification.success('Successfully', 'You have successfully delete record!')
        const data = _.remove(mainData.rowData, (data) => {
          return data._id !== this.params.data._id
        })
        mainData.rowData = data
      })
    }

    if (this.parentData.tabName === 'all-rules') {
      this.rulesService.deleteRules(this.params.data._id).subscribe(res => {
        this.menuService.getMenuData();
        this.notification.success('Successfully', 'You have successfully delete upload!')
        const data = _.remove(this.parentData.componentParent.rulesData, (data) => {
          return data._id !== this.params.data._id
        })
        this.parentData.componentParent.rulesData = data
      })
    }
    if (this.parentData.tabName === 'all-customer') {
      this.customerService.deleteCustomer(this.params.data._id).subscribe(res => {
        this.menuService.getMenuData();
        this.notification.success('Successfully', 'You have successfully delete customer!')
        const data = _.remove(this.parentData.componentParent.customerData, (data) => {
          return data._id !== this.params.data._id
        })
        this.parentData.componentParent.customerData = data
      })
    }
  }

  show() {
    this.parentData.componentParent.form = {
      components: []
    }
    this.parentData.componentParent.screenName = this.params.data.name;
    _.each(this.params.data.configuration, (component) => {
      this.parentData.componentParent.form.components.push(component)
    })
    this.parentData.componentParent.form.components.push({
      "type": "button",
      "label": "Submit",
      "key": "submit",
      "disableOnInvalid": true,
      "input": true,
      "tableView": false
    })
    this.parentData.componentParent.isFormVisible = true
  }
  download() {
    // console.log("this this.parentData.componentParent",)
    const blob = new Blob([this.params.data.config], { type: 'text/csv' });
    FileSaver.saveAs(blob, this.params.data.name + '.csv');
  }

  show1() {
    // console.log('this.params.data', this.params.data);
    this.router.navigate(['/job/details', this.params.data.model_name]);
  }
}
