import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';

@Injectable({ providedIn: 'root' })
export class GpsService {
  constructor(private api: ApiService) {}

  getVehicleRoute(vehicleId: number): Observable<any[]> {
    return this.api.get(`/gps/route/${vehicleId}`);
  }

  getCurrentLocation(vehicleId: number): Observable<any> {
    return this.api.get(`/gps/current/${vehicleId}`);
  }
}
