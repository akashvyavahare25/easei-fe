import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { environment } from '../../../../../src/environments/environment';
import { map } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class EiMasterService {
  token = localStorage.getItem('jwtToken')
  httpOptions = {
    headers: new HttpHeaders()
      .set('content-type', 'application/json')
  }

  httpOptions1 = {
    headers: new HttpHeaders()
    .set('content-type', 'application/json')
    .set('Access-Control-Allow-Origin', '*')
    .set('Access-Control-Allow-Methods', 'GET,POST,OPTIONS,DELETE,PUT')
    .set('Authorization', 'Bearer ' + this.token),
  }

  constructor(private http: HttpClient) {
  }


  getMasterByName(name:any,jsonObj:any): Observable<any> {
    jsonObj=encodeURIComponent(jsonObj);
    return this.http.get<any>(`${environment.baseUrl}/api/ease-i/eimaster/name/` + name+"?json="+jsonObj, this.httpOptions)
      .pipe(map(res => res))
  }

//   getMasterDetailsByNameAndID(name: string, id: string): Observable<any> {
//     return this.http.get<any>(`${environment.baseUrl}/api/ease-i/schema/` + name + '/' + id, this.httpOptions)
//       .pipe(map(res => res))
//   }

//   deleteSchemaRecord(name: string, id: string): Observable<any> {
//     return this.http.delete<any>(`${environment.baseUrl}/api/ease-i/schema/` + name + '/' + id, this.httpOptions)
//       .pipe(map(res => res))
//   }

//   registerSchema(data: any): Observable<any> {
//     return this.http.post<any>(`${environment.baseUrl}/api/ease-i/schema`, data, this.httpOptions)
//       .pipe(map(res => res))
//   }

//   getSchemaByCode(code: any): Observable<any> {
//     return this.http.get<any>(`${environment.baseUrl}/api/ease-i/eimaster/name/` + code, this.httpOptions)
//       .pipe(map(res => res))
//   }

//   addMasterDetails(data: any): Observable<any> {
//     return this.http.post<any>(`${environment.baseUrl}/api/ease-i/eimaster`, data, this.httpOptions)
//       .pipe(map(res => res))
//   }
  
//   addFilters(data: any): Observable<any> {
//     return this.http.post<any>(`${environment.baseUrl}/api/ease-i/screen-master`, data, this.httpOptions)
//       .pipe(map(res => res))
//   }

//   updateMasterDetails(id: String, data: any): Observable<any> {
//     return this.http.put<any>(`${environment.baseUrl}/api/ease-i/schema/update/` + id, data, this.httpOptions)
//       .pipe(map(res => res))
//   }

//   getMasterDetailList(masterName: String): Observable<any> {
//     return this.http.get<any>(`${environment.baseUrl}/api/ease-i/eimaster/` + masterName, this.httpOptions)
//       .pipe(map(res => res))
//   }

//   checkCollectionExists(masterName: String): Observable<any> {
//     return this.http.get<any>(`${environment.baseUrl}/api/ease-i/eimaster/name/` + masterName, this.httpOptions)
//       .pipe(map(res => res))
//   }

//   getAllUsers(): Observable<any> {
//     return this.http.get<any>(`${environment.baseUrl}/api/ease-i/user/fetch-users`, this.httpOptions)
//       .pipe(map(res => res))
//   }

//   getUsersByRole(data): Observable<any> {
//     return this.http.post<any>(`${environment.baseUrl}/api/ease-i/user/fetch-user-by-role`, data, this.httpOptions)
//       .pipe(map(res => res))
//   }
  
//   getAllMasters(): Observable<any> {
//     return this.http.get<any>(`${environment.baseUrl}/api/ease-i/master`, this.httpOptions)
//       .pipe(map(res => res))
//   }

//   getDataSet(data: String): Observable<any> {
//     return this.http.get<any>(`${environment.baseUrl}/api/ease-i/external/api/ease-i/` + data, this.httpOptions1)
//       .pipe(map(res => res))
//   }

//   getDropdownLookupData(masterName: String): Observable<any> {
//     return this.http.get<any>(`${environment.baseUrl}/api/ease-i/lookup/master/` + masterName, this.httpOptions)
//       .pipe(map(res => res))
//   }

//   getDataDiff(updatedAt, createdAt, endDate) {
//     if (updatedAt.getTime() === createdAt.getTime()) {
//       return ''
//     } else {
//       var diff = endDate.getTime() - updatedAt.getTime();
//       var days = Math.floor(diff / (60 * 60 * 24 * 1000));
//       var hours = Math.floor(diff / (60 * 60 * 1000)) - (days * 24);
//       var minutes = Math.floor(diff / (60 * 1000)) - ((days * 24 * 60) + (hours * 60));
//       var seconds = Math.floor(diff / 1000) - ((days * 24 * 60 * 60) + (hours * 60 * 60) + (minutes * 60));
//       if (days > 0) {
//         return days === 1 ? '<span class="time-show">updated ' + days + ' day ago' : '<span class="time-show">updated ' + days + ' days ago</span>';
//       } else {
//         if (hours > 0) {
//           return hours === 1 ? '<span class="time-show">updated ' + hours + ' hour ago' : '<span class="time-show">updated ' + hours + ' hours ago</span>'
//         } else {
//           if (minutes > 0) {
//             return '<span class="time-show">updated ' + minutes + ' min ago </span>'
//           } else {
//             return '<span class="time-show">updated ' + seconds + ' sec ago </span>'
//           }
//         }
//       }
//     }
//   }
}
