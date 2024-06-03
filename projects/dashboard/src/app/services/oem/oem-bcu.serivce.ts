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
export class OembcuService {
    token:any = localStorage.getItem('jwtToken')
    user :any 
    plant:any
    plantnewid:any
    httpOptions = {
        headers: new HttpHeaders()
          .set('content-type', 'application/json')
          .set('Access-Control-Allow-Origin', '*')
          .set('Access-Control-Allow-Methods', 'GET,POST,OPTIONS,DELETE,PUT')
          .set('Authorization', 'Bearer ' + this.token),
      }
    constructor(private bcuService: HttpClient,private store: Store<any>,) {
        this.store.pipe(select(Reducers.getUser)).subscribe(state => {
          this.plant="";
          this.plant = state.plant == ''? localStorage.getItem('plant'):state.plant
          this.user = state.customer == ''? localStorage.getItem('customer'):state.customer    
          this.plantnewid =  this.plant.split(',')
          this.plant  = this.plantnewid[0] 
        })
      }

    getBcuSummary(id :any): Observable<any> {
        let url =`${environment.baseUrl}/api/ease-i/metric/bcusummary?user=${this.user}&plant=${this.plant}`
        if(id != "&knu=&bcu="){
          url=url+id
        }
        return this.bcuService.get(url)
            .pipe(map(res => res))
    }
    getBcuMotorCurrent(id:any,date:any): Observable<any> {
        return this.bcuService.get(`${environment.baseUrl}/api/ease-i/metric/chart/bcumotorcurrent?user=${this.user}&plant=${this.plant}`+ id +date)
            .pipe(map(res => res))
    }

    getBcuBrushCurrent(id:any,params:any): Observable<any> {
        return this.bcuService.get(`${environment.baseUrl}/api/ease-i/metric/chart/oembcucurrent?user=${this.user}&plant=${this.plant}`+ id +params)
            .pipe(map(res => res))
    }

    getBcuTemperature(id:any,params:any): Observable<any> {
        return this.bcuService.get(`${environment.baseUrl}/api/ease-i/metric/chart/bcutemperaturecurrent?user=${this.user}&plant=${this.plant}`+id +params)
            .pipe(map(res => res))
    }

    getBatterytempVoltage(id:any ,date:any): Observable<any> {
        return this.bcuService.get(`${environment.baseUrl}/api/ease-i/metric/chart/oembattempvol?user=${this.user}&plant=${this.plant}`+id +date)
           .pipe(map(res => res))
    }

    getBatteryCurrentSoc(id:any,date:any): Observable<any> {
        return this.bcuService.get(`${environment.baseUrl}/api/ease-i/metric/chart/oembatcurrentsoc?user=${this.user}&plant=${this.plant}`+id +date)
            .pipe(map(res => res))
    }

    getBcuPcbTemperature(id:any,date:any): Observable<any> {
        return this.bcuService.get(`${environment.baseUrl}/api/ease-i/metric/chart/pcbtemp?user=${this.user}&plant=${this.plant}`+id +date)
            .pipe(map(res => res))
    }
    getbcuAlarmDetails(params:any): Observable<any> {
        return this.bcuService.get(`${environment.baseUrl}/api/ease-i/metric/chart/bcualarmdetails?user=${this.user}&plant=${this.plant}`+params)
            .pipe(map(res => res))
    }

    getbcuNotificationDetails(): Observable<any> {
        return this.bcuService.get(``)
            .pipe(map(res => res))
    }

    getbcuBotInstantaniousParameter(): Observable<any> {
        return this.bcuService.get(``)
            .pipe(map(res => res))
    }

    getAlarmTableData(): Observable<any> {
        return this.bcuService.get(`${environment.baseUrl}/api/ease-i/metric/chart/ncuerror?user=${this.user}&plant=${this.plant}`)
            .pipe(map(res => res))
    }

    getAlarmbotTableData(): Observable<any> {
        return this.bcuService.get(`${environment.baseUrl}/api/ease-i/metric/chart/bcuerror?user=${this.user}&plant=${this.plant}`)
            .pipe(map(res => res))
    }

    getWindData(): Observable<any> {
        return this.bcuService.get(`${environment.baseUrl}/api/ease-i/metric/chart/winddetails?user=${this.user}&plant=${this.plant}`)
            .pipe(map(res => res))
    }
    getWindTableData(): Observable<any> {
        return this.bcuService.get(`${environment.baseUrl}/api/ease-i/metric/table/windhistory?user=${this.user}&plant=${this.plant}`)
            .pipe(map(res => res))
    }

    // saveScheudleData(data:any): Observable<any> {
    //     return this.bcuService.post(`${environment.baseUrl}/api/ease-i/metric/cleanscheduleing?user=${this.user}&plant=${this.plant}`,data)
    //         .pipe(map(res => res))
    // }

    saveScheudleData(data: any,ncu:any,bcu:any): Observable<any> {
        const url = `${environment.baseUrl}/api/ease-i/metric/cleanscheduleing?user=${this.user}&plant=${this.plant}&ncu=${ncu}&bcu=${bcu}`; // Replace with your API endpoint
        return this.bcuService.post(url, data, { observe: 'response' })
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