import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { environment } from '../../../../../src/environments/environment'
import { map } from 'rxjs/operators'

@Injectable({
  providedIn: 'root',
})
export class JobService {
  token = localStorage.getItem('jwtToken')
  httpOptions = {
    headers: new HttpHeaders()
      .set('content-type', 'application/json')
      .set('Access-Control-Allow-Origin', '*')
      .set('Access-Control-Allow-Methods', 'GET,POST,OPTIONS,DELETE,PUT')
      .set('Authorization', 'Bearer ' + this.token),
  }

  constructor(private http: HttpClient) { }

  saveJobData(data): Observable<any> {
    return this.http.post<any>(`${environment.baseUrl}/api/job`, data, this.httpOptions)
      .pipe(map(res => res))
  }

  getAllJobData(): Observable<any> {
    return this.http.get<any>(`${environment.baseUrl}/api/job`, this.httpOptions)
      .pipe(map(res => res))
  }

  updateJobData(data): Observable<any> {
    return this.http.put<any>(`${environment.baseUrl}/api/job/` + data._id, data, this.httpOptions)
      .pipe(map(res => res))
  }

  getDataById(id): Observable<any> {
    return this.http.get<any>(`${environment.baseUrl}/api/job/` + id, this.httpOptions)
      .pipe(map(res => res))
  }

  getDataByCode(code): Observable<any> {
    return this.http.get<any>(`${environment.baseUrl}/api/job/code/` + code, this.httpOptions)
      .pipe(map(res => res))
  }

  deleteJobData(id): Observable<any> {
    return this.http.delete<any>(`${environment.baseUrl}/api/job/` + id, this.httpOptions)
      .pipe(map(res => res))
  }

  getJobDataByName(tblName): Observable<any> {
    return this.http.get<any>(`${environment.baseUrl}/api/job/data/` + tblName, this.httpOptions)
      .pipe(map(res => res))
  }

  
}
