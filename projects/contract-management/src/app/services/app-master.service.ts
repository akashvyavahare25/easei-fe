import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { environment } from '../../../../../src/environments/environment'
import { map } from 'rxjs/operators'

@Injectable({
  providedIn: 'root',
})
export class AppMasterService {
  token = localStorage.getItem('jwtToken')
  httpOptions = {
    headers: new HttpHeaders()
      .set('content-type', 'application/json')
      .set('Access-Control-Allow-Origin', '*')
      .set('Access-Control-Allow-Methods', 'GET,POST,OPTIONS,DELETE,PUT')
      .set('Authorization', 'Bearer ' + this.token),
  }

  constructor(private http: HttpClient) { }

  saveAppMasterData(data): Observable<any> {
    return this.http.post<any>(`${environment.baseUrl}/api/app-master`, data, this.httpOptions)
      .pipe(map(res => res))
  }

  getAllAppMasterData(): Observable<any> {
    return this.http.get<any>(`${environment.baseUrl}/api/app-master`, this.httpOptions)
      .pipe(map(res => res))
  }

  updateAppMasterData(data): Observable<any> {
    return this.http.put<any>(`${environment.baseUrl}/api/app-master/` + data._id, data, this.httpOptions)
      .pipe(map(res => res))
  }

  getDataById(id): Observable<any> {
    return this.http.get<any>(`${environment.baseUrl}/api/app-master/` + id, this.httpOptions)
      .pipe(map(res => res))
  }

  deleteAppMasterData(id): Observable<any> {
    return this.http.delete<any>(`${environment.baseUrl}/api/app-master/` + id, this.httpOptions)
      .pipe(map(res => res))
  }
}
