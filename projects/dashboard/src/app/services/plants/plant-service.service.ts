import { HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../../../../../../src/environments/environment';
import * as Reducers from '../../store/reducers'

@Injectable({
  providedIn: 'root'
})
export class PlantServiceService {
  isLogin = false;
  user:any
  plant :any 
  token :any = localStorage.getItem('jwtToken')
    httpOptions = {
        headers: new HttpHeaders()
          .set('content-type', 'application/json')
          .set('Access-Control-Allow-Origin', '*')
          .set('Access-Control-Allow-Methods', 'GET,POST,OPTIONS,DELETE,PUT')
          .set('Authorization', 'Bearer ' + this.token),
      }
  constructor(private plantService : HttpClient,private store: Store<any>,) {
    this.store.pipe(select(Reducers.getUser)).subscribe(state => {
      this.plant="";
      this.plant = state.plant == ''? localStorage.getItem('plant'):state.plant
      this.user = state.customer == ''? localStorage.getItem('customer'):state.customer

    })
  }

  getPlantHierachyData():Observable<any>{
      return this.plantService.get(`${environment.baseUrl}/api/ease-i/master/plantHierachy?user=${this.user}&plant=${this.plant}`)
      .pipe(map(res => res))
  }
  getAlaramComponent():Observable<any>{
    return this.plantService.get(`${environment.baseUrl}/api/ease-i/components?user=${this.user}`)
    .pipe(map(res => res))
  }
  // http://10.1.1.59:5115/api/components?user=Htek
  getPlantBotStatus(plants:any,knu:any,status:any,bot:any,startdate:any,enddate:any):Observable<any>{
    return this.plantService.get(`${environment.baseUrl}/api/ease-i/metric/chart/plant_botstatus?user=${this.user}&plant=${plants}&knu=${knu}&bcustatus=${status}&bcu=${bot}&startdate=${startdate}&enddate=${enddate}`)
    .pipe(map(res => res))
  }
  getServiceNotification(plants:any,knu:any,status:any,bot:any,startdate:any,enddate:any):Observable<any>{
    return this.plantService.get(`${environment.baseUrl}/api/ease-i/metric/chart/serviceNotification?user=${this.user}&plant=${plants}&knu=${knu}&bcustatus=${status}&bcu=${bot}&startdate=${startdate}&enddate=${enddate}`)
    .pipe(map(res => res))
  }
  getReplacementNotification(plants:any,knu:any,status:any,bot:any,startdate:any,enddate:any):Observable<any>{
    return this.plantService.get(`${environment.baseUrl}/api/ease-i/metric/chart/replacementNotification?user=${this.user}&plant=${plants}&knu=${knu}&bcustatus=${status}&bcu=${bot}&startdate=${startdate}&enddate=${enddate}`)
    .pipe(map(res => res))
  }
  getuptimedata(plants:any,knu:any,status:any,bot:any,startdate:any,enddate:any):Observable<any>{
    return this.plantService.get(`${environment.baseUrl}/api/ease-i/metric/chart/uptime?user=${this.user}&plant=${plants}&knu=${knu}&bcustatus=${status}&bcu=${bot}&startdate=${startdate}&enddate=${enddate}`)
    .pipe(map(res =>res))
  }
  getsoilingloss(plants:any,knu:any,status:any,bot:any,startdate:any,enddate:any):Observable<any>{
    return this.plantService.get(`${environment.baseUrl}/api/ease-i/metric/chart/soil-loss?user=${this.user}&plant=${plants}&knu=${knu}&bcustatus=${status}&bcu=${bot}&startdate=${startdate}&enddate=${enddate}`)
    .pipe(map(res =>res))
  }
  getCleaningSchedule(plants:any,knu:any,status:any,bot:any,startdate:any,enddate:any):Observable<any>{
    return this.plantService.get(`${environment.baseUrl}/api/ease-i/metric/cleaning_schedule?user=${this.user}&plant=${plants}&knu=${knu}&bcustatus=${status}&bcu=${bot}&startdate=${startdate}&enddate=${enddate}`)
    .pipe(map(res =>res))
  }
  getPlantAlarmSummary(params:any){
    return this.plantService.get(`${environment.baseUrl}/api/ease-i/metric/chart/alarmreport?user=${this.user}`+params)
  }
  getServiceNotifiactions(params:any){
    return this.plantService.get(`${environment.baseUrl}/api/ease-i/metric/chart/servicereport?user=${this.user}`+params)
  }
  getReportNotifications(params:any){
    return this.plantService.get(`${environment.baseUrl}/api/ease-i/metric/chart/replacementreport?user=${this.user}`+params)
  }
  getKNUStatus(plants:any,knu:any,status:any,bot:any,startdate:any,enddate:any){
    return this.plantService.get(`${environment.baseUrl}/api/ease-i/metric/KnuStatus?user=${this.user}&plant=${plants}&knu=${knu}&bcustatus=${status}&bcu=${bot}&startdate=${startdate}&enddate=${enddate}`)
    .pipe(map(res =>res))
  }
  getSummary(plants:any,startdate:any,enddate:any){
    return this.plantService.get(`${environment.baseUrl}/api/ease-i/metric/summary?user=${this.user}&plant=${plants}&startdate=${startdate}&enddate=${enddate}`)
    .pipe(map(res =>res))
  }
  getIssueType():Observable<any>{
    return this.plantService.get(`${environment.baseUrl}/api/ease-i/issueType?user=${this.user}`)
    .pipe(map(res => res))
  }
//  saveRaiseAlaram(data:any):Observable<any>{
//     return this.plantService.post(`${environment.baseUrl}/api/ease-i/raisealarm?user=${this.user}`,data)
//     .pipe(map(res => res))
//   }
getScheduleData(ncu:any,bcu:any): Observable<any> {
  return this.plantService.get(`${environment.baseUrl}/api/ease-i/metric/scheduleing?user=${this.user}&plant=${this.plant}&ncu=${ncu},&bcu=${bcu}`)
      .pipe(map(res => res))
}
getTwoMonthScheduleData(ncu:any,bcu:any): Observable<any> {
  return this.plantService.get(`${environment.baseUrl}/api/ease-i/metric/scheduleingtwo?user==${this.user}&plant=${this.plant}&ncu=${ncu}&bcu=${bcu}`)
      .pipe(map(res => res))
}
saveRaiseAlaram(data: any): Observable<any> {
    const url = `${environment.baseUrl}/api/ease-i/raisealarm?user=${this.user}`; // Replace with your API endpoint
    return this.plantService.post(url, data, { observe: 'response' })
      .pipe(
        map((response: HttpResponse<any>) => {
          if (response.status === 200) {
            return response.body;
          } else {
            throw new Error('API request failed with status ' + response.status);
          }
        }),
        catchError((error: HttpErrorResponse) => {
          return throwError(error);
        })
      );
  }
}
