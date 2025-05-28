import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse
} from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { AuthModalService } from '../services/auth.modal.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const auth = inject(AuthService);
    const modal = inject(AuthModalService);
    const token = auth.getToken();

    const authReq = token
      ? req.clone({
        setHeaders: { Authorization: `Bearer ${token}` }
      })
      : req;

    return next.handle(authReq).pipe(
      catchError((err: HttpErrorResponse) => {
        if (err.status === 401) {
          auth.logout();              
          modal.openLogin();          
        }
        return throwError(() => err);
      })
    );
  }
}
