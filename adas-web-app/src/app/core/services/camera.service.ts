import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';

@Injectable({ providedIn: 'root' })
export class CameraService {
  constructor(private api: ApiService) {}

  getCameraFeeds(): Observable<any[]> {
    return this.api.get('/camera/feeds');
  }

  getCameraStatus(): Observable<any[]> {
    return this.api.get('/camera/status');
  }
}
