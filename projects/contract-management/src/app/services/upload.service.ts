import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { environment } from '../../../../../src/environments/environment'
import { map } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class UploadService {
  token = localStorage.getItem('jwtToken')
   username=localStorage.getItem('user')
  httpOptions = {
    headers: new HttpHeaders()
      .set('content-type', 'application/json')
      .set('Access-Control-Allow-Origin', '*')
      .set('Access-Control-Allow-Methods', 'GET,POST,OPTIONS,DELETE,PUT')
      .set('Authorization', 'Bearer ' + this.token),
  }

  httpOptions1 = {
    headers: new HttpHeaders()
      .set('Access-Control-Allow-Origin', '*')
      .set('Access-Control-Allow-Methods', 'GET,POST,OPTIONS,DELETE,PUT')
      .set('Access-Control-Allow-Headers', 'Content-Type'),
  }
  httpOptions2 = {
    headers: new HttpHeaders()
      .set('Access-Control-Allow-Origin', '*')
      .set('Access-Control-Allow-Methods', 'GET,POST,OPTIONS,DELETE,PUT')
      .set('Authorization', 'Bearer ' + this.token),
  }

  constructor(private http: HttpClient) { } 

  saveUpload(data):Observable<any>{
    return this.http.post<any>(`${environment.baseUrl}/api/defineupload`,data,this.httpOptions)
      .pipe(map(res=>res))
  }
  
  getUploads():Observable<any>{
    return this.http.get<any>(`${environment.baseUrl}/api/defineupload`)
      .pipe(map(res=>res))
  }
  
  updateUpload(data):Observable<any>{
    return this.http.put<any>(`${environment.baseUrl}/api/defineupload/`+data._id,data,this.httpOptions)
      .pipe(map(res=>res))
  }
  
  deleteUpload(id): Observable<any> {
    return this.http.delete<any>(`${environment.baseUrl}/api/defineupload/` + id, this.httpOptions)
      .pipe(map(res => res))
  }  

  ccUpload(data): Observable<any> {
    return this.http.post<any>(`${environment.baseUrl}/api/defineupload/csvtojsonfile`, data, this.httpOptions2)
      .pipe(map(res => res))
  }

  rrUpload(data): Observable<any> {
    return this.http.post<any>(`http://50.16.16.62:8081/uploader`, data, this.httpOptions1)
      .pipe(map(res => res))
  }

  uploaddata(data): Observable<any> {
    return this.http.post<any>(`${environment.baseUrl}/api/defineupload/uploadfile`, data, this.httpOptions2)
      .pipe(map(res => res))
  }

  fileUpload(data): Observable<any> {
    return this.http.post<any>(`${environment.baseUrl}/api/upload/file`, data, this.httpOptions2)
      .pipe(map(res => res))
  }

  templateUpload(data): Observable<any> {
    return this.http.post<any>(`${environment.baseUrl}/api/upload/template`, data, this.httpOptions2)
      .pipe(map(res => res))
  }
  getAllTemplate(): Observable<any> {
    return this.http.get<any>(`${environment.baseUrl}/api/getall/template`)
      .pipe(map(res => res))
  }

  deleteTemplateById(id): Observable<any> {
    return this.http.delete<any>(`${environment.baseUrl}/api/delete/file/` + id, this.httpOptions)
    .pipe(map(res => res))
}
createFileData(data): Observable<any> {
  return this.http.post<any>(`${environment.baseUrl}/api/ease-i/insert?username=admin`, data,this.httpOptions)
  .pipe(map(res => res))
}
}
