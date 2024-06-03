import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { environment } from '../../../../../src/environments/environment'
import { map } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  httpOptions = {
    headers: new HttpHeaders()
      .set('content-type', 'application/json')
  }
  constructor(private http: HttpClient) { }

  saveDashboard(data): Observable<any> {
    return this.http.post<any>(`${environment.baseUrl}/api/dashboard`, data, this.httpOptions)
      .pipe(map(res => res))
  }

  deleteDashboard(id): Observable<any> {
    return this.http.delete<any>(`${environment.baseUrl}/api/dashboard/` + id, this.httpOptions)
      .pipe(map(res => res))
  }

  updateDashboard(data): Observable<any> {
    return this.http.put<any>(`${environment.baseUrl}/api/dashboard/` + data._id, data, this.httpOptions)
      .pipe(map(res => res))
  }

  getDasbhoardById(id): Observable<any> {
    return this.http.get<any>(`${environment.baseUrl}/api/dashboard/` + id, this.httpOptions)
      .pipe(map(res => res))
  }

  getAllDasbhoard(): Observable<any> {
    return this.http.get<any>(`${environment.baseUrl}/api/dashboard`, this.httpOptions)
      .pipe(map(res => res))
  }
}
