import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { environment } from '../../../../../src/environments/environment'
import { map } from 'rxjs/operators'

@Injectable({
  providedIn: 'root',
})
export class MasterService {
  token = localStorage.getItem('jwtToken')
  httpOptions = {
    headers: new HttpHeaders()
      .set('content-type', 'application/json')
      .set('Access-Control-Allow-Origin', '*')
      .set('Access-Control-Allow-Methods', 'GET,POST,OPTIONS,DELETE,PUT')
      .set('Authorization', 'Bearer ' + this.token),
  }

  constructor(private http: HttpClient) { }

  saveMasterData(data): Observable<any> {
    return this.http.post<any>(`${environment.baseUrl}/api/master`, data, this.httpOptions)
      .pipe(map(res => res))
  }

  getAllMasterData(): Observable<any> {
    return this.http.get<any>(`${environment.baseUrl}/api/master`, this.httpOptions)
      .pipe(map(res => res))
  }

  updateMasterData(data): Observable<any> {
    return this.http.put<any>(`${environment.baseUrl}/api/master/` + data.tab_id, data, this.httpOptions)
      .pipe(map(res => res))
  }

  getDataById(id): Observable<any> {
    return this.http.get<any>(`${environment.baseUrl}/api/master/` + id, this.httpOptions)
      .pipe(map(res => res))
  }

  deleteMasterData(id): Observable<any> {
    return this.http.delete<any>(`${environment.baseUrl}/api/master/` + id, this.httpOptions)
      .pipe(map(res => res))
  }

  getMasterByName(name:any,jsonObj:any): Observable<any> {
    return this.http.get<any>(`${environment.baseUrl}/api/eimaster/name/false` + name+`?json=`+jsonObj, this.httpOptions)
      .pipe(map(res => res))
  }
}
