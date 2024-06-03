import { Injectable, Injector } from '@angular/core'
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
  HttpErrorResponse,
} from '@angular/common/http'
import { select, Store } from '@ngrx/store'
import { Observable, of, timer } from 'rxjs'
import { switchMap, map, catchError } from 'rxjs/operators'
import { Router } from '@angular/router'
import * as UserActions from '../store/user/actions'
import { AuthGuard } from '../components/cleanui/system/Guard/auth.guard'

const fakeJwtToken =
  'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJPbmxpbmUgSldUIEJ1aWxkZXIiLCJpYXQiOjE1OTA4Njk0MDEsImV4cCI6MTkwNjQwMjIwMSwiYXVkIjoid3d3LmV4YW1wbGUuY29tIiwic3ViIjoianJvY2tldEBleGFtcGxlLmNvbSIsIkdpdmVuTmFtZSI6IkpvaG5ueSIsIlN1cm5hbWUiOiJSb2NrZXQiLCJFbWFpbCI6Impyb2NrZXRAZXhhbXBsZS5jb20iLCJSb2xlIjpbIk1hbmFnZXIiLCJQcm9qZWN0IEFkbWluaXN0cmF0b3IiXX0.E3kbVuYOL_CVQIDZ25iUXHlyIXTzt2XGO--JkK8LmKY'
const users = [
  {
    id: 1,
    email: 'demo@sellpixels.com',
    password: 'demo123',
    name: 'Tom Jones',
    avatar: '',
    role: 'admin',
    accessToken: fakeJwtToken,
  },
]

@Injectable()
export class HTTPInterceptor implements HttpInterceptor {
  constructor(private store: Store<any>, private authGuard: AuthGuard) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
     req = req.clone({
        setHeaders: {
          Authorization: `Bearer ${this.authGuard.getToken()}`
        }
      })
    return next.handle(req).pipe(
      catchError(
        err =>
          new Observable<HttpEvent<any>>(observer => {
              console.log(err)
            if (err instanceof HttpErrorResponse) {
              const errResp = <HttpErrorResponse>err
             if (errResp.status === 401) {
                this.store.dispatch(new UserActions.Logout())
              }
            }
            observer.error(err)
            observer.complete()
          })
      )
    )
}
}
