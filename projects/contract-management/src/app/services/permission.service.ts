import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { environment } from '../../../../../src/environments/environment'
import { map } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class PermissionService {
  token = localStorage.getItem('jwtToken')
  httpOptions = {
    headers: new HttpHeaders()
      .set('content-type', 'application/json')
      .set('Access-Control-Allow-Origin', '*')
      .set('Access-Control-Allow-Methods', 'GET,POST,OPTIONS,DELETE,PUT')
      .set('Authorization', 'Bearer ' + this.token),
  }

  constructor(private http: HttpClient) { }

  saveUserPermisson(data): Observable<any> {
    return this.http.post<any>(`${environment.baseUrl}/api/user-permission`, data, this.httpOptions)
      .pipe(map(res => res))
  }

  getPermissionByRole(role): Observable<any> {
    return this.http.get<any>(`${environment.baseUrl}/api/user-permission/by-role/` + role)
      .pipe(map(res => res))
  }

  updateUserPermisson(data): Observable<any> {
    return this.http.put<any>(`${environment.baseUrl}/api/user-permission/` + data._id, data, this.httpOptions)
      .pipe(map(res => res))
  }
}
