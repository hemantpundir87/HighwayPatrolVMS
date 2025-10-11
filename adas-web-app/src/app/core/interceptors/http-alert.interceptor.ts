import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpResponse,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, map, catchError, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { TokenService } from '../services/token.service';
import { ToastService } from '../services/toast.service';

@Injectable()
export class HttpAlertInterceptor implements HttpInterceptor {
  constructor(
    private alert: ToastService,
    private tokenService: TokenService,
    private router: Router
  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(

      // ✅ Use map directly, check runtime type manually
      map((event: HttpEvent<any>) => {
        // Process only final HttpResponse
        if (event instanceof HttpResponse) {
          const status = event.status;
          const body = event.body;

          console.log('🔍 Interceptor:', req.url, '→', status);

          // ✅ Handle empty or 204 response
          if (
            status === 204 ||
            (status === 200 &&
              (body === null ||
                body === undefined ||
                (Array.isArray(body) && body.length === 0)))
          ) {
            this.alert.warning('No data found');
            return event;
          }

          // ✅ Handle alert message pattern
          if (status === 200 && Array.isArray(body) && body[0]?.AlertMessage) {
            const msg = body[0].AlertMessage;
            const success = body[0].status === true;
            this.alert.show(msg, success ? 'success' : 'error');
          }
        }

        return event; // always return the event (even non-HttpResponse)
      }),

      // ✅ Catch HTTP errors
      catchError((err: HttpErrorResponse) => {
        console.error('❌ HTTP Error:', err.status, err.message);

        if (err.status === 401) {
          this.alert.error('Session expired. Please log in again.');
          this.tokenService.clear();
          localStorage.clear();
          setTimeout(() => this.router.navigate(['/login']), 500);
        } else if (err.status === 409) {
          const msg =
            Array.isArray(err.error) && err.error[0]?.AlertMessage
              ? err.error[0].AlertMessage
              : 'Validation error';
          this.alert.warning(msg);
        } else if (err.status === 0) {
          this.alert.error('Network connection error');
        } else {
          this.alert.error('Server error occurred');
        }

        return throwError(() => err);
      })
    );
  }
}
