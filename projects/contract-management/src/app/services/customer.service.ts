import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { environment } from '../../../../../src/environments/environment'
import { map } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  token = localStorage.getItem('jwtToken')
   username=localStorage.getItem('user')
  httpOptions = {
    headers: new HttpHeaders()
      .set('content-type', 'application/json')
      .set('Access-Control-Allow-Origin', '*')
      .set('Access-Control-Allow-Methods', 'GET,POST,OPTIONS,DELETE,PUT')
      .set('Authorization', 'Bearer ' + this.token),
  }
  httpOptions2 = {
    headers: new HttpHeaders()
      .set('Access-Control-Allow-Origin', '*')
      .set('Access-Control-Allow-Methods', 'GET,POST,OPTIONS,DELETE,PUT')
      .set('Authorization', 'Bearer ' + this.token),
  }

  constructor(private http: HttpClient) { } 


  logoUpload(data): Observable<any> {
    return this.http.post<any>(`${environment.baseUrl}/api/admin/logo`, data, this.httpOptions2)
      .pipe(map(res => res))
  }

  getAllCustomer():Observable<any>{
    return this.http.get<any>(`${environment.baseUrl}/api/customer`)
    .pipe(map(res => res))
  }
  saveLogo(data): Observable<any> {
    return this.http.post<any>(`${environment.baseUrl}/api/customer/upload`, data)
      .pipe(map(res => res))
  }

  getCustomerByID(id):Observable<any>{
    return this.http.get<any>(`${environment.baseUrl}/api/customer/`+id, this.httpOptions)
      .pipe(map(res=>res))
  }
  updateCustomer(id,data):Observable<any>{
    return this.http.put<any>(`${environment.baseUrl}/api/customer/`+ id,data)
      .pipe(map(res=>res))
  }
  
  deleteCustomer(id): Observable<any> {
    return this.http.delete<any>(`${environment.baseUrl}/api/customer/` + id, this.httpOptions)
      .pipe(map(res => res))
  }

}
