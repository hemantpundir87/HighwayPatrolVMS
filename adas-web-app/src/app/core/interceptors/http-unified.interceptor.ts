import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpResponse,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, tap, finalize } from 'rxjs';
import { Router } from '@angular/router';
import { TokenService } from '../services/token.service';
import { ToastService } from '../services/toast.service';
import { LoaderService } from '../services/loader.service';

@Injectable()
export class HttpUnifiedInterceptor implements HttpInterceptor {
  constructor(
    private tokenService: TokenService,
    private alert: ToastService,
    private loader: LoaderService,
    private router: Router
  ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log('➡️ Intercepting:', req.method, req.url);
    // 1️⃣ Skip CORS preflight requests (OPTIONS only)
    if (req.method === 'OPTIONS') {
      // Don't start loader or show alerts
      return next.handle(req);
    }

    // 2️⃣ Attach token if present
    const jwt = this.tokenService.get();
    const cloned = jwt
      ? req.clone({ setHeaders: { Authorization: `Bearer ${jwt}` } })
      : req;

    this.loader.show();

    return next.handle(cloned).pipe(
      tap({
        next: (event: HttpEvent<any>) => {
          if (event instanceof HttpResponse)
            console.log('✅ Response OK for:', req.url);
          if (event instanceof HttpResponse) {
            const { status, body } = event;

            if (status === 204) {
              this.alert.show('No content available.', 'info');
            }
            // else if (status >= 200 && status < 300) {
            //   // Handle success responses of any method
            //   if (Array.isArray(body) && body[0]?.AlertMessage) {
            //     const msg = body[0].AlertMessage;
            //     const success = body[0].status === true;
            //     this.alert.show(msg, success ? 'success' : 'error');
            //   }
            // }
          }
        },
        error: (err: HttpErrorResponse) => {
          console.error('❌ Error in request:', req.url, err);
          let msg = err.error?.AlertMessage || err.message || 'Request failed';
          this.alert.show(msg, 'error');

          if (err.status === 401 || err.status === 403) {
            this.tokenService.clear();
            this.router.navigate(['/login']);
          }
        }
      }),
      finalize(() => {
        console.log('🧹 finalize() called for:', req.url);
        this.loader.hide();
      })
    );
  }

}
