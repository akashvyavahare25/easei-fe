import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { environment } from '../../../../../src/environments/environment'
import { map } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class FormRenderService {
  token = localStorage.getItem('jwtToken')
  httpOptions = {
    headers: new HttpHeaders()
      .set('content-type', 'application/json')
  }

  constructor(private http: HttpClient) { }
  parameterDelete(id): Observable<any> {
    return this.http.delete<any>(`${environment.baseUrl}/api/parameter/` + id, this.httpOptions)
      .pipe(map(res => res))
  }

  getAllData(): Observable<any> {
    return this.http.get<any>(`${environment.baseUrl}/api/parameter`, this.httpOptions)
      .pipe(map(res => res))
  }

  login(data): Observable<any> {
    return this.http.post<any>(`${environment.baseUrl}/api/authenticate`, data, this.httpOptions)
      .pipe(map(res => res))
  }

  getProfileByToken(): Observable<any> {
    return this.http.get<any>(`${environment.baseUrl}/api/me`, this.httpOptions)
      .pipe(map(res => res))
  }

  getDataById(id): Observable<any> {
    return this.http.get<any>(`${environment.baseUrl}/api/parameter/` + id, this.httpOptions)
      .pipe(map(res => res))
  }
}
