import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { environment } from '../../../../../src/environments/environment'
import { map } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class FormBuilderService {
  httpOptions = {
    headers: new HttpHeaders()
      .set('content-type', 'application/json')
  }
  constructor(private http: HttpClient) { }

  saveFormBuilder(data): Observable<any> {
    return this.http.post<any>(`${environment.baseUrl}/api/parameter`, data, this.httpOptions)
      .pipe(map(res => res))
  }

  updateFormBuilder(data): Observable<any> {
    return this.http.put<any>(`${environment.baseUrl}/api/parameter/` + data._id, data, this.httpOptions)
      .pipe(map(res => res))
  }

  getDataById(id): Observable<any> {
    return this.http.get<any>(`${environment.baseUrl}/api/parameter/` + id, this.httpOptions)
      .pipe(map(res => res))
  }

  getAllPCollectionByCode(id): Observable<any> {
    return this.http.get<any>(`${environment.baseUrl}/api/parameter/collection/` + id, this.httpOptions)
      .pipe(map(res => res))
  }
}
