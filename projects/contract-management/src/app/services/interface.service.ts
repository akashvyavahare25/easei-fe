import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { environment } from '../../../../../src/environments/environment'
import { map } from 'rxjs/operators'

@Injectable({
  providedIn: 'root',
})
export class InterfaceService {
  token = localStorage.getItem('jwtToken')
  httpOptions = {
    headers: new HttpHeaders()
      .set('content-type', 'application/json')
      .set('Access-Control-Allow-Origin', '*')
      .set('Access-Control-Allow-Methods', 'GET,POST,OPTIONS,DELETE,PUT')
      .set('Authorization', 'Bearer ' + this.token),
  }

  constructor(private http: HttpClient) { }

  saveInterfaceData(data): Observable<any> {
    return this.http.post<any>(`${environment.baseUrl}/api/apiinterface`, data, this.httpOptions)
      .pipe(map(res => res))
  }

  testInterfaceData(data): Observable<any> {
    return this.http.post<any>(`${environment.baseUrl}/api/apiinterface/test-api-interface/`,data,this.httpOptions)
      .pipe(map(res => res))
  }

  getAllInterfaceData(): Observable<any> {
    return this.http.get<any>(`${environment.baseUrl}/api/apiinterface`, this.httpOptions)
      .pipe(map(res => res))
  }

  updateInterfaceData(data): Observable<any> {
    return this.http.put<any>(`${environment.baseUrl}/api/apiinterface/` + data._id, data, this.httpOptions)
      .pipe(map(res => res))
  }

  getDataById(id): Observable<any> {
    return this.http.get<any>(`${environment.baseUrl}/api/apiinterface/` + id, this.httpOptions)
      .pipe(map(res => res))
  }

  deleteInterfaceData(id): Observable<any> {
    return this.http.delete<any>(`${environment.baseUrl}/api/apiinterface/` + id, this.httpOptions)
      .pipe(map(res => res))
  }
}
