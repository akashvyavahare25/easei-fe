import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { NzSelectModule } from 'ng-zorro-antd/select'
import { SharedModule } from '../../shared.module'
import { AgGridModule } from 'ag-grid-angular'
import { NzIconModule } from 'ng-zorro-antd/icon'
import { NzSwitchModule } from 'ng-zorro-antd/switch'
import { CreateHirarchyComponent } from './create-hirarchy/create-hirarchy.component';
import { CreateHierarchyRouterModule } from './createhierarchy-routing.module';
import { SearchHierarchyComponent } from './search-hierarchy/search-hierarchy.component';
@NgModule({
  declarations: [CreateHirarchyComponent, SearchHierarchyComponent],
  imports: [
    SharedModule,
    CommonModule,
    FormsModule,
    CreateHierarchyRouterModule,
    ReactiveFormsModule,
    NzSelectModule,
    NzIconModule,
    NzSwitchModule,
    AgGridModule.withComponents([]),
  ]
})
export class  CreateHierarchyModule { }
