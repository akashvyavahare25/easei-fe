import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms'
import { Validators } from '@angular/forms'
import { ScreenService } from '../../../../../src/app/services/screen.service'
import { AppMasterService } from '../../../../../src/app/services/app-master.service'
import * as _ from 'lodash'
import { ActivatedRoute, Router } from '@angular/router'
import { APIService } from '../../../../../src/app/services/api.service';
import {UploadService} from '../../../../../src/app/services/upload.service'
import { NzNotificationService } from 'ng-zorro-antd'

@Component({
  selector: 'app-create-upload',
  templateUrl: './create-upload.component.html',
  styleUrls: ['./create-upload.component.scss']
})
export class CreateUploadComponent implements OnInit {
  tableData:any
  uploadForm:any
  paramaterId:any
  screensData: any = []
  listOfApplicationMaste: any = []
  screenArray:any=[]
  draggableData: any = [];  
  draggableList: any = [];
  schemaConfig:boolean=false
  visibleGrid:boolean=false
  visibleModal:boolean=false
  showTable:boolean=false
  value:any
  paramData:any
  arraydata:any=[]
  //table:boolean=false
  selectedFile: any = null
  isFileUplaodModalVisible: boolean = false
  csvUploadError: any = ""
  formatType: any = ""
  instance: boolean = false
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private screenService: ScreenService,
    private appMasterService: AppMasterService,
    private apiService: APIService,
    private notification: NzNotificationService,
    private uploadService:UploadService
  ) {
    this.route.params.subscribe(params => {
    this.paramaterId = params['id']
  }) }

  ngOnInit(): void {
    this.uploadForm = this.formBuilder.group({
      name: ['', Validators.required],
      application: ['', Validators.required],
      screens: [, Validators.required],
      type:['',]
    })
    this.screenService.getAllScreenData().subscribe(res => {
      this.screensData = res;
      this.appMasterService.getAllAppMasterData().subscribe(res => {
        this.listOfApplicationMaste = res
        if (this.paramaterId) {
          
          this.uploadService.getUploads().subscribe(res=>{
            this.paramData=_.filter(res, { _id: this.paramaterId })
            const app = _.filter(this.listOfApplicationMaste, { name: this.paramData[0].appName })
            const scrData=_.filter(this.screensData, { name: this.paramData[0].screenName })
            
            this.uploadForm.patchValue({
              name: this.paramData[0].name,
              application: app[0],
              screens: scrData[0],
              type: this.paramData[0].queryType,
            })
            this.draggableList=this.paramData[0].uploadParameter
            this.tableData=this.paramData[0].config            
            //this.screenArray = _.cloneDeep(_.filter(this.screensData, { 'application_master': item._id}))
          })
        }
      })
    })
  }
  selectScreens(item) {
    this.screenArray=[]
    if (item) {
      this.screenArray = _.cloneDeep(_.filter(this.screensData, { 'application_master': item._id}))
    }
  }
copyAll(){
  this.draggableList=this.draggableList.concat(this.draggableData);
  this.draggableData=[];
}
removeAll(){
  this.draggableData=this.draggableData.concat(this.draggableList)
  this.draggableList=[]
}
addScreenConfig(value)  {  
  this.showTable=false
  if (value && this.paramData && this.paramData[0].screenName===value.name) { 
    _.each(this.paramData[0].uploadParameter,(parameter)=>{
      this.arraydata.push(parameter.components[0].key)
    })
    _.each(value.configuration[0].columns, (sche) => {
      if( _.includes(this.arraydata, sche.components[0].key)){         
      }
      else{          
        if(sche.components[0].type==='datagrid'){
          sche.components[0].step=0
          _.each(sche.components[0].components, (val) => {
              if(val.components){          
              val.step=0
          }
        })
      }
        this.draggableData.push(sche)
      }
      // if(sche.components[0].type==='datagrid'){
      //   sche.components[0].step=0
      //   _.each(sche.components[0].components, (val) => {

      //   })
 // }
})          
    
  }
  else if(value){
    this.draggableData = [];     
    this.draggableList = [];     
    this.tableData = [];
    _.each(value.configuration[0].columns, (sche) => {
      if(sche.components[0].type==='datagrid'){
        sche.components[0].step=0
        _.each(sche.components[0].components, (val) => {
            if(val.components){          
            val.step=0
        }
      })
    }
    })
   
    this.draggableData=_.cloneDeep(value.configuration[0].columns)
   // console.log("copare",this.draggableData.filter(e => !this.draggableList.find(e)))
    
    this.schemaConfig = true             
  
}
}

  showGridModel(value): void {
    this.showTable=false
    this.visibleModal=true;
    this.value=value
  }
  cancelGrid(){
    this.visibleModal=false
  }
  okGrid(){
    this.visibleModal=false
  }
  removeItem(item: any, list: any[]): void {
    list.splice(list.indexOf(item), 1);
    this.showTable=false
  }
  removeParameter(item, index) {    
    this.draggableList.splice(index, 1);   
    this.draggableData.push(item);
    this.showTable=false
  }

  addTypeInEditor(type) {
    if (type === "By columns") {
      this.formatType = 'By columns'
    }
    if (type === "As Multiple Rows") {
      this.formatType = 'As Multiple Rows'
    }
    if (type === "By Rows-Columns") {
      this.formatType = 'By Rows-Columns'
    }
  }

  csvPreview(){
    this.showTable=true

    if(this.formatType == 'As Multiple Rows'){
    const data=[]
    _.each(this.draggableList, (component) => {
      if(component.components[0].components){
        const data2=component.components[0].key
        if(component.components[0].step>0){
          for (let i = 0; i < 1; i++){ //component.components[0].step
            _.each(component.components[0].components, (val) => {
                if(val.components){
                  if(val.step>0){
                    for (let j = 0; j < 1; j++){
                    _.each(val.components, (nested) => {
                    data.push(data2+'.'+i+'.'+val.key+'.'+j+'.'+nested.key)
                    })
                  }
                  }
                  else{
                    _.each(val.components, (nested) => {
                    data.push(data2+'.'+'slabC'+'.'+i+'.'+val.key+'.'+val.step+'.'+nested.key)
                    })
                  }
              }
              else{
                if(val.key == 'from' || val.key == 'to'){
                data.push(data2+'.'+'slabC'+'.'+val.key) 
                }else {
                  data.push(data2+'.'+val.key)
                }
              }        
            })
          }
        }
        else{
          _.each(component.components[0].components, (val) => { 
            if(val.components){
              if(val.step>0){               
                  for (let j = 0; j < 2; j++){
                  _.each(val.components, (nested) => {
                  data.push(data2+'.'+ 'slabC'+'.'+0+'.'+val.key+'.'+j+'.'+nested.key)
                })
              }
            }
            else{
              _.each(val.components, (nested,index) => {
              data.push(data2+'.'+val.step+'.'+val.key+'.'+component.components[0].step+'.'+nested.key)
            }) 
          }
          }
          else{
            if(val.key == 'from' || val.key == 'to'){
              data.push(data2+'.'+'slabC'+'.'+val.key) 
              }else {
                data.push(data2+'.'+val.key)
              }
            // data.push(data2+'.'+component.components[0].step+'.'+val.key) 
          }       
          })
        }           
    }
    else{ 
      data.push(component.components[0].key)
    }
    this.visibleGrid=true
    this.tableData=data
    })

  } else if(this.formatType == 'By columns'){
  // editing below format

  const data=[]
  _.each(this.draggableList, (component) => {
    if(component.components[0].components){
      const data2=component.components[0].key
      if(component.components[0].step>0){
        for (let i = 0; i < component.components[0].step; i++){
          _.each(component.components[0].components, (val) => {
              if(val.components){
                if(val.step>0){
                  for (let j = 0; j < val.step; j++){
                  _.each(val.components, (nested) => {
                  data.push(data2+'.'+i+'.'+val.key+'.'+j+'.'+nested.key)
                  })
                }
                }
                else{
                  _.each(val.components, (nested) => {
                  data.push(data2+'.'+i+'.'+val.key+'.'+val.step+'.'+nested.key)
                  })
                }
            }
            else{
              data.push(data2+'.'+i+'.'+val.key) 
            }        
          })
        }
      }
      else{
        _.each(component.components[0].components, (val) => {  
          if(val.components){
            if(val.step>0){               
                for (let j = 0; j < val.step; j++){
                _.each(val.components, (nested) => {
                data.push(data2+'.'+0+'.'+val.key+'.'+j+'.'+nested.key)
              })
            }
          }
          else{
            _.each(val.components, (nested,index) => {
            data.push(data2+'.'+val.step+'.'+val.key+'.'+component.components[0].step+'.'+nested.key)
          }) 
        }
        }
        else{
          data.push(data2+'.'+component.components[0].step+'.'+val.key)  
        }       
        })
      }           
  }
  else{
    data.push(component.components[0].key)
  }
  this.visibleGrid=true
  this.tableData=data
  })

  }else if(this.formatType == 'By Rows-Columns'){
    const data=[]
    _.each(this.draggableList, (component) => {
      if(component.components[0].components){
        const data2=component.components[0].key
        if(component.components[0].step>0){
          for (let i = 0; i < component.components[0].step; i++){
            _.each(component.components[0].components, (val) => {
                if(val.components){
                  console.log('val.step', val.step)
                  if(val.step>0){
                    for (let j = 0; j < val.step; j++){
                    _.each(val.components, (nested) => {
                    data.push(data2+'.'+i+'.'+val.key+'.'+j+'.'+nested.key)
                    })
                  }
                  }
                  else{
                    _.each(val.components, (nested) => {
                    data.push(data2+'.'+i+'.'+val.key+'.'+val.step+'.'+nested.key)
                    })
                  }
              }
              else{
                console.log('i', i)
                console.log('5')
                if(val.key == 'from' || val.key == 'to'){
                  data.push(data2+'.'+'slabC'+'.'+i+'.'+val.key) 
                  }else {
                    if(i == 0 && val.key == 'price'){

                      data.push(data2+'.'+val.key)
                    }
                  }
                // data.push(data2+'.'+i+'.'+val.key) 
              }        
            })
          }
        }
        else{
          
          _.each(component.components[0].components, (val) => {  
            if(val.components){
              if(val.step>0){               
                  for (let j = 0; j < val.step; j++){
                  _.each(val.components, (nested) => {
                  data.push(data2+'.'+0+'.'+val.key+'.'+j+'.'+nested.key)
                })
              }
            }
            else{
              _.each(val.components, (nested,index) => {
              data.push(data2+'.'+val.step+'.'+val.key+'.'+component.components[0].step+'.'+nested.key)
            }) 
          }
          }
          else{
            console.log('bkhjk')
            if(val.key == 'from' || val.key == 'to'){
              data.push(data2+'.'+'slabC'+'.'+component.components[0].step+'.'+val.key) 
              }else {
                if(component.components[0].step == 0 && val.key == 'price'){

                  data.push(data2+'.'+val.key)
                }
              }
            // data.push(data2+'.'+component.components[0].step+'.'+val.key) 
             
          }       
          })
        }           
    }
    else{
      data.push(component.components[0].key)
    }
    this.visibleGrid=true
    this.tableData=data
    })
   }
  }

  submitForm(){
    if(this.showTable){
      const data = {
        name: this.uploadForm.value.name,
        appName: this.uploadForm.value.application.name,
        screenName: this.uploadForm.value.screens.name,      
        config:this.tableData,
        uploadParameter:this.draggableList,           
      }
    //let object = Object.assign(this.tableData.map(v => ({ [v]: v })));
      if(this.paramaterId){
        data['_id']=this.paramaterId
        this.uploadService.updateUpload(data).subscribe(res=>{
          this.notification.success('Successfully', 'You have successfully update upload!')
          setTimeout(() => { this.router.navigate(['/upload/all']) }, 700)
        })
      }
      else{
        this.uploadService.saveUpload(data).subscribe(res => {
          this.notification.success('Successfully', 'You have successfully save upload!')
          this.uploadForm.reset()
          this.schemaConfig = false
          this.draggableData=[]
          this.draggableList=[]
          this.tableData=[]
        })
      }
    }
    else{
      this.notification.info('Info', 'Please check template before submit')
    }
  }
}
