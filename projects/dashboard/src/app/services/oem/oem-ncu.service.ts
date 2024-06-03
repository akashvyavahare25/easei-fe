import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store,select } from '@ngrx/store';
import { Observable } from 'rxjs';
import {map} from 'rxjs/operators'
import { environment } from '../../../../../../src/environments/environment';
import * as Reducers from '../../store/reducers'
@Injectable({
  providedIn: 'root'
})
export class OemNcuService {
  token :any = localStorage.getItem('jwtToken')
  user :any=localStorage.getItem('user')
  plant :any
  // plant1:any
  plantnewid:any=[]
  httpOptions = {
      headers: new HttpHeaders()
        .set('content-type', 'application/json')
        .set('Access-Control-Allow-Origin', '*')
        .set('Access-Control-Allow-Methods', 'GET,POST,OPTIONS,DELETE,PUT')
        .set('Authorization', 'Bearer ' + this.token),
    }
  constructor(private dataService :HttpClient, private store: Store<any>,) {
    this.store.pipe(select(Reducers.getUser)).subscribe(state => {
      this.plant="";
      this.plant = state.plant == ''? localStorage.getItem('plant'):state.plant
      this.user = state.customer == ''? localStorage.getItem('customer'):state.customer

      this.plantnewid =  this.plant.split(',')
      this.plant  = this.plantnewid[0] 
    })/* ) { 
    this.plantnewid = localStorage.getItem('plant')?.split(',')
     this.plant = this.plantnewid[0] 
     console.log(this.plant)
     console.log(this.plantnewid[0] ) */
  }
  
  getncuSummary(knu:any):Observable<any>{
    let url =`${environment.baseUrl}/api/ease-i/metric/ncusummary?user=`+this.user+`&plant=`+this.plant
    if(knu){
      url=url+`&knu=`+knu
    }
    return this.dataService.get(url)
    .pipe(map(res => res))
   }

   getncuAlarmDetails(params:any):Observable<any>{
    return this.dataService.get(`${environment.baseUrl}/api/ease-i/metric/chart/ncualarmdetails?user=`+this.user+`&plant=`+this.plant+``+params)
    .pipe(map(res => res))
  }

  getncuNotificationDetails(ncuid:any):Observable<any>{
    return this.dataService.get(`${environment.baseUrl}/api/ease-i/metric/chart/ncunotificationdetails?user=`+this.user+`&plant=`+this.plant+`&knu=`+ncuid)
    .pipe(map(res => res))
  }
  getbcuDetailsByNcu(ncuid:any):Observable<any>{
    return this.dataService.get(`${environment.baseUrl}/api/ease-i/metric/oembcustatus?user=`+this.user+`&plant=`+this.plant+``+ncuid)
    .pipe(map(res => res))
  }
} 