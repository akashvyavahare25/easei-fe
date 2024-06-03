import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'
import { NzNotificationService } from 'ng-zorro-antd'
import { APIService } from '../../../../../src/app/services/api.service';
import { ScreenService } from '../../../../../src/app/services/screen.service'
import { MasterService } from '../../../../../src/app/services/master.service'
import { HierarcyService} from '../../../../../src/app/services/hierarcy.service'
import * as _ from 'lodash'
import { FormBuilder, Validators } from '@angular/forms';
declare var require:any;
var InspireTree = require('inspire-tree');
var InspireTreeDOM = require('inspire-tree-dom');

@Component({
  selector: 'app-create-hierarcy',
  templateUrl: './create-hierarcy.component.html',
  styleUrls: ['./create-hierarcy.component.scss']
})
export class CreateHierarcyComponent implements OnInit {
  mastersData: any
  hierarcyForm: any
  paramaterId:any
  searchValue:string=""
  trees: any
  tree:any
  root: any = []
  parameterData:any=[]
  nodeArray:any=[]
  applicationValue:string=""
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private masterService: MasterService,
    private apiService: APIService,
    private hierarcyService:HierarcyService,
    private screenService: ScreenService,
    private notification: NzNotificationService,
  ) {
    this.route.params.subscribe(params => {
      this.paramaterId = params['id']
    })
  }

  ngOnInit(): void {
    this.hierarcyForm = this.formBuilder.group({
      name: [null, Validators.required],
      dataSet: [null, Validators.required],
    })
    this.masterService.getAllMasterData().subscribe(res => {
      this.mastersData = res
    })
    if (this.paramaterId) {
      this.hierarcyService.getHierarcy(this.paramaterId).subscribe(res => {
        this.hierarcyForm.patchValue({
          name:res.name,
          dataSet:res.masterName
        })
        this.parameterData=res.hierarchy_data.treeData
        _.each(this.parameterData, (node) => {
          if (node.children) {
            this.nodeArray.push(node.text)
            this.traverse(node.children);
          }
          else{
            this.nodeArray.push(node.text)
          }
        })        
        const tree1 = new InspireTree({
          data:res.hierarchy_data.treeData
        });
        this.trees=tree1;
        new InspireTreeDOM(this.trees, {
          target: '.trees',
          dragAndDrop: true
        });
        document.querySelector('.search').addEventListener('keyup', ($event) => {
          //function here 
         tree1.search(this.searchValue)
       });       
      })
    }
  }
  traverse(tree) {       
    if(tree&&tree.length>0){
          
      _.each(tree, (node) => {
        
        this.nodeArray.push(node.text)
      this.traverse(node.children)
      });      
    }
    else{
    } 
  }
  ngAfterViewInit(): void {
    if(!this.paramaterId){
    const tree1 = new InspireTree({
      data: [{
        text: 'root'
      }]
    });
    this.trees=tree1;
    new InspireTreeDOM(this.trees, {
      target: '.trees',
      dragAndDrop: true
    });
    document.querySelector('.search').addEventListener('keyup', ($event) => {
      //function here 
     
      tree1.search(this.searchValue)
   });
  
  }

  }

  changeDataSet(): void {   
    if(this.hierarcyForm.get('dataSet').value){
    this.apiService.getMaster(this.hierarcyForm.get('dataSet').value).subscribe(res => {
      this.getMasterList(res.code);
    });
    }
  }

  getMasterList(masterName) {
    
    this.apiService.getDropdownLookupData(masterName).subscribe(response => {
      if (response && response.datasource.length > 0) {
        
        const masterData = []        
        response.datasource.forEach((r) => {          
          if(!this.nodeArray.includes(r[response.metadata.labelName])){
          const object = {
            text: r[response.metadata.labelName]
          }
          masterData.push(object);
        }
        });         
        
        const tree = new InspireTree({
          data: masterData,
          search:{matchProcessor:true }
        });
        this.tree=tree
        new InspireTreeDOM(tree, {
          target: '.tree',
          dragAndDrop: true
        });       
        document.querySelector('.application').addEventListener('keyup', ($event) => {
          tree.search(this.applicationValue)
       });      
        this.ngAfterViewInit();
      }
    })
  
  }

  submitForm() {
    const treeData = [];
    var nodes = this.trees.nodes()
    _.each(nodes, (node) => {
      const temp = {
        text: node.text
      };
      if (node.children) {
        const tempObject = temp['children'] = [];
        this.getChildren(tempObject, node.children);
      }
      treeData.push(temp);
    })
    const data={
      name:this.hierarcyForm.value.name,
      masterName:this.hierarcyForm.value.dataSet,
      hierarchy_data:{treeData}
    }  
   if(this.paramaterId){
    data['_id'] = this.paramaterId
    this.hierarcyService.updateHierarcy(data).subscribe(res=>{
      this.notification.success('Successfully', 'You have successfully Update Hierarcy!')
        this.router.navigate(['/hierarcy/all'])
    })
   }
    this.hierarcyService.saveHierarcy(data).subscribe(res => {
      this.notification.success('Successfully', 'You have successfully save hierarchy!')
      this.hierarcyForm.reset()
      this.trees.removeAll()
      this.tree.removeAll()
    });
  }  
  getChildren(object, children) {
    _.each(children, (node) => {
      const temp = {
        text: node.text
      };
      if (node.children) {
        const tempObject = temp['children'] = [];
        this.getChildren(tempObject, node.children);
      }
      object.push(temp);
    })
  }
}
