import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../../../../src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class ForgetPasswordService {

  httpOptions = {
    headers: new HttpHeaders()
      .set('Access-Control-Allow-Origin', '*')
      .set('Access-Control-Allow-Methods', 'GET,POST,OPTIONS,DELETE,PUT')
      .set('Access-Control-Allow-Headers', 'Content-Type'),
  }

  constructor(private service : HttpClient) { }

  reset(data:any){
    return this.service.post(`${environment.baseUrl}/api/account/reset-password/reset`,data) 
  }
  // sendOTP(data:any){
  //   return this.service.post(`${environment.baseUrl}/api/ease-i/forgotPassword/generateOtp`,data) 
  // }
  sendOTP(data:any){
    return this.service.post(`${environment.baseUrl}/api/account/reset-password/init/${data}`,data,this.httpOptions) 
  }

  // verifyOTP(data:any){
  //   return this.service.post(`${environment.baseUrl}/api/ease-i/forgotPassword/verifyOtp`,data) 
  // }
  verifyOTP(data:any){
    return this.service.post(`${environment.baseUrl}/api/account/reset-password/verify`,data,this.httpOptions) 
  }
  changePassword(data:any){
    return this.service.post(`${environment.baseUrl}/api/account/reset-password/reset`,data) 
  }
}