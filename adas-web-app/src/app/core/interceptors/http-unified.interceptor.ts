import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpResponse} from '@angular/common/http';
import { Observable, tap, finalize, timeout, catchError, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { TokenService } from '../services/token.service';
import { ToastService } from '../services/toast.service';
import { LoaderService } from '../services/loader.service';

@Injectable()
export class HttpUnifiedInterceptor implements HttpInterceptor {
  private readonly REQUEST_TIMEOUT = 10000; // ⏱️ 10 seconds

  constructor(
    private tokenService: TokenService,
    private alert: ToastService,
    private loader: LoaderService,
    private router: Router
  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (req.method === 'OPTIONS') return next.handle(req);

    const jwt = this.tokenService.get();
    const cloned = jwt
      ? req.clone({ setHeaders: { Authorization: `Bearer ${jwt}` } })
      : req;

    this.loader.show();

    return next.handle(cloned).pipe(
      timeout(this.REQUEST_TIMEOUT), // ⏰ Auto-cancel if too slow
      tap({
        next: (event) => {
          if (event instanceof HttpResponse) {
            console.log('✅ Response OK for:', req.url);
          }
        }
      }),
      catchError((err: any) => {
        if (err.name === 'TimeoutError') {
          console.error('⏳ Request timed out:', req.url);
          this.alert.show('Request timed out. Please try again.', 'error');
        } else {
          console.error('❌ Request error:', req.url, err);
          this.alert.show(err.error?.AlertMessage || err.message || 'Request failed', 'error');
        }

        if (err.status === 401 || err.status === 403) {
          this.tokenService.clear();
          this.router.navigate(['/login']);
        }
        return throwError(() => err);
      }),
      finalize(() => {
        //console.log('🧹 finalize() called for:', req.url);
        this.loader.hide();
      })
    );
  }
}
