import { Injectable } from '@angular/core';
import {
  HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse, HttpErrorResponse
} from '@angular/common/http';
import { Observable, catchError, map, throwError } from 'rxjs';
import { AlertService } from '../services/alert.service';
import { TokenService } from '../services/token.service';
import { Router } from '@angular/router';

@Injectable()
export class HttpAlertInterceptor implements HttpInterceptor {
  constructor(
    private alert: AlertService,
    private tokenService: TokenService,
    private router: Router
  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      map((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          const body = event.body;

          // ✅ 200 - Success with AlertMessage format
          if (event.status === 200 && Array.isArray(body) && body[0]?.AlertMessage) {
            const msg = body[0].AlertMessage;
            const success = body[0].status === true;
            this.alert.show(msg, success ? 'success' : 'error');
          }

          // ⚠️ 204 - No data
          if (event.status === 204) {
            this.alert.warning('No data found');
          }
        }
        return event;
      }),

      catchError((err: HttpErrorResponse) => {
        // 🔐 Token Expired / Unauthorized
        if (err.status === 401) {
          this.alert.error('Session expired. Please log in again.');
          this.tokenService.clear();
          localStorage.clear();
          setTimeout(() => this.router.navigate(['/login']), 500);
        }
        // ⚠️ Validation / Conflict
        else if (err.status === 409) {
          const msg = Array.isArray(err.error) && err.error[0]?.AlertMessage
            ? err.error[0].AlertMessage
            : 'Validation error';
          this.alert.warning(msg);
        }
        // 🌐 Network Error
        else if (err.status === 0) {
          this.alert.error('Network connection error');
        }
        // 💥 Server Error
        else {
          this.alert.error('Server error occurred');
        }

        return throwError(() => err);
      })
    );
  }
}
