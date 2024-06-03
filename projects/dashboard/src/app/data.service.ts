import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../../src/environments/environment';
import * as Reducers from './store/reducers'
@Injectable({
  providedIn: 'root'
})
export class DataService {
    token:any = localStorage.getItem('jwtToken')
    user:any 
    username:any=localStorage.getItem('login')
    plant:any
    currentLogin:any=localStorage.getItem('currentlogin')
  isLogin = false;
  httpOptions = {
    headers: new HttpHeaders()
    .set('content-type', 'application/json')
    .set('Access-Control-Allow-Origin', '*')
    .set('Access-Control-Allow-Methods', 'GET,POST,OPTIONS,DELETE,PUT')
    .set('Authorization', 'Bearer ' + this.token),
  }
  httpOptions2 = {
    headers: new HttpHeaders()
    .set('content-type', 'application/json')
    .set('Access-Control-Allow-Origin', '*')
    .set('Access-Control-Allow-Methods', 'GET,POST,OPTIONS,DELETE,PUT')
  }
    httpOptions1: any = {
    headers: new HttpHeaders()
      //  .set('content-type', 'application/json')
      .set('Access-Control-Allow-Origin', '*')
      .set('Access-Control-Allow-Methods', 'GET,POST,OPTIONS,DELETE,PUT')
      .set('Authorization', 'Bearer ' + this.token),
    responseType: 'arraybuffer',

  }
  constructor(private dataService : HttpClient,private store: Store<any>,) {
    this.store.pipe(select(Reducers.getUser)).subscribe(state => {
      this.plant="";
      this.plant =state.plant == ''? localStorage.getItem('plant'):state.plant
      this.user = state.customer == ''? localStorage.getItem('customer'):state.customer 
      // this.currentLogin=state.currentlogin
  
    })
  }

  getProfileByToken(): Observable<any> {
    return this.dataService.get<any>(`${environment.baseUrl}/api/me`, this.httpOptions)
      .pipe(map(res => res))
  }
  login(data:any): Observable<any> {
    return this.dataService.post<any>(`${environment.baseUrl}/api/authenticate`, data, this.httpOptions2)
      .pipe(map(res => res))
  } 

  logout(): Observable<any> {
    return this.dataService.get<any>(`${environment.baseUrl}/api/logout/${this.currentLogin}/${this.username}`, this.httpOptions2)
      .pipe(map(res => res))
  } 
   getPlantsData(){ 
    return this.dataService.get(`${environment.baseUrl}/api/ease-i/metric/chart/heatmap?user=${this.user}`)
    .pipe(map(res => res))
   }
   getPlantsData1(plants:any,startDate:any,endDate:any ){
    return this.dataService.get(`${environment.baseUrl}/api/ease-i/metric/chart/heatmap?user=${this.user}&plant=${plants}&startdate=${startDate}&enddate=${endDate}`)
    .pipe(map(res => res))
  } 
   getuptimedata1(plants:any,startDate:any,endDate:any){
      return this.dataService.get(`${environment.baseUrl}/api/ease-i/metric/chart/uptime?user=${this.user}&plant=${plants}&startdate=${startDate}&enddate=${endDate}`)
      .pipe(map(res => res))
    }
   getsoilingloss1(plants:any,startDate:any,endDate:any){
      return this.dataService.get(`${environment.baseUrl}/api/ease-i/metric/chart/soil-loss?user=${this.user}&plant=${plants}&startdate=${startDate}&enddate=${endDate}`) .pipe(map(res => res))
  }  
  getBotStatus1(plants:any,startDate:any,endDate:any){
      return this.dataService.get(`${environment.baseUrl}/api/ease-i/metric/chart/bot-status?user=${this.user}&plant=${plants}&startdate=${startDate}&enddate=${endDate}`) .pipe(map(res => res))
  } 
  getBotStatus(plants:any,startDate:any,endDate:any){
    return this.dataService.get(`${environment.baseUrl}/api/ease-i/metric/reportbotstatus?user=${this.user}&plant=${plants}&startdate=${startDate}&enddate=${endDate}`) .pipe(map(res => res))
} 
  getSummary(){
      return this.dataService.get(`${environment.baseUrl}/api/ease-i/metric/summary?user=${this.user}`);
  }
  getSummary1(plants:any,startDate:any,endDate:any){
      return this.dataService.get(`${environment.baseUrl}/api/ease-i/metric/summary?user=${this.user}&plant=${plants}&startdate=${startDate}&enddate=${endDate}`) .pipe(map(res => res))
  } 
  getAPIData1(){
    return this.dataService.get(`${environment.baseUrl}/api/ease-i/master/hierachy?user=${this.user}&plant=${this.plant}`,this.httpOptions)
      .pipe(map(res => res))
  } 

  getWorldData1(plants:any,startDate:any,endDate:any){
      return this.dataService.get(`${environment.baseUrl}/api/ease-i/metric/chart/worldmap?user=${this.user}&plant=${plants}&startdate=${startDate}&enddate=${endDate}`) .pipe(map(res => res))
  }
  getReportData(){
      return this.dataService.get(`${environment.baseUrl}/api/ease-i/metric/chart/report?user=${this.user}`) .pipe(map(res => res))
  }
  getReportData1(plants:any,startDate:any,endDate:any){
      return this.dataService.get(`${environment.baseUrl}/api/ease-i/metric/chart/report?user=${this.user}&plant=${plants}&startdate=${startDate}&enddate=${endDate}`) .pipe(map(res => res))
  }
   getCleaningSchedule1(plants:any,startDate:any,endDate:any){
      return this.dataService.get(`${environment.baseUrl}/api/ease-i/metric/cleaning_schedule?user=${this.user}&plant=${plants}&startdate=${startDate}&enddate=${endDate}`) .pipe(map(res => res))
  }
  getKNUStatus(){
      return this.dataService.get(`${environment.baseUrl}/api/ease-i/metric/KnuStatus?user=${this.user}`) .pipe(map(res => res))
  }
  getKNUStatus1(plants:any,startDate:any,endDate:any){
      return this.dataService.get(`${environment.baseUrl}/api/ease-i/metric/KnuStatus?user=${this.user}&plant=${plants}&startdate=${startDate}&enddate=${endDate}`) .pipe(map(res => res))  
    }
  saveHelp(data:any): Observable<any> {
    return this.dataService.post<any>(`${environment.baseUrl}/api/help`, data, this.httpOptions)
      .pipe(map(res => res))
  }

  generateFile(data: any): Observable<any> {
    return this.dataService.post<any>(`${environment.baseUrl}/api/files`, data, this.httpOptions1)
      .pipe(map(res => res))
  }
  generateCSV(data: any): Observable<any> {
    // data=encodeURIComponent(data);
    return this.dataService.post<any>(`${environment.baseUrl}/api/file/csv`,data, this.httpOptions1)
      .pipe(map(res => res))
  }
  generateExcle(data: any): Observable<any> {
    // data=encodeURIComponent(data);
    return this.dataService.post<any>(`${environment.baseUrl}/api/file/excle`,data, this.httpOptions1)
      .pipe(map(res => res))
  }
  generatePdf(data: any): Observable<any> {
    return this.dataService.post<any>(`${environment.baseUrl}/api/alarm`, data, this.httpOptions1)
      .pipe(map(res => res))
  }
  getcatoryName(data: any): Observable<any> {
    return this.dataService.get<any>(`${environment.baseUrl}/api/help/category/${data}`, this.httpOptions)
      .pipe(map(res => res))
  }
  getSubCatoryName(data: any): Observable<any> {
    return this.dataService.get<any>(`${environment.baseUrl}/api/help/subcategory/${data}`, this.httpOptions)
      .pipe(map(res => res))
  }
  }

