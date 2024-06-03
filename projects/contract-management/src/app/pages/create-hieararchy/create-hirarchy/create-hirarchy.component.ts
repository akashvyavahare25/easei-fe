import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd';
declare var require:any;
var InspireTree = require('inspire-tree');
var InspireTreeDOM = require('inspire-tree-dom');
import * as _ from 'lodash'
import { AppMasterService } from '../../../services/app-master.service';
import { APIService } from '../../../services/api.service';
import { Children } from 'preact/compat';
@Component({
  selector: 'app-create-hirarchy',
  templateUrl: './create-hirarchy.component.html',
  styleUrls: ['./create-hirarchy.component.scss']
})
export class CreateHirarchyComponent implements OnInit {  mastersData: any
  hierarcyForm: any
  paramaterId:any
  searchValue:string=""
  trees: any
  tree:any
  root: any = []
  parameterData:any=[]
  nodeArray:any=[]
  columnList:any
  masterAllData:any
  masterName:any
  jsonData:any
  canclevisible:boolean=true
  data:any=["DATA1","DATA2"]
  applicationValue:string=""
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private apiService: APIService,
    private notification: NzNotificationService,
  ) {

    this.route.params.subscribe(params => {
      this.paramaterId = params['id']
    })
  }

  ngOnInit(): void {
    
    this.hierarcyForm = this.formBuilder.group({
      column: [null, Validators.required],
      dataSet: [null, Validators.required],
    })
    
    this.apiService.getAllMasters().subscribe(res => {
      this.mastersData = res
    })
  
    if (this.paramaterId) {
     this.canclevisible=false
      this.apiService.getHierarchyById(this.paramaterId).subscribe(res => {
        
        let data=JSON.parse(res.hierarchy_format)
        this.parameterData=data.treeData
      
        _.each(this.parameterData, (node) => {
          if (node.children) {
            this.nodeArray.push(node.text,node.master,node.masterCol)
            this.traverse(node.children);
          }
          else{
            this.nodeArray.push(node.text,node.master,node.masterCol)
          }
        })        
        const tree1 = new InspireTree({
          data:data.treeData
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
    else{
    //   this.trees.removeAll()
    // this.tree.removeAll()
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
      this.columnList=[]
      this.hierarcyForm.get('column').setValue('');
    
      this.getMasterList(this.hierarcyForm.get('dataSet').value);
    }
  }
  getMasterById(id):any{
    let code:any
    _.each(this.mastersData, (master) => {
      if(master._id==id){
       code=master.code
      }
    });
    return code
  }
  cancle(){
    this.router.navigate(['/drone/create-hierarchy/find'])
    this.trees.removeAll();
    this.tree.removeAll();
    this.hierarcyForm.reset()
     this.ngAfterViewInit();
  }
  getMasterDataName(master:any):any{
    let name
    let keys=Object.keys(master);
    _.each(keys, (key) => {
      if(key.includes("_nm")){
        name=key
      }
    });
   
    return name
  }

  getColumnData(){
    if(this.hierarcyForm.get('column').value){
          const masterData = []   
          let name=this.hierarcyForm.get('column').value
          _.each(this.masterAllData,(o)=>{
          
            const object = {
              text: o[name],
              master:this.masterName,
              masterCol:name
            }
            masterData.push(object);
           
          })    
      
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
    }
  }

  getColoumn(data)
  {
    this.columnList=[]
    this.columnList=Object.keys(data);
    this.columnList= _.filter(this.columnList,(o)=>{
      return o!='eimUUId'
    })
  }

  getMasterList(masterid) {
    let masterName=this.getMasterById(masterid)

     let encodedata =encodeURIComponent("{}")
     this.masterName=masterName
      masterName= masterName+ "?json=" +encodedata;
     
      this.apiService.getMasterDetailList(masterName,"true").subscribe(resp => {
        if (resp && resp.length > 0) {
          this.masterAllData=resp
          this.getColoumn(resp[0])
        }
      })  
  }


  submitForm() {
    const treeData = [];
    var nodes = this.trees.nodes()
   // console.log(nodes[0].children.length)

   if(nodes[0].children[0])
   {
     if(!this.paramaterId)
     {
      this.apiService.getHierarchyByRoot(nodes[0].children[0].text).subscribe(res=>{
        if(res){
 
         this.notification.error('Already Exist', 'Root Already Exist');
        }else{
         _.each(nodes, (node) => {
           const temp = {
             text: node.text,
             master:node.master,
             masterCol:node.masterCol
           };
          
           if (node.children) {
           
             const tempObject = temp['children'] = [];
             this.getChildren(tempObject, node.children);
           }
           treeData.push(temp);
         })
         this.apiService.saveHierarchy({treeData}).subscribe(res=>{
           this.notification.success('Successfully', 'You have successfully save hierarchy!')
           this.router.navigate(['/drone/create-hierarchy/find'])  
           this.hierarcyForm.reset()
             this.tree.removeAll()
           this.ngAfterViewInit()          
         })
        }
       
      });
     }else{
      _.each(nodes, (node) => {
        const temp = {
          text: node.text,
          master:node.master,
          masterCol:node.masterCol
        };
       
        if (node.children) {
        
          const tempObject = temp['children'] = [];
          this.getChildren(tempObject, node.children);
        }
        treeData.push(temp);
      })
      this.apiService.updateHierarchy({treeData},this.paramaterId).subscribe(res=>{
        this.notification.success('Successfully', 'You have successfully save hierarchy!')
        this.router.navigate(['/drone/create-hierarchy/find'])  
          this.hierarcyForm.reset()
          this.tree.removeAll()
        this.ngAfterViewInit()
       
      })
     }
   }   
  }  

  getChildren(object, children) {
    _.each(children, (node) => {
      const temp = {
        text: node.text,
        master:node.master,
        masterCol:node.masterCol
      };
      if (node.children) {
        const tempObject = temp['children'] = [];
        this.getChildren(tempObject, node.children);
      }
      object.push(temp);
    })
  }
}
