import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { environment } from '../../../../../src/environments/environment'
import { map } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})

export class NotificationService {
  token = localStorage.getItem('jwtToken')
  httpOptions = {
    headers: new HttpHeaders()
      .set('content-type', 'application/json')
      .set('Access-Control-Allow-Origin', '*')
      .set('Access-Control-Allow-Methods', 'GET,POST,OPTIONS,DELETE,PUT')
      .set('Authorization', 'Bearer ' + this.token)
  }
  httpOptions1: any = {
    headers: new HttpHeaders()
      .set('content-type', 'application/json')
      .set('Access-Control-Allow-Origin', '*')
      .set('Access-Control-Allow-Methods', 'GET,POST,OPTIONS,DELETE,PUT')
      .set('Authorization', 'Bearer ' + this.token),
    responseType: 'blob'
  }

  constructor(private http: HttpClient) { }

  getNoActionNotification(): Observable<any> {
    return this.http.get<any>(`${environment.baseUrl}/api/notification/no-action`,)
      .pipe(map(res => res))
  }

  getHistoryById(id): Observable<any> {
    return this.http.get<any>(`${environment.baseUrl}/api/notification/history-by-wfinstance/` + id,)
      .pipe(map(res => res))
  }
  getWfinstaceById(id):Observable<any> {
    return this.http.get<any>(`${environment.baseUrl}/api/wfinstance/` + id,)
      .pipe(map(res => res))
  }
  getHistoryByIdWithNotificionID(id, notificationId): Observable<any> {
    return this.http.get<any>(`${environment.baseUrl}/api/notification/history-by-wfinstance/` + id + `/nf-id/` + notificationId,)
      .pipe(map(res => res))
  }

  updateNotification(status, data): Observable<any> {
    return this.http.put<any>(`${environment.baseUrl}/api/wfinstance/status-update/` + status, data)
      .pipe(map(res => res))
  }
  
  getNotification():Observable<any>{
    return this.http.get<any>(`${environment.baseUrl}/api/wfinstance`,)
      .pipe(map(res => res))
  }

  finishNotification(id):Observable<any>{
    return this.http.put<any>(`${environment.baseUrl}/api/notification/finsih-reject-status/` + id, '')
      .pipe(map(res => res))
  }
  download(data): Observable<any> {
    return this.http.post<any>(`${environment.baseUrl}/api/wfinstance/download-nf-attachment`, data, this.httpOptions1)
      .pipe(map(res => res))
  } 
}
