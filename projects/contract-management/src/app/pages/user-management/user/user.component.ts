import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { APIService } from '../../../../../src/app/services/api.service'
import { NzNotificationService } from 'ng-zorro-antd'
import { CustomerService } from '../../../../../src/app/services/customer.service'
import { select, Store } from '@ngrx/store'
import * as Reducers from '../../../../../src/app/store/reducers'
import * as _ from 'lodash'
import { RoleService } from '../../../../../src/app/services/role.service'
import { PlantServiceService } from 'projects/dashboard/src/app/services/plants/plant-service.service'
// var require : any
// var jsonata = require('jsonata');
import * as jsonata from 'jsonata'
import { element } from 'protractor'


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  validateForm1: FormGroup
  listOfOption: any = []
  userListOfOption: string[] = ['Portfolio', 'OEM', 'Plant']
  plantList: any = []
  ownerList: any = []
  editPassword: boolean = false
  isUpdate: boolean = false
  companyList: any;
  userData: any;
  isAdmin: boolean = false
  authority: any
  Visible: boolean = false
  VisibleRoles:boolean=false
  authorityData: any
  userTypeData: any
  role: any
  flag: boolean = false
  routerUrl: any
  listOfRoles: any
  usertypeclient: any = []
  isDisabled: boolean
  plantsIdName: any = []
  plantid: any = []
  plantName: any = []
  ownerName: any
  customerName: any
  OwnerdataList: any = []
  RoleList:any
  roleClinet:any=[]
  customerVisible:boolean=false
  customerdisabled:boolean=false
  ownerVisible:boolean=false
  customerList: any = []
  constructor(
    private fb: FormBuilder,
    private apiService: APIService,
    private route: ActivatedRoute,
    private notification: NzNotificationService,
    private router: Router,
    private customerService: CustomerService,
    private roleService: RoleService,
    private service: PlantServiceService,
    private store: Store<any>,
  ) {
    this.routerUrl = router.url;
    if (this.routerUrl.includes("/drone/user/view/")) {
      this.flag = true;
    }
    this.role = localStorage.getItem('role')
    this.store.pipe(select(Reducers.getUser)).subscribe(state => {
      this.userData = state;
      this.role = localStorage.getItem('role') ? localStorage.getItem('role') : state.role
      this.ownerName = localStorage.getItem('user') ? localStorage.getItem('user') : state.name
      this.customerName = localStorage.getItem('customer') ? localStorage.getItem('customer') : state.customer
    });
  }

  ngOnInit(): void {
    this.validateForm1 = this.fb.group({
      firstName: [null, [Validators.required]],
      lastName: [null, [Validators.required]],
      password: [null, [Validators.required, Validators.pattern('(?=.*[0-9])(?=.*[a-zA-Z ])(?=.*[$@$!%*?&.]).{8,}')]],
      email: [null, [Validators.email, Validators.required]],
      roles: [null, [Validators.required]],
      userRoles: [null, [Validators.required]],
      ownerName: [null, [Validators.required]],
      // customerGroup:[null, [Validators.required]],
      customerName:[null, [Validators.required]],
      plants: [null, [Validators.required]],
    })
    this.authority = []
    // this.apiService.getRoles().subscribe(res => {
    //   this.plantList = res;
    // })
    if(this.role == 'admin'){
      this.isAdmin == true;
      
    }
    this.apiService.getOwnerName().subscribe(res => {
      this.OwnerdataList = res
      if(this.role == 'admin') {
        
        res.data.forEach(element => {
          if (element.toLowerCase() == this.ownerName.toLowerCase()) {
            this.ownerList.push(element)
            this.validateForm1.controls['ownerName'].setValue(element)
          }
        })
        console.log('res.cutomer',res.Customer_List[0])
        this.validateForm1.controls['customerName'].setValue(this.customerName)
      } else if (this.role == 'superadmin-it') {
        this.ownerVisible=true
        this.ownerList.push("Hoonartek")
      } else {
        this.ownerVisible=true
        this.ownerList = res.data;
        this.customerList=res.Customer_List
      }
    })

    this.apiService.getAuthority().subscribe(res => {
      this.userTypeData = res
      this.authorityData = res
      this.listOfRoles = _.filter(res, (o) => {
        if (o.name.toLowerCase() != 'oem' && o.name.toLowerCase() != 'plant' && o.name.toLowerCase() != 'portfolio') {
          return o
        }
      })
     
      if (this.role == 'admin' && !this.route.snapshot.params['id']) {
        this.listOfOption = _.filter(res, (o) => {
          if (o.name.toLowerCase() != 'oem' && o.name.toLowerCase() != 'plant' && o.name.toLowerCase() != 'portfolio' && o.name.toLowerCase() != 'super user' && o.name.toLowerCase() != 'superadmin-it') {
            return o
          }
        })
      } else if (this.role == 'super user' && !this.route.snapshot.params['id']) {
        this.listOfOption = _.filter(res, (o) => {
          if (o.name.toLowerCase() != 'superadmin-it' && o.name.toLowerCase() != 'oem' && o.name.toLowerCase() != 'plant' && o.name.toLowerCase() != 'portfolio' && o.name.toLowerCase() != 'user') {
            return o
          }
        })
      } else if (this.role == 'superadmin-it' && !this.route.snapshot.params['id']) {
        this.listOfOption = _.filter(res, (o) => {
          if (o.name.toLowerCase() != 'admin' && o.name.toLowerCase() != 'oem' && o.name.toLowerCase() != 'plant' && o.name.toLowerCase() != 'portfolio' && o.name.toLowerCase() != 'user') {
            return o
          }
        })
      }else if(this.role == 'admin' && this.route.snapshot.params['id']) {
        this.listOfOption = _.filter(res, (o) => {
          if (o.name.toLowerCase() != 'oem' && o.name.toLowerCase() != 'plant' && o.name.toLowerCase() != 'portfolio' && o.name.toLowerCase() != 'super user' && o.name.toLowerCase() != 'superadmin-it') {
            return o
          }
        })
      }else if(this.role == 'super user' && this.route.snapshot.params['id']){
        this.listOfOption = _.filter(res, (o) => {
          if (o.name.toLowerCase() != 'superadmin-it' && o.name.toLowerCase() != 'oem' && o.name.toLowerCase() != 'plant' && o.name.toLowerCase() != 'portfolio' && o.name.toLowerCase() != 'user') {
            return o
          }
        })
      }else if(this.role == 'superadmin-it' && this.route.snapshot.params['id']) {
        this.listOfOption = _.filter(res, (o) => {
          if (o.name.toLowerCase() != 'admin' && o.name.toLowerCase() != 'oem' && o.name.toLowerCase() != 'plant' && o.name.toLowerCase() != 'portfolio' && o.name.toLowerCase() != 'user') {
            return o
          }
        })
      }
      else {
        this.listOfOption = _.filter(res, (o) => {
          if (o.name.toLowerCase() != 'oem' && o.name.toLowerCase() != 'plant' && o.name.toLowerCase() != 'portfolio') {
            return o
          }
        })
      }

      this.authority = _.filter(res, (o) => {
        if (o.name.toLowerCase() != 'admin' && o.name.toLowerCase() != 'super user' && o.name.toLowerCase() != 'superadmin-it' && o.name.toLowerCase() != 'user') {
          return o
        }
      })

    })
 

     setTimeout(() => {
      if (this.route.snapshot.params['id']) {

        this.apiService.getUser(this.route.snapshot.params['id']).subscribe(res => {
          if (this.role == "admin" && res.roleName[0].toLowerCase() == "super user") {
            this.flag = true
            this.listOfOption= _.filter(this.listOfRoles ,(o)=>{
              if (o.name.toLowerCase() != 'superadmin-it' && o.name.toLowerCase() != 'oem' && o.name.toLowerCase() != 'plant' && o.name.toLowerCase() != 'portfolio' && o.name.toLowerCase() != 'user') {
                return o
              }
            })
          }else if (this.role == "super user" && res.roleName[0].toLowerCase() != "super user" &&  res.roleName[0].toLowerCase() != "superadmin-it" &&  res.roleName[0].toLowerCase() != "admin") {
      
            this.listOfOption= _.filter(this.listOfRoles ,(o)=>{
              if (o.name.toLowerCase() != 'superadmin-it' && o.name.toLowerCase() != 'oem' && o.name.toLowerCase() != 'plant' && o.name.toLowerCase() != 'portfolio' ) {
                return o
              }
            })
          }
    
          this.validateForm1.controls['firstName'].setValue(res.firstName)
          this.validateForm1.controls['lastName'].setValue(res.lastName)
          let role: any
          let roleName: any = []
          let plant: any = []
          let name: any = []
          if(res.roleName[0].toLowerCase() == "super user" || res.roleName[0].toLowerCase() == "superadmin-it" || res.roleName[0].toLowerCase() == "admin"){
            this.roleClinet=[]
             this.roleClinet.push("XYZ")
          }else{
          setTimeout(() => {
            let plantdata: any
            plantdata = _.filter(this.plantsIdName, (o) => {
              for (let i = 0; i < res.plantName.length; i++) {
                if (res.plantName[i] == o.name) {
                  plant.push(o.uuid)
                  name.push(o.name)
                  return true
                }
              }
            })
            this.validateForm1.controls['plants'].setValue(plantdata)
            this.plantName = name
            this.plantid = plant
            this.roleClinet=plant
          }, 3000);
          } 
          _.filter(this.listOfRoles, (o) => {
            if (res.roleName[0] == o.name) {
              role = o.roleId
              return true
            }
            if (res.roleName[0].toLowerCase() == 'oem' || res.roleName[0].toLowerCase() == 'portfolio' || res.roleName[0].toLowerCase() == 'plant') {
              if (o.name.toLowerCase() == 'user') {
                role = o.roleId
              }
            }
          })[0]
          _.filter(this.userTypeData, (o) => {
            for (let i = 0; i < res.roleName.length; i++) {
              if (res.roleName[i] == o.name) {
                roleName.push(o.roleId)
                return true
              }
            }
          })
  
          this.validateForm1.controls['roles'].setValue(role)
          this.validateForm1.controls['email'].setValue(res.email)
          this.validateForm1.controls['userRoles'].setValue(roleName)
          this.validateForm1.controls['ownerName'].setValue(res.ownername)
          this.validateForm1.controls['customerName'].setValue(res.customername)
          // this.validateForm1.controls['customerGroup'].setValue(res.customergroup)
          this.validateForm1.controls['password'].setValue(res.password)
          this.editPassword = false
          if (this.flag) {
            this.isDisabled = true
            this.validateForm1.controls['email'].disable()
            this.validateForm1.controls['password'].disable()
            this.validateForm1.controls['roles'].disable()
            this.validateForm1.controls['userRoles'].disable()
            this.validateForm1.controls['plants'].disable()
            this.validateForm1.controls['ownerName'].disable()
            this.validateForm1.controls['firstName'].disable()
            this.validateForm1.controls['lastName'].disable()
              this.validateForm1.controls['customerName'].disable()
          // this.validateForm1.controls['customerGroup'].disable()
          }
        })
        // this.validateForm1.controls['password'].setValidators(Validators.nullValidator)
        this.validateForm1.controls['email'].disable()
        this.validateForm1.controls['password'].disable()
        if (this.flag) {
          this.isDisabled = true
          this.validateForm1.controls['email'].disable()
          this.validateForm1.controls['password'].disable()
          this.validateForm1.controls['roles'].disable()
          this.validateForm1.controls['userRoles'].disable()
          this.validateForm1.controls['plants'].disable()
          this.validateForm1.controls['ownerName'].disable()
          this.validateForm1.controls['firstName'].disable()
          this.validateForm1.controls['lastName'].disable()
          this.validateForm1.controls['customerName'].disable()
          // this.validateForm1.controls['customerGroup'].disable()
        }
        this.isUpdate = true
      }
     }, 1000);
   
  }

  editCurrentPassword(ev): void {
    if (ev) {
      this.editPassword = true
      const password = this.validateForm1.get('password');
      password.setValidators([Validators.required, Validators.pattern('(?=.*[0-9])(?=.*[a-zA-Z ])(?=.*[$@$!%*?&.]).{8,}')]);
      password.enable();
    } else {
      this.editPassword = false
      const password = this.validateForm1.get('password');
      password.setValidators(Validators.nullValidator);
      password.disable();
    }
  }
  onSelectRole(event: any) {
    
    let userFilter = _.filter(this.authorityData, (o) => {
      return o.roleId == event
    })
    this.customerVisible=false
    if (userFilter[0].name.toLowerCase() == "user"  ) {
      this.Visible = true
      this.ownerVisible=false
      // if (o.name.toLowerCase() == 'user') {
        this.plantsIdName = []
        this.apiService.getPlants(this.customerName).subscribe(res => {
          this.plantList = res;
          let arrayData: any = jsonata("data[*].countries[*].states[*].plants").evaluate(this.plantList)
          arrayData.forEach(id => {
            this.plantsIdName.push({
              "uuid": id.uuid,
              "name": id.name
            })
          })
        })
      // }
      // this.validateForm1.controls['customerName'].disable()
      this.VisibleRoles=true
    }else if(userFilter[0].name.toLowerCase() == "admin" && this.role == 'admin') {
      this.VisibleRoles=false
      this.ownerVisible=false
      this.Visible=false
     }else if(userFilter[0].name.toLowerCase() == "admin" && this.role == 'super user'){
      this.customerVisible=true
      this.VisibleRoles=false
      this.ownerVisible=true
      this.Visible=false  
     }else {
      this.VisibleRoles=false
      this.Visible = false
    }
    if (userFilter[0].name.toLowerCase() == 'superadmin-it') {
      this.roleClinet=[]
      this.roleClinet.push("XYZ")
      this.ownerList=[]
      this.ownerList.push("Hoonartek")
    }else if(this.role == 'admin') {
      this.ownerList=[]
      this.OwnerdataList.data.forEach(element => {
        if (element.toLowerCase() == this.ownerName.toLowerCase()) {
          this.ownerList.push(element)
        }
      })
    }else {
      this.ownerList = this.OwnerdataList.data;
    }
    if(userFilter[0].name.toLowerCase() == 'super user'){
      this.roleClinet=[]
      this.roleClinet.push("XYZ")
    } 
    if(userFilter[0].name.toLowerCase() == 'admin'){
      this.roleClinet=[]
      this.roleClinet.push("XYZ")
    } 
    console.log('value',this.validateForm1.value)
  }
  getPlantName(event: any) {
    _.filter(this.userTypeData, (o) => {
      if (this.validateForm1.value.roles == o.roleId) {
        // || o.name.toLowerCase() == 'admin'
        if (o.name.toLowerCase() == 'user') {
          this.plantsIdName = []
          this.apiService.getPlants(event).subscribe(res => {
            this.plantList = res;
            let arrayData: any = jsonata("data[*].countries[*].states[*].plants").evaluate(this.plantList)
            arrayData.forEach(id => {
              this.plantsIdName.push({
                "uuid": id.uuid,
                "name": id.name
              })
            })
          })
        }
        

      }
    })

  }
  /*  getPlantName(event:any){
     this.plantsIdName=[]
     this.apiService.getRoles(event).subscribe(res => {
       this.plantList = res;
       let arrayData = jsonata("data[*].countries[*].states[*].plants").evaluate(this.plantList)
       console.log()
       arrayData.forEach(id =>{
         this.plantsIdName.push({
           "uuid":id.uuid,
           "name":id.name
         })
       }) 
     })  
   } */
  selectPlant(event) {
    this.plantName = []
    this.plantid = []
    this.roleClinet=[]
    event.forEach(element => {
      this.plantid.push(element.uuid)
      this.roleClinet.push(element.uuid)
      this.plantName.push(element.name)
    })
  }
  submitForm1(): void {
    for (const i in this.validateForm1.controls) {
      if (this.validateForm1.controls.hasOwnProperty(i)) {
        this.validateForm1.controls[i].markAsDirty()
        this.validateForm1.controls[i].updateValueAndValidity()
      }
    }
    let usertype: any = []
    this.usertypeclient = []
  
    if (this.validateForm1.value.userRoles) {

      for (let i = 0; i < this.validateForm1.value.userRoles.length; i++) {
        let data = _.filter(this.userTypeData, (o) => {
          return o.roleId == this.validateForm1.value.userRoles[i]
        })[0]
        if (data && data != undefined) {
          this.usertypeclient.push(data)
        }
      }

    }
    let userDataType = _.filter(this.userTypeData, (o) => {
      if (this.validateForm1.value.roles == o.roleId) {
        if (o.name.toLowerCase() != 'user') {
           this.usertypeclient=[]
          return o.roleId == this.validateForm1.value.roles
        }
      }
    })[0]
   
    if (userDataType && userDataType != undefined) {
      this.usertypeclient.push(userDataType)
    }
    this.usertypeclient.forEach(element => {
      usertype.push(element.name);
    });


    if (!this.route.snapshot.params['id']) {
      let data: any
      let roledata: any = []
      if(this.validateForm1.value.userRoles == null){
        roledata =[]
        roledata.push(this.validateForm1.value.roles)
      }else{
      roledata=this.validateForm1.value.userRoles
      }
      // if (this.validateForm1.value.userRoles == null && this.validateForm1.value.plants != null) {
       
      //   let id=this.roleClinet
        
      //   data = {
      //     firstName: this.validateForm1.value.firstName,
      //     lastName: this.validateForm1.value.lastName,
      //     password: this.validateForm1.value.password,
      //     email: this.validateForm1.value.email,
      //     login: this.validateForm1.value.email,
      //     plantName: this.plantName,
      //     role: id,
      //     ownername: this.validateForm1.value.ownerName,
      //     authorities: roledata,
      //     userType: usertype
      //   }
   
        data = {
          firstName: this.validateForm1.value.firstName,
          lastName: this.validateForm1.value.lastName,
          password: this.validateForm1.value.password,
          email: this.validateForm1.value.email,
          login: this.validateForm1.value.email,
          role: this.roleClinet,
          plantName: this.plantName,
          ownername: this.validateForm1.value.ownerName,
          customername:this.validateForm1.value.customerName,
          // customergroup:this.validateForm1.value.customerGroup,
          authorities: roledata,
          userType: usertype
        }
        console.log("User",data)
      // data['login']=this.validateForm1.value.email
      // data['authorities']=this.validateForm1.value.userRoles
      // this.validateForm1.controls['isPasswordChange'].setValue(this.editPassword)
       this.apiService.addUser(data).subscribe((res) => {
        this.router.navigate(['/drone/user/list'])
      },
        (error) => {
          this.notification.error('Error', error.error.errorMessage)
        }
      ) 
    }
    if (this.route.snapshot.params['id']) {
      // this.validateForm1.controls['isPasswordChange'].setValue(this.editPassword)
      // const payload= this.validateForm1.value
      let payload: any
      let roledata: any = []
      if(this.validateForm1.value.userRoles == null){
        roledata =[]
        roledata.push(this.validateForm1.value.roles)
      }else{
      roledata=this.validateForm1.value.userRoles
      }
      // if (this.validateForm1.value.userRoles == null && this.validateForm1.value.plants == null) {
      //   let roledata: any = []
      //   // let roleClinet = ["XYZ"]
      //   roledata.push(this.validateForm1.value.roles)
      //   payload = {
      //     firstName: this.validateForm1.value.firstName,
      //     lastName: this.validateForm1.value.lastName,
      //     password: this.validateForm1.getRawValue().password,
      //     email: this.validateForm1.value.email,
      //     plantName: this.plantName,
      //     role: this.roleClinet,
      //     ownername: this.validateForm1.value.ownerName,
      //     authorities: roledata,
      //     userType: usertype
      //   }
      // } else {
        payload = {
          firstName: this.validateForm1.value.firstName,
          lastName: this.validateForm1.value.lastName,
          password: this.validateForm1.getRawValue().password,
          email: this.validateForm1.getRawValue().email,
          role: this.roleClinet,
          plantName: this.plantName,
          ownername: this.validateForm1.value.ownerName,
          customername:this.validateForm1.value.customerName,
          // customergroup:this.validateForm1.value.customerGroup,
          authorities: this.validateForm1.value.userRoles,
          userType: usertype
        }
      // }
      // const payload = {
      //   firstName: this.validateForm1.value.firstName,
      //   lastName: this.validateForm1.value.lastName,
      //   plantName: this.validateForm1.value.plants,
      //   ownername: this.validateForm1.value.ownerName,
      //   // password: this.validateForm1.getRawValue().password,
      //   email: this.validateForm1.getRawValue().email,
      //   // login: this.validateForm1.value.email,
      //   authorities: this.validateForm1.value.userRoles
      // }
      if (!this.editPassword) {
        payload['password'] = ''
      }
      payload['login'] = this.validateForm1.getRawValue().email
      payload['id'] = this.route.snapshot.params['id']
      // payload['authorities'] = this.validateForm1.getRawValue().userRoles
      this.apiService.updateUser(this.editPassword, payload).subscribe((res) => {
        this.notification.success('Update User','User Updated Successfully ')
        this.router.navigate(['/drone/user/list'])
      },
        (error) => {
          if (error.error) {
            this.notification.error('Update User', error.error.message)
          }
        }
      )
     }
  }

  goBack() {
    this.router.navigate(['/drone/user/list'])
  }

}
