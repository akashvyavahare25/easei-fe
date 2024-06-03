import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { environment } from '../../../../../src/environments/environment'
import { map } from 'rxjs/operators'

@Injectable({
  providedIn: 'root',
})
export class AppScreenService {
  token = localStorage.getItem('jwtToken')
  httpOptions = {
    headers: new HttpHeaders()
      .set('content-type', 'application/json')
      .set('Access-Control-Allow-Origin', '*')
      .set('Access-Control-Allow-Methods', 'GET,POST,OPTIONS,DELETE,PUT')
      .set('Authorization', 'Bearer ' + this.token),
  }

  httpOptions1: any = {
    // headers: new HttpHeaders()
    //   .set('content-type', 'text/csv')
    //   .set('Access-Control-Allow-Origin', '*')
    //   .set('Access-Control-Allow-Methods', 'GET,POST,OPTIONS,DELETE,PUT')
    //   .set('Authorization', 'Bearer ' + this.token),
    // responseType: 'arraybuffer'
    headers: new HttpHeaders()
    // .set('content-type', 'application/json')
    .set('Access-Control-Allow-Origin', '*')
    .set('Access-Control-Allow-Methods', 'GET,POST,OPTIONS,DELETE,PUT')
    .set('Authorization', 'Bearer ' + this.token),
  responseType: 'arraybuffer',

  }


  constructor(private http: HttpClient) { }

  saveAppScreenData(data): Observable<any> {
    return this.http.post<any>(`${environment.baseUrl}/api/app-screen`, data, this.httpOptions)
      .pipe(map(res => res))
  }

  getAllAppScreenData(): Observable<any> {
    return this.http.get<any>(`${environment.baseUrl}/api/app-screen`, this.httpOptions)
      .pipe(map(res => res))
  }

  updateAppScreenData(data): Observable<any> {
    return this.http.put<any>(`${environment.baseUrl}/api/app-screen/` + data._id, data, this.httpOptions)
      .pipe(map(res => res))
  }

  getDataById(code, id): Observable<any> {
    return this.http.get<any>(`${environment.baseUrl}/api/schema/` + code + '/' + id, this.httpOptions)
      .pipe(map(res => res))
  }

  generateTemplateFile(type, code, id): Observable<any> {
    return this.http.get<any>(`${environment.baseUrl}/api/gen-template/` + type + '/' + code + '/' + id, this.httpOptions1)
      .pipe(map(res => res))
  }
  generateTemplateFile1(code): Observable<any> {
    return this.http.get<any>(`${environment.baseUrl}/api/master/csv/` + code, this.httpOptions1)
      .pipe(map(res => res))
  }
  generateTemplateWithData( code): Observable<any> {
    return this.http.get<any>(`${environment.baseUrl}/api/master/export/` + code , this.httpOptions1)
      .pipe(map(res => res))
  }

  uplaodFile(data): Observable<any> {
    return this.http.post<any>(`${environment.baseUrl}/api/upload`, data, this.httpOptions1)
      .pipe(map(res => res))
  }

  deleteAppScreenData(code, id): Observable<any> {
    return this.http.delete<any>(`${environment.baseUrl}/api/schema/` + code + '/' + id, this.httpOptions)
      .pipe(map(res => res))
  }

  getContractData(code, days): Observable<any> {
    return this.http.get<any>(`${environment.baseUrl}/api/contract-data/` + code + '/' + days, this.httpOptions)
      .pipe(map(res => res))
  }

  getContractMaxTop(code): Observable<any> {
    return this.http.get<any>(`${environment.baseUrl}/api/contract-max-top/` + code, this.httpOptions)
      .pipe(map(res => res))
  }

  getContractPriceVariance(code): Observable<any> {
    return this.http.get<any>(`${environment.baseUrl}/api/contract-price-variance/` + code, this.httpOptions)
      .pipe(map(res => res))
  }

  getContractCount(code): Observable<any> {
    return this.http.get<any>(`${environment.baseUrl}/api/contract-count/` + code, this.httpOptions)
      .pipe(map(res => res))
  }

  getReportScreendata(data): Observable<any> {
    return this.http.post<any>(`${environment.baseUrl}/api/report/get-report-screendata`, data, this.httpOptions)
      .pipe(map(res => res))
  }

  getSerachDataByPolicy(data): Observable<any> {
    return this.http.post<any>(`${environment.baseUrl}/api/joins/policy`, data, this.httpOptions)
      .pipe(map(res => res))
  }

  getSerachDataByCliam(data): Observable<any> {
    return this.http.post<any>(`${environment.baseUrl}/api/claim/dob`, data, this.httpOptions)
      .pipe(map(res => res))
  }

}
