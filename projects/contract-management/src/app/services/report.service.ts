import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { environment } from '../../../../../src/environments/environment'
import { map } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class ReportService {
  token = localStorage.getItem('jwtToken')
  httpOptions = {
    headers: new HttpHeaders()
      .set('content-type', 'application/json')
      .set('Access-Control-Allow-Origin', '*')
      .set('Access-Control-Allow-Methods', 'GET,POST,OPTIONS,DELETE,PUT')
      .set('Authorization', 'Bearer ' + this.token),
  }

  constructor(private http: HttpClient) { } 

  saveReport(data):Observable<any>{
    return this.http.post<any>(`${environment.baseUrl}/api/report/`,data,this.httpOptions)
      .pipe(map(res=>res))
  }
  
  getReports():Observable<any>{
    return this.http.get<any>(`${environment.baseUrl}/api/report/`)
      .pipe(map(res=>res))
  }

  updateReport(data):Observable<any>{
    return this.http.put<any>(`${environment.baseUrl}/api/report/`+data._id,data,this.httpOptions)
      .pipe(map(res=>res))
  }
  
  deleteReport(id): Observable<any> {
    return this.http.delete<any>(`${environment.baseUrl}/api/report/` + id, this.httpOptions)
      .pipe(map(res => res))
  }
  find(data):Observable<any>{
    return this.http.post<any>(`${environment.baseUrl}/api/report/query-test/`,data,this.httpOptions)
      .pipe(map(res=>res))
  }
  aggregate(data):Observable<any>{
    return this.http.post<any>(`${environment.baseUrl}/api/report/query-test/`,data,this.httpOptions)
      .pipe(map(res=>res))
  }

}
