import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { environment } from '../../../../../src/environments/environment'
import { map } from 'rxjs/operators'

export const imgUrl='/api/users/logo/'
@Injectable({
  providedIn: 'root'
})
export class APIService {
  
  token = localStorage.getItem('jwtToken')
  httpOptions = {
    headers: new HttpHeaders()
      .set('content-type', 'application/json')
  }

  httpOptions1 = {
    headers: new HttpHeaders()
      .set('Access-Control-Allow-Origin', '*')
      .set('Access-Control-Allow-Methods', 'GET,POST,OPTIONS,DELETE,PUT')
      .set('Access-Control-Allow-Headers', 'Content-Type'),
  }

  constructor(private http: HttpClient) {
  }

  saveHierarchy(data:any): Observable<any> {
    return this.http.post<any>(`${environment.baseUrl}/api/create/hierarchy`,data, this.httpOptions)
      .pipe(map(res => res))
  }

  updateHierarchy(data:any,id:any): Observable<any> {
    return this.http.post<any>(`${environment.baseUrl}/api/update/hierarchy/${id}`,data, this.httpOptions)
      .pipe(map(res => res))
  }

  getAllHierarchy(startDate:any,endDate:any): Observable<any> {
    return this.http.get<any>(`${environment.baseUrl}/api/getall/hierarchy/${startDate}/${endDate}`, this.httpOptions)
      .pipe(map(res => res))
  }

  getHierarchyAllData(): Observable<any> {
    return this.http.get<any>(`${environment.baseUrl}/api/getall/hierarchy`, this.httpOptions)
      .pipe(map(res => res))
  }

  getHierarchyById(id:any): Observable<any> {
    return this.http.get<any>(`${environment.baseUrl}/api/get/hierarchy/${id}`, this.httpOptions)
      .pipe(map(res => res))
  }

  getHierarchyByRoot(root:any): Observable<any> {
    return this.http.get<any>(`${environment.baseUrl}/api/get/hierarchy/root/${root}`, this.httpOptions)
      .pipe(map(res => res))
  }

  getAuthority(): Observable<any> {
    return this.http.get<any>(`${environment.baseUrl}/api/authorities`, this.httpOptions)
      .pipe(map(res => res))
  }
  getOwnerName(user:any="Htek"): Observable<any>{
    return this.http.get<any>(`${environment.baseUrl}/api/ease-i/organization?user=`+user, this.httpOptions)
      .pipe(map(res => res))
    // http://10.1.1.59:5115/api/organization?user=Htek
  }
  getRoles(user:any="Htek"): Observable<any>{
   /*  return this.http.get(`${environment.baseUrl}/api/ease-i/master/hierachy?user=${user}`,this.httpOptions)
    .pipe(map(res => res)) */
    return this.http.get<any>(`${environment.baseUrl}/api/ease-i/rolemaster?user=`+user, this.httpOptions)
      .pipe(map(res => res))
    // http://10.1.1.59:5115/api/rolemaster?user=Htek
  }

  getPlants(user:any="Htek"): Observable<any>{
     return this.http.get(`${environment.baseUrl}/api/ease-i/master/hierachy?user=${user}`,this.httpOptions)
     .pipe(map(res => res))
    }
  addHelpPerson(data): Observable<any> {
      return this.http.put<any>(`${environment.baseUrl}/api/help`, data, this.httpOptions)
        .pipe(map(res => res))
    }
  addUser(data): Observable<any> {
    return this.http.post<any>(`${environment.baseUrl}/api/admin/users`, data, this.httpOptions)
      .pipe(map(res => res))
  }

  updateUser(id: Boolean, data): Observable<any> {
    return this.http.put<any>(`${environment.baseUrl}/api/admin/users/`+id, data, this.httpOptions)
      .pipe(map(res => res))
  }
  deleteUser(id): Observable<any> {
    return this.http.delete<any>(`${environment.baseUrl}/api/admin/users/`+id, this.httpOptions)
      .pipe(map(res => res))
  }
  getUser(id): Observable<any> {
    return this.http.get<any>(`${environment.baseUrl}/api/admin/users/` + id, this.httpOptions)
      .pipe(map(res => res))
  }

  getMaster(id): Observable<any> {
    return this.http.get<any>(`${environment.baseUrl}/api/master/` + id, this.httpOptions)
      .pipe(map(res => res))
  }

  getMasterByName(name): Observable<any> {
    return this.http.get<any>(`${environment.baseUrl}/api/schema/fetch/` + name, this.httpOptions)
      .pipe(map(res => res))
  }

  getMasterDetailsByNameAndID(name: string, id: string): Observable<any> {
    return this.http.get<any>(`${environment.baseUrl}/api/eimaster/`+ id, this.httpOptions)
      .pipe(map(res => res))
  }

  deleteSchemaRecord(id: string): Observable<any> {
    return this.http.delete<any>(`${environment.baseUrl}/api/eimaster/` + id, this.httpOptions)
      .pipe(map(res => res))
  }

  registerSchema(data: any): Observable<any> {
    return this.http.post<any>(`${environment.baseUrl}/api/schema`, data, this.httpOptions)
      .pipe(map(res => res))
  }

  getSchemaByCode(code: any): Observable<any> {
    return this.http.get<any>(`${environment.baseUrl}/api/eimaster/name/` + code, this.httpOptions)
      .pipe(map(res => res))
  }

  addMasterDetails(data: any): Observable<any> {
    return this.http.post<any>(`${environment.baseUrl}/api/eimaster`, data, this.httpOptions)
      .pipe(map(res => res))
  }
  
  addFilters(data: any): Observable<any> {
    return this.http.post<any>(`${environment.baseUrl}/api/screen-master`, data, this.httpOptions)
      .pipe(map(res => res))
  }

  updateMasterDetails(id: String, data: any): Observable<any> {
    return this.http.put<any>(`${environment.baseUrl}/api/eimaster/` + id, data, this.httpOptions)
      .pipe(map(res => res))
  }

  getMasterDetailList(masterName: String,isHierachy:any): Observable<any> {
    return this.http.get<any>(`${environment.baseUrl}/api/eimaster/name/${isHierachy}/${masterName}`, this.httpOptions)
      .pipe(map(res => res))
  }

  checkCollectionExists(masterName: String): Observable<any> {
    return this.http.get<any>(`${environment.baseUrl}/api/eimaster`, this.httpOptions)
      .pipe(map(res => res))
  }

  getAllUsers(): Observable<any> {
    return this.http.get<any>(`${environment.baseUrl}/api/admin/users`, this.httpOptions)
      .pipe(map(res => res))
  }

  getUsersByRole(data): Observable<any> {
    return this.http.post<any>(`${environment.baseUrl}/api/user/fetch-user-by-role`, data, this.httpOptions)
      .pipe(map(res => res))
  }
  
  getAllMasters(): Observable<any> {
    return this.http.get<any>(`${environment.baseUrl}/api/master`, this.httpOptions)
      .pipe(map(res => res))
  }
  

  getDataSet(data: String): Observable<any> {
    return this.http.get<any>(`${environment.baseUrl}/api/external/api/` + data, this.httpOptions1)
      .pipe(map(res => res))
  }

  getDropdownLookupData(masterName: String): Observable<any> {
    return this.http.get<any>(`${environment.baseUrl}/api/lookup/master/` + masterName, this.httpOptions)
      .pipe(map(res => res))
  }

  getDataDiff(updatedAt, createdAt, endDate) {
    if (updatedAt.getTime() === createdAt.getTime()) {
      return ''
    } else {
      var diff = endDate.getTime() - updatedAt.getTime();
      var days = Math.floor(diff / (60 * 60 * 24 * 1000));
      var hours = Math.floor(diff / (60 * 60 * 1000)) - (days * 24);
      var minutes = Math.floor(diff / (60 * 1000)) - ((days * 24 * 60) + (hours * 60));
      var seconds = Math.floor(diff / 1000) - ((days * 24 * 60 * 60) + (hours * 60 * 60) + (minutes * 60));
      if (days > 0) {
        return days === 1 ? '<span class="time-show">updated ' + days + ' day ago' : '<span class="time-show">updated ' + days + ' days ago</span>';
      } else {
        if (hours > 0) {
          return hours === 1 ? '<span class="time-show">updated ' + hours + ' hour ago' : '<span class="time-show">updated ' + hours + ' hours ago</span>'
        } else {
          if (minutes > 0) {
            return '<span class="time-show">updated ' + minutes + ' min ago </span>'
          } else {
            return '<span class="time-show">updated ' + seconds + ' sec ago </span>'
          }
        }
      }
    }
  }
}
