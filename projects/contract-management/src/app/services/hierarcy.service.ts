import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { environment } from '../../../../../src/environments/environment'
import { map } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class HierarcyService {
  token = localStorage.getItem('jwtToken')
  httpOptions = {
    headers: new HttpHeaders()
      .set('content-type', 'application/json')
      .set('Access-Control-Allow-Origin', '*')
      .set('Access-Control-Allow-Methods', 'GET,POST,OPTIONS,DELETE,PUT')
      .set('Authorization', 'Bearer ' + this.token),
  }

  constructor(private http: HttpClient) { } 

  saveHierarcy(data):Observable<any>{
    return this.http.post<any>(`${environment.baseUrl}/api/hierarchy/`,data,this.httpOptions)
      .pipe(map(res=>res))
  }
  
  getAllHierarcy():Observable<any>{
    return this.http.get<any>(`${environment.baseUrl}/api/hierarchy/`)
      .pipe(map(res=>res))
  }
  getHierarcy(id):Observable<any>{
    return this.http.get<any>(`${environment.baseUrl}/api/hierarchy/`+ id, this.httpOptions)
    .pipe(map(res=>res)) 
  }

  updateHierarcy(data):Observable<any>{
    return this.http.put<any>(`${environment.baseUrl}/api/hierarchy/`+data._id,data,this.httpOptions)
      .pipe(map(res=>res))
  }
  
  deleteHierarcy(id): Observable<any> {
    return this.http.delete<any>(`${environment.baseUrl}/api/hierarchy/` + id, this.httpOptions)
      .pipe(map(res => res))
  }
 

}
