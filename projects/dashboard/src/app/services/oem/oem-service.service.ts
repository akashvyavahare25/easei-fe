import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../../../../src/environments/environment';
import * as Reducers from '../../store/reducers'

@Injectable({
  providedIn: 'root'
})
export class OemService {
  user:any 
  token :any = localStorage.getItem('jwtToken')
  plant :any
  plantnewid:any
  plant1:any
  httpOptions = {
      headers: new HttpHeaders()
        .set('content-type', 'application/json')
        .set('Access-Control-Allow-Origin', '*')
        .set('Access-Control-Allow-Methods', 'GET,POST,OPTIONS,DELETE,PUT')
        .set('Authorization', 'Bearer ' + this.token),
    }
  constructor(private dataService : HttpClient,private store: Store<any>,) {
    this.store.pipe(select(Reducers.getUser)).subscribe(state => {
      this.plant="";
      this.plant = state.plant == ''? localStorage.getItem('plant'):state.plant
      this.plant1 = state.plant == ''? localStorage.getItem('plant'):state.plant
      this.user = state.customer == ''? localStorage.getItem('customer'):state.customer 
      this.plantnewid =  this.plant.split(',')
      this.plant  = this.plantnewid[0] 
    })
   }

  getncuSummary():Observable<any>{
   return this.dataService.get(`${environment.baseUrl}/api/ease-i/metric/ncusummary?user=${this.user}`)
   .pipe(map(res => res))
  }
  getPlantHierachyData(user :any):Observable<any>{
    return this.dataService.get(`${environment.baseUrl}/api/ease-i/master/plantHierachy?user=${this.user}&plant=${this.plant1}`)
    .pipe(map(res => res))
}
  getUptime(date:any):Observable<any>{
    return this.dataService.get(`${environment.baseUrl}/api/ease-i/metric/chart/uptime?user=${this.user}&plant=${this.plant}`+date)
    .pipe(map(res => res))
  }

  getOemBotReport():Observable<any>{
    return this.dataService.get(`${environment.baseUrl}/api/ease-i/metric/chart/oembotreport?user=${this.user}&plant=${this.plant}`)
    .pipe(map(res => res))
  }
  
  getNcuAlarmSummary():Observable<any>{
    return this.dataService.get(`${environment.baseUrl}/api/ease-i/metric/chart/ncualarmsummary?user=${this.user}&plant=${this.plant}`)
    .pipe(map(res => res))
  }
  getBcuAlarmSummary():Observable<any>{
    return this.dataService.get(`${environment.baseUrl}/api/ease-i/metric/chart/bcualarmsummary?user=${this.user}&plant=${this.plant}`)
    .pipe(map(res => res))
  }

  getAbortedBotStatus():Observable<any>{
    return this.dataService.get(`${environment.baseUrl}/api/ease-i/metric/chart/abortedbcustatus?user=${this.user}&plant=${this.plant}`)
    .pipe(map(res => res))
  }
  getKnuStatus():Observable<any>{
    return this.dataService.get(`${environment.baseUrl}/api/ease-i/metric/KnuStatus?user=${this.user}&plant=${this.plant}`)
    .pipe(map(res => res))
  }/* &knu=`+ncu+` ncu:any,abortRequestby:any,`&abortrequestby=`+abortRequestby+*/
 getApplyAbort(bcu:any,requestPerson:any,adminPassword:any,abortReason:any,resumeDate:any):Observable<any>{
    return  this.dataService.get(`${environment.baseUrl}/api/ease-i/abortbot?user=${this.user}&plant=${this.plant}&bcu=`+bcu+`&action=stop&requestperson=`+requestPerson+`&adminpassword=`+adminPassword+`&resumedate=`+resumeDate+`&abortreason=`+abortReason)
    .pipe(map(res => res))
  }/* ncu:any, &knu=${ncu}*/
  getDemoCleaningstartstop(bcu:any,action:any):Observable<any>{
    return this.dataService.get(`${environment.baseUrl}/api/ease-i/democleaningstartstop?user=${this.user}&plant=${this.plant}&bcu=${bcu}&action=${action}`)
    .pipe(map(res=> res))
  }
}
