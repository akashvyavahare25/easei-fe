import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { environment } from '../../../../../src/environments/environment'
import { map } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class RulesService {
  token = localStorage.getItem('jwtToken')
  httpOptions = {
    headers: new HttpHeaders()
      .set('content-type', 'application/json')
      .set('Access-Control-Allow-Origin', '*')
      .set('Access-Control-Allow-Methods', 'GET,POST,OPTIONS,DELETE,PUT')
      .set('Authorization', 'Bearer ' + this.token),
  }

  constructor(private http: HttpClient) { } 

  saveRules(data):Observable<any>{
    return this.http.post<any>(`${environment.baseUrl}/api/rules/`,data,this.httpOptions)
      .pipe(map(res=>res))
  }
  
  getRules():Observable<any>{
    return this.http.get<any>(`${environment.baseUrl}/api/rules/`)
      .pipe(map(res=>res))
  }
  getRulesID(id):Observable<any>{
    return this.http.get<any>(`${environment.baseUrl}/api/rules/`+id, this.httpOptions)
      .pipe(map(res=>res))
  }
  updateRules(data):Observable<any>{
    return this.http.put<any>(`${environment.baseUrl}/api/rules/`+data._id,data,this.httpOptions)
      .pipe(map(res=>res))
  }
  
  deleteRules(id): Observable<any> {
    return this.http.delete<any>(`${environment.baseUrl}/api/rules/` + id, this.httpOptions)
      .pipe(map(res => res))
  }
  getRulesByScreenId(id):Observable<any>{
    return this.http.get<any>(`${environment.baseUrl}/api/rules/code/`+id, this.httpOptions)
      .pipe(map(res=>res))
  }
  find(data):Observable<any>{
    return this.http.post<any>(`${environment.baseUrl}/api/report/query-test/`,data,this.httpOptions)
      .pipe(map(res=>res))
  }
//   aggregate(data):Observable<any>{
//     return this.http.post<any>(`${environment.baseUrl}/api/report/query-test/`,data,this.httpOptions)
//       .pipe(map(res=>res))
//   }

}
