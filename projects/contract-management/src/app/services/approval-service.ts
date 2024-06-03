import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { environment } from '../../../../../src/environments/environment'
import { map } from 'rxjs/operators'

@Injectable({
    providedIn: 'root'
})
export class ApprovalService {
    token = localStorage.getItem('jwtToken')
    httpOptions = {
        headers: new HttpHeaders()
            .set('content-type', 'application/json')
    }

    constructor(private http: HttpClient) { }

    addWorkflow(data): Observable<any> {
        return this.http.post<any>(`${environment.baseUrl}/api/workflow`, data, this.httpOptions)
            .pipe(map(res => res))
    }

    updateWorkflow(data): Observable<any> {
        return this.http.put<any>(`${environment.baseUrl}/api/workflow/` + data._id, data, this.httpOptions)
            .pipe(map(res => res))
    }

    getAllApprovalWorkfow(): Observable<any> {
        return this.http.get<any>(`${environment.baseUrl}/api/workflow`, this.httpOptions)
            .pipe(map(res => res))
    }

    getWorkflowById(id): Observable<any> {
        return this.http.get<any>(`${environment.baseUrl}/api/workflow/` + id, this.httpOptions)
            .pipe(map(res => res))
    }
    getWorkflowByRuleId(id): Observable<any> {
        return this.http.get<any>(`${environment.baseUrl}/api/workflow/rule/` + id, this.httpOptions)
            .pipe(map(res => res))
    }
    getWorkflowByCodeandtype(code,type): Observable<any> {
        return this.http.get<any>(`${environment.baseUrl}/api/workflow/` + code + '/' + type, this.httpOptions)
            .pipe(map(res => res))
    }
    deleteApprovalWorkfow(id): Observable<any> {
        return this.http.delete<any>(`${environment.baseUrl}/api/workflow/` + id, this.httpOptions)
            .pipe(map(res => res))
    }

}
