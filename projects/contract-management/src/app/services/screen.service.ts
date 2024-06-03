import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { environment } from '../../../../../src/environments/environment'
import { map } from 'rxjs/operators'

@Injectable({
  providedIn: 'root',
})
export class ScreenService {
  token = localStorage.getItem('jwtToken')
  httpOptions = {
    headers: new HttpHeaders()
      .set('content-type', 'application/json')
      .set('Access-Control-Allow-Origin', '*')
      .set('Access-Control-Allow-Methods', 'GET,POST,OPTIONS,DELETE,PUT')
      .set('Authorization', 'Bearer ' + this.token),
  }

  constructor(private http: HttpClient) { }

  saveScreenData(data): Observable<any> {
    return this.http.post<any>(`${environment.baseUrl}/api/drone/screen`, data, this.httpOptions)
      .pipe(map(res => res))
  }

  getAllScreenData(): Observable<any> {
    return this.http.get<any>(`${environment.baseUrl}/api/drone/screen`, this.httpOptions)
      .pipe(map(res => res))
  }

  updateScreenData(data): Observable<any> {
    return this.http.put<any>(`${environment.baseUrl}/api/drone/screen/` + data._id, data, this.httpOptions)
      .pipe(map(res => res))
  }

  getDataById(id): Observable<any> {
    return this.http.get<any>(`${environment.baseUrl}/api/drone/screen/` + id, this.httpOptions)
      .pipe(map(res => res))
  }

  getDataByCode(code): Observable<any> {
    return this.http.get<any>(`${environment.baseUrl}/api/screen/code/` + code, this.httpOptions)
      .pipe(map(res => res))
  }

  deleteScreenData(id): Observable<any> {
    return this.http.delete<any>(`${environment.baseUrl}/api/drone/screen/` + id, this.httpOptions)
      .pipe(map(res => res))
  }
}
